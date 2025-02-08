import datetime as dt


def now_timestamp() -> int:
    return int(dt.datetime.now().timestamp())


class Storage:
    def __init__(
            self,
            work_delta: int,
            pause_delta: int,
            pause_start: int = 0,
    ) -> None:
        self.work_delta = work_delta
        self.pause_delta = pause_delta
        self.pause_start = pause_start
        self.end_time = now_timestamp() + self.work_delta
        self.is_work = True
        self.is_paused = False
        self.pomodoro_cnt = 0

    @property
    def time_left(self) -> int:
        now = now_timestamp()
        if not self.is_paused:
            time_left = self.end_time - now
        else:
            time_left = now - self.pause_start
            time_left = self.end_time - self.pause_start
        return time_left

    def toggle(self) -> None:
        if self.is_paused:
            self.is_paused = False
            now = now_timestamp()
            paused_time = now - self.pause_start
            self.end_time = self.end_time + paused_time
        else:
            self.is_paused = True
            self.pause_start = now_timestamp()

    def next_period(self) -> None:
        now = now_timestamp()

        if self.is_work:
            self.pomodoro_cnt += 1
            self.end_time = now + self.pause_delta
        else:
            self.end_time = now + self.work_delta

        self.is_work = not self.is_work

    def previous_period(self) -> None:
        now = now_timestamp()
        self.is_paused = False
        if self.is_work:
            self.end_time = now + self.pause_delta
            self.is_work = False
        else:
            self.is_work = True
            self.end_time = now + self.work_delta
            self.pomodoro_cnt = self.pomodoro_cnt - 1

    def asdict(self):
        d = {key: getattr(self, key) for key in self.__dict__}
        d['time_left'] = self.time_left
        return d
