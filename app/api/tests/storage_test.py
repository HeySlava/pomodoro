import pytest
from storage import Storage


@pytest.fixture
def storage():
    return Storage(work_delta=25 * 60, pause_delta=5 * 60)


def test_toggle_pause(storage):
    storage.toggle()
    assert storage.is_paused is True
    storage.toggle()
    assert storage.is_paused is False


def test_next_period(storage):
    storage.next_period()
    assert storage.pomodoro_cnt == 1
    assert storage.is_work is False
    storage.next_period()
    assert storage.pomodoro_cnt == 1
    assert storage.is_work is True
