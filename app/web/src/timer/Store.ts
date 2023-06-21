import { inject, injectable } from 'inversify'
import { action, computed, makeAutoObservable, observable } from 'mobx'
import { Service, TGetDataRes } from './Service'
import { addZeroToStart } from '../helpers'

export const enum WORK_TYPE {
  WORK = "work",
  REST = 'rest'
}

export type TWorkTypes = {
  [key in WORK_TYPE]: number
}

@injectable()
export class Store {

  @inject(Service) service: Service

  workTypes: TWorkTypes = {
    work: 0,
    rest: 0
  }
  currentWorkType: WORK_TYPE
  pauseStart: number | null
  timeLeft: number
  isPause = false
  pomodoroCount = 0
  intervalIds = {
    getData: null as number | null
  }


  constructor() {
    makeAutoObservable(this, {
      workTypes: observable,
      currentWorkType: observable,
      pauseStart: observable,
      timeLeft: observable,
      isPause: observable,
      pomodoroCount: observable,
      intervalIds: observable,
      stopPolling: action,
      updateData: action,
      formatedTime: computed,
      totalTime: computed
    })
  }

  startPolling() {
    this.uploadData()
    this.intervalIds.getData = setInterval(() => this.uploadData(), 1_000)
  }

  async uploadData() {
    const data = await this.service.getData()
    this.updateData(data)
  }

  updateData(data: TGetDataRes) {

    this.workTypes.rest = data.pause_delta * 60_000
    this.workTypes.work = data.work_delta * 60_000

    this.currentWorkType = data.is_work ? WORK_TYPE.WORK : WORK_TYPE.REST

    this.pauseStart = data.pause_start ? data.pause_start * 1000 : null
    this.isPause = data.is_paused
    this.pomodoroCount = data.pomodoro_cnt
    this.timeLeft = data.time_left * 1000
  }


  stopPolling = () => {
    if (this.intervalIds.getData) clearInterval(this.intervalIds.getData)
  }

  get formatedTime() {
    if (!this.timeLeft) return ''
    const date = new Date(this.timeLeft)
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${addZeroToStart(minutes)}.${addZeroToStart(seconds)}`
  }

  get totalTime() {
    return this.workTypes[this.currentWorkType]
  }
}
