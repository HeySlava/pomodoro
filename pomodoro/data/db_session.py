import sqlalchemy as sa
from sqlalchemy import orm
from sqlalchemy.orm import Session

from data.basemodel import Base


_factory = None


def global_init(conn_str: str, echo: bool = False) -> None:

    global _factory

    if _factory is not None:
        return

    if not conn_str or not conn_str.strip():
        raise Exception('You have to specify conn_str')

    engine = sa.create_engine(conn_str, echo=echo)

    _factory = orm.sessionmaker(bind=engine)

    from data.models import Condition  # noqa: F401
    Base.metadata.create_all(engine)


def create_session() -> Session:
    global _factory

    if not _factory:
        raise Exception('You must call global_init() before using this method')

    session: orm.Session = _factory()
    session.expire_on_commit = False

    try:
        yield session
    finally:
        session.close()
