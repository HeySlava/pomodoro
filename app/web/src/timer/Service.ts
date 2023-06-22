import { injectable } from 'inversify'

export type TGetDataRes = {
  work_delta: number,
  pause_delta: number,
  pause_start: undefined | number,
  time_left: number,
  is_work: boolean,
  is_paused: boolean,
  pomodoro_cnt: number
}


@injectable()
export class Service {
  async getData() {
    // TODO: get HOST and PORT from env
    const data = await fetch('http://0.0.0.0:9999/time&format=json')
    return (await data.json()) as TGetDataRes
  }
}
