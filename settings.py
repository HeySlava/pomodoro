from pydantic import BaseSettings


class Settings(BaseSettings):
    work_delta: int = 25
    pause_delta: int = 5
    port: int = 8080
    host: str = '0.0.0.0'

    class Config:
        env_prefix = 'pomodoro_'


settings = Settings(
        _env_file='.env',
        _env_file_encoding='utf-8'
    )
