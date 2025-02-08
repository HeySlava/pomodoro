from enum import Enum

import uvicorn
from fastapi import FastAPI
from fastapi import status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from settings import settings
from storage import now_timestamp
from storage import Storage


class Variables(str, Enum):
    IS_WORK = 'is_work'
    IS_PAUSED = 'is_paused'
    TIME = 'end_time'
    PAUSE_START = 'pause_start'
    POMODORO_COUNT = 'pomodoro_count'


class Responses(str, Enum):
    LEFT = '{pomodoro} Time left {minutes}:{seconds}'
    PERIOD_ENDED = 'Period has ended'
    PAUSE = 'PAUSE'
    NO_POMODORO = ''


app = FastAPI()
app.state.storage = None
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


def init_database(app: FastAPI) -> None:
    MINUTE = 60
    storage = Storage(
            work_delta=settings.work_delta*MINUTE,
            pause_delta=settings.pause_delta*MINUTE,
        )
    app.state.storage = storage


@app.get('/new')
def new():
    init_database(app)
    return status.HTTP_200_OK


@app.get('/toggle')
def toggle():

    if app.state.storage is None:
        return status.HTTP_200_OK

    app.state.storage.toggle()
    return status.HTTP_200_OK


@app.get('/time')
def time():

    if app.state.storage is None:
        return HTMLResponse(content=Responses.NO_POMODORO)

    if app.state.storage.is_paused:
        return HTMLResponse(content=Responses.PAUSE)

    if app.state.storage.end_time < now_timestamp():
        return HTMLResponse(content=Responses.PERIOD_ENDED)

    times_left_in_seconds = app.state.storage.time_left

    return HTMLResponse(
            content=Responses.LEFT.value.format(
                pomodoro='🍅' * app.state.storage.pomodoro_cnt,
                minutes=times_left_in_seconds // 60,
                seconds=str(times_left_in_seconds % 60).zfill(2),
            ),
    )


@app.get('/next')
def next():

    if app.state.storage is None:
        init_database(app)
        return status.HTTP_200_OK

    app.state.storage.is_paused = False
    app.state.storage.next_period()
    return status.HTTP_200_OK


@app.get('/previous')
def previous():

    if app.state.storage is None or not app.state.storage.pomodoro_cnt:
        init_database(app)
        return status.HTTP_200_OK

    app.state.storage.previous_period()
    return status.HTTP_200_OK


@app.get('/stop')
def stop():
    app.state.storage = None
    return status.HTTP_200_OK


# TODO: add response_model but think over @property
@app.get('/time&format=json')
def json():
    return {} if not app.state.storage else app.state.storage.asdict()


if __name__ == '__main__':
    uvicorn.run(
        app,
        port=settings.port,
        host=settings.host,
    )
