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
  private baseUrl: string
  constructor() {
    this.baseUrl = 'http://' + import.meta.env.VITE_POMODORO_HOST + ':' + import.meta.env.VITE_POMODORO_PORT
  }
  async getData() {
    const data = await fetch(this.baseUrl + '/time?format=json')
    return (await data.json()) as TGetDataRes
  }
  async newSession() {
    fetch(this.baseUrl + "/new")
  }
  async toggle() {
    fetch(this.baseUrl + "/toggle")
  }
  async nextStep() {
    fetch(this.baseUrl + "/next")
  }
  async stopSession() {
    fetch(this.baseUrl + "/stop")
  }
  async previousSession() {
    fetch(this.baseUrl + "/previous")
  }
}
