import datetime as dt
import uvicorn
from enum import Enum
from dataclasses import asdict, dataclass
from dataclasses import field

from settings import settings

from fastapi import FastAPI
from fastapi import status
from fastapi.responses import HTMLResponse


@dataclass
class Storage:
    __add_to_dict__ = ['time_left']
    work_delta: int
    pause_delta: int
    pause_start: int = 0
    end_time: int = field(init=False, repr=False)
    is_work: bool = True
    is_paused: bool = False
    pomodoro_cnt: int = 0

    def __post_init__(self):
        self.end_time = int(dt.datetime.now().timestamp()) + self.work_delta

    def _asdict(self):
        return {
                **asdict(self),
                **{a: getattr(self, a) for a in getattr(self, '__add_to_dict__', [])}}

    @property
    def time_left(self) -> int:
        return self.end_time - int(dt.datetime.now().timestamp())


_MINUTE = 60
storage = None


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


def init_database():
    global storage

    storage = Storage(
            work_delta=settings.work_delta*_MINUTE,
            pause_delta=settings.pause_delta*_MINUTE,
        )


@app.get('/new')
def new():
    init_database()
    return status.HTTP_200_OK


@app.get('/toggle')
def toggle():

    if storage is None:
        return status.HTTP_200_OK

    if storage.is_paused:
        storage.is_paused = False
        now = int(dt.datetime.now().timestamp())
        paused_time = now - storage.pause_start
        storage.end_time = storage.end_time + paused_time
    else:
        storage.is_paused = True
        storage.pause_start = int(dt.datetime.now().timestamp())

    return status.HTTP_200_OK


@app.get('/time')
def time():

    if storage is None:
        return HTMLResponse(content=Responses.NO_POMODORO)

    if storage.is_paused:
        return HTMLResponse(content=Responses.PAUSE)

    if storage.end_time < int(dt.datetime.now().timestamp()):
        return HTMLResponse(content=Responses.PERIOD_ENDED)

    times_left_in_seconds = storage.time_left

    return HTMLResponse(
            content=Responses.LEFT.value.format(
                pomodoro='🍅' * storage.pomodoro_cnt,
                minutes=times_left_in_seconds // 60,
                seconds=str(times_left_in_seconds % 60).zfill(2),
            ),
    )


@app.get('/next')
def next():

    if storage is None:
        init_database()
        return status.HTTP_200_OK

    storage.is_paused = False
    now = int(dt.datetime.now().timestamp())

    if storage.is_work:
        storage.pomodoro_cnt += 1
        storage.end_time = now + storage.pause_delta
    else:
        storage.end_time = now + storage.work_delta

    storage.is_work = not storage.is_work

    return status.HTTP_200_OK


@app.get('/previous')
def previous():

    if storage is None or not storage.pomodoro_cnt:
        init_database()
        return status.HTTP_200_OK

    storage.is_paused = False
    storage.is_work = not storage.is_work
    now = int(dt.datetime.now().timestamp())

    if storage.is_work:
        storage.pomodoro_cnt = storage.pomodoro_cnt - 1
        storage.end_time = now + storage.pause_delta
    else:
        storage.end_time = now + storage.work_delta

    return status.HTTP_200_OK


@app.get('/stop')
def stop():
    global storage
    storage = None
    return status.HTTP_200_OK


# TODO: add response_model but think over @property
@app.get('/time&format=json')
def json():
    return None if not storage else storage._asdict()


if __name__ == '__main__':
    uvicorn.run(
        app,
        port=settings.port,
        host=settings.host,
    )
