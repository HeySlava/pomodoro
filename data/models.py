import sqlalchemy as sa

from data.basemodel import Base


class Condition(Base):
    __tablename__ = 'conditions'

    name = sa.Column(sa.String, primary_key=True)
    value = sa.Column(sa.String)
