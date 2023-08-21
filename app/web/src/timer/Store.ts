import { inject, injectable } from "inversify";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { Service, TGetDataRes } from "./Service";
import { addZeroToStart } from "../helpers";

export const enum WORK_TYPE {
  WORK = "work",
  REST = "rest",
}

export type TWorkTypes = {
  [key in WORK_TYPE]: number;
};

@injectable()
export class Store {
  @inject(Service) service: Service;

  workTypes: TWorkTypes = {
    work: 0,
    rest: 0,
  };
  currentWorkType: WORK_TYPE;
  pauseStart: number | null;
  timeLeft: number;
  isPause = false;
  pomodoroCount = 0;
  isHelpModalOpen = false;
  intervalIds = {
    getData: null as number | null,
  };

  constructor() {
    makeAutoObservable(this, {
      workTypes: observable,
      currentWorkType: observable,
      pauseStart: observable,
      timeLeft: observable,
      isPause: observable,
      pomodoroCount: observable,
      intervalIds: observable,
      isHelpModalOpen: observable,
      stopPolling: action,
      updateData: action,
      setIsHelpModalOpen: action,
      toggleIsHelpModalOpen: action,
      formatedTime: computed,
      totalTime: computed,
    });
  }

  startPolling() {
    this.uploadData();
    this.intervalIds.getData = setInterval(() => this.uploadData(), 1_000);
  }

  async uploadData() {
    const data = await this.service.getData();
    this.updateData(data);
  }

  updateData(data: TGetDataRes) {
    this.workTypes.rest = data.pause_delta * 1_000;
    this.workTypes.work = data.work_delta * 1_000;

    this.currentWorkType = data.is_work ? WORK_TYPE.WORK : WORK_TYPE.REST;

    this.pauseStart = data.pause_start ? data.pause_start * 1000 : null;
    this.isPause = data.is_paused;
    this.pomodoroCount = data.pomodoro_cnt;
    this.timeLeft = data.time_left * 1000;
  }

  stopPolling = () => {
    if (this.intervalIds.getData) clearInterval(this.intervalIds.getData);
  };

  newSession() {
    this.service.newSession();
  }
  toggle() {
    this.service.toggle();
  }
  nextStep() {
    this.service.nextStep();
  }
  stopSession() {
    this.service.stopSession();
  }
  previousSession() {
    this.service.previousSession();
  }

  setIsHelpModalOpen(newValue: boolean) {
    this.isHelpModalOpen = newValue;
  }

  toggleIsHelpModalOpen() {
    this.isHelpModalOpen = !this.isHelpModalOpen;
  }

  get formatedTime() {
    if (!this.timeLeft) return "";
    const minutes = Math.floor(Math.abs(this.timeLeft) / 60000);
    const seconds = +((Math.abs(this.timeLeft) % 60000) / 1000).toFixed(0);
    const sign = this.timeLeft < 0 ? "-" : "";
    return `${sign}${addZeroToStart(minutes)}:${addZeroToStart(seconds)}`;
  }

  get totalTime() {
    return this.workTypes[this.currentWorkType];
  }
}
