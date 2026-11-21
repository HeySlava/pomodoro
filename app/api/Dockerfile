FROM python:3.13-slim

WORKDIR /opt/app

COPY requirements.txt requirements.txt

ENV PATH=/venv/bin:$PATH

RUN --mount=type=cache,target=/root/.cache/pip \
    python -m venv /venv \
    && pip install -r requirements.txt

EXPOSE 9999

COPY ./pomodoro .

CMD ["python",  "main.py"]
