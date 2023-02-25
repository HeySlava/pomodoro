FROM python:3.10-slim-bullseye

WORKDIR /opt/app

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir  pip -U -r requirements.txt

EXPOSE 9999

COPY ./pomodoro .

CMD ["python",  "main.py"]
