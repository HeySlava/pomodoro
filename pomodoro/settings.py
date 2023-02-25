from pydantic import BaseSettings


class Settings(BaseSettings):
    work_delta: int = 25
    pause_delta: int = 5
    port: int = 9999
    host: str = '0.0.0.0'

    class Config:
        env_prefix = 'pomodoro_'
        env_file = '../.env',
        env_file_encoding = 'utf-8'


settings = Settings()
