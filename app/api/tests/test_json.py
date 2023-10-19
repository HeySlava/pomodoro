from unittest import mock

import main
from fastapi.testclient import TestClient
from main import app
from main import init_database


client = TestClient(app)


def test_empty_json():
    response = client.get('/time&format=json')
    assert response.status_code == 200
    assert response.json() == {}


# @pytest.mark.skip('I do not know how to mock storage correctly')
def test_json():
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

    with mock.patch.object(main, 'Storage') as MockedStorage:
        MockedStorage.return_value._asdict.return_value = expected_response
        init_database()

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
