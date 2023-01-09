from sqlalchemy.orm import Session
from data.models import Condition
from typing import Any


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
