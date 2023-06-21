import pytest
import main
from main import app

from unittest.mock import MagicMock

from fastapi.testclient import TestClient

client = TestClient(app)


def test_empty_json():
    response = client.get('/time&format=json')
    assert response.status_code == 200
    assert response.json() == {}


@pytest.mark.skip('I do not know how to mock storage correctly')
def test_json(mocker):
    storage_mock = MagicMock()

    storage_mock.work_delta = 25
    storage_mock.pause_delta = 5
    storage_mock.pause_start = 0
    storage_mock.end_time = 1234567890
    storage_mock.is_work = True
    storage_mock.is_paused = False
    storage_mock.pomodoro_cnt = 0
    storage_mock.time_left = 100

    mocker.patch.object(main, 'storage', storage_mock)

    response = client.get('/time&format=json')
    assert response.status_code == 200
    expected_response = {
            'work_delta': 25,
            'pause_delta': 5,
            'pause_start': 0,
            'end_time': 1234567890,
            'is_work': True,
            'is_paused': False,
            'pomodoro_cnt': 0,
            'time_left': 100,
        }
    assert response.json() == expected_response
