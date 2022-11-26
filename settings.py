from pydantic import BaseSettings


MINUTE = 60


class Settings(BaseSettings):
    work_delta: int = 25 * MINUTE
    pause_delta: int = 5 * MINUTE
    port: int = 8080
    host: str = '0.0.0.0'

    class Config:
        env_prefix = 'pomodoro_'


settings = Settings(
        _env_file='.env',
        _env_file_encoding='utf-8'
    )
