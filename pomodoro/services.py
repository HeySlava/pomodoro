import datetime as dt
from typing import Any

from sqlalchemy.orm import Session

from data.models import Condition

from main import Variables


def push_value(session: Session, name: str, value: Any):
    state = session.query(Condition).where(Condition.name == name).one_or_none()
    if not state:
        session.add(Condition(name=name, value=value))
    else:
        state.value = value
        session.add(state)
    session.commit()


def pull_value(session: Session, name: str):
    return session.query(Condition)\
            .where(Condition.name == name).one_or_none()


def delete_value(session: Session, name: str):
    query = session.query(Condition)\
            .where(Condition.name == name).one_or_none()
    session.delete(query)
    session.commit()


def refresh_database(
        session: Session,
        work_delta: int,
) -> None:
    push_value(session=session, name=Variables.IS_WORK, value=True)
    push_value(session=session, name=Variables.IS_PAUSED, value=False)
    push_value(session=session, name=Variables.POMODORO_COUNT, value=0)
    push_value(
            session=session,
            name=Variables.TIME,
            value=int(dt.datetime.now().timestamp()) + work_delta,
    )
