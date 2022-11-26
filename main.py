from fastapi.responses import HTMLResponse
import uvicorn
import datetime as dt
import services
from settings import settings

from fastapi import FastAPI, status, Depends
from data import db_session
from sqlalchemy.orm import Session

from enum import Enum


class Variables(str, Enum):
    IS_WORK = 'is_work'
    IS_PAUSED = 'is_paused'
    TIME = 'end_time'
    PAUSE_START = 'pause_start'
    POMODORO_COUNT = 'pomodoro_count'


class Responses(str, Enum):
    LEFT = '{pomodoro} Time left {minutes}:{seconds}'
    PERIOD_ENDED = 'Period ended'
    PAUSE = 'PAUSE'
    # START_ERROR = "You didn't started your pomodoro session"
    START_ERROR = ""


app = FastAPI()
def configure_database():
    db_session.global_init('sqlite:///pomodoro.sqlite', echo=False)


@app.get('/new')
def new(session: Session = Depends(db_session.create_session)):
    services.push_value(session=session, name=Variables.IS_WORK.value, value=True)
    services.push_value(session=session, name=Variables.IS_PAUSED.value, value=False)
    services.push_value(session=session, name=Variables.POMODORO_COUNT.value, value=0)
    services.push_value(session=session, name=Variables.TIME.value,
            value=int(dt.datetime.now().timestamp()) + settings.work_delta)

    return status.HTTP_200_OK


@app.get('/toggle')
def toggle(session: Session = Depends(db_session.create_session)):

    is_paused = services.pull_value(session=session, name=Variables.IS_PAUSED.value)
    is_work = services.pull_value(session=session, name=Variables.IS_WORK.value)
    final_date = services.pull_value(session=session, name=Variables.TIME.value)

    if not is_paused or not final_date:
        return HTMLResponse(content=Responses.START_ERROR)

    is_work = bool(int(is_work.value))

    if not final_date.value:
        services.push_value(session=session, name=Variables.IS_WORK, value=not is_work)
        services.push_value(session=session, name=Variables.IS_PAUSED, value=False)
        if is_work:
            services.push_value(session=session, name=Variables.TIME,
                    value=int(dt.datetime.now().timestamp()) + settings.pause_delta)

        else:
            services.push_value(session=session, name=Variables.TIME,
                    value=int(dt.datetime.now().timestamp()) + settings.work_delta)
        return status.HTTP_200_OK


    is_paused_before = bool(int(is_paused.value))
    if is_paused_before:
        pause_start = services.pull_value(session=session, name=Variables.PAUSE_START.value)
        pause_start = int(pause_start.value)
        final_date = int(final_date.value)
        now = int(dt.datetime.now().timestamp())
        services.push_value(session=session,
                name=Variables.TIME.value,
                value=final_date + (now - pause_start))
    else:
        services.push_value(session=session,
                name=Variables.PAUSE_START.value,
                value=int(dt.datetime.now().timestamp()))
    services.push_value(session=session,
            name=Variables.IS_PAUSED.value,
            value=not is_paused_before)
    return status.HTTP_200_OK, is_paused


@app.get('/time')
def time(session: Session = Depends(db_session.create_session)):
    final_date = services.pull_value(session=session, name=Variables.TIME.value)

    if not final_date:
        return HTMLResponse(content=Responses.START_ERROR)

    is_paused = bool(int(
        services.pull_value(session=session, name=Variables.IS_PAUSED.value).value))

    if not final_date.value:
        return HTMLResponse(content=Responses.PERIOD_ENDED)

    if is_paused:
        return HTMLResponse(content=Responses.PAUSE)

    final_date = int(final_date.value)
    delta = final_date - int(dt.datetime.now().timestamp())
    if delta < 0:
        services.push_value(session=session, name=Variables.TIME.value, value=None)
        return HTMLResponse(content=Responses.PERIOD_ENDED)
    else:
        pomodoro_cnt = services.pull_value(
                session=session, name=Variables.POMODORO_COUNT.value)
        pomodoro_cnt = int(pomodoro_cnt.value)
        return HTMLResponse(
                content=Responses.LEFT.value.format(
                    pomodoro='🍅' * pomodoro_cnt,
                    minutes=delta // 60,
                    seconds=str(delta % 60).zfill(2)))


@app.get('/next')
def next(session: Session = Depends(db_session.create_session)):
    is_work = services.pull_value(session=session, name=Variables.IS_WORK.value)
    cnt = services.pull_value(session=session, name=Variables.POMODORO_COUNT.value)

    if not is_work:
        return '# TODO'
    is_work_before = bool(int(is_work.value))

    services.push_value(session=session,
            name=Variables.IS_WORK.value, value=not is_work_before)
    services.push_value(session=session,
            name=Variables.IS_PAUSED.value, value=False)


    if is_work_before:
        services.push_value(session=session,
                name=Variables.TIME.value,
                value=int(dt.datetime.now().timestamp()) + settings.pause_delta)

    else:
        services.push_value(session=session,
                name=Variables.POMODORO_COUNT.value,
                value=int(cnt.value) + 1)
        services.push_value(session=session,
                name=Variables.TIME.value,
                value=int(dt.datetime.now().timestamp()) + settings.work_delta)

    return status.HTTP_200_OK


@app.get('/stop')
def stop(session: Session = Depends(db_session.create_session)):
    services.delete_value(session=session, name=Variables.TIME.value)
    return status.HTTP_200_OK


if __name__ == '__main__':
    configure_database()
    uvicorn.run(app,
            port=settings.port,
            host=settings.host)
else:
    configure_database()
