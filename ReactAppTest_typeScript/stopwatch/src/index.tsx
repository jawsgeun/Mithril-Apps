// tslint:disable-next-line:no-reference
/// <reference path="index.d.ts"/>

import * as m from "mithril";
import * as numeral from "numeral";

import styles = require("./index.css");

function formatTime(time: number): string {
  const partS = numeral(Math.floor(time / 1000)).format("00:00:00");
  const partMs = numeral((time % 1000) / 1000).format(".000");
  return partS + partMs;
}

class StopwatchViewModel {
  private elapsed = 0;
  private startTime = 0;
  private timer?: number = undefined;

  public start = () => {
    this.stop();
    this.startTime = Date.now();
    this.timer = setInterval(() => {
      m.redraw();
    }, 33);
  }

  public stop = () => {
    if (this.timer) {
      this.elapsed += Date.now() - this.startTime;
      clearInterval(this.timer);
    }
    this.timer = undefined;
  }

  public isPaused = (): boolean => {
    return this.timer === undefined;
  }

  public getElapsed = (): number => {
    let elapsed = this.elapsed;
    if (!this.isPaused()) {
      elapsed += Date.now() - this.startTime;
    }
    return elapsed;
  }
}

class StopwatchView implements m.ClassComponent<{}> {
  private vm: StopwatchViewModel;

  constructor() {
    this.vm = new StopwatchViewModel();
  }

  public onremove() {
    this.vm.stop();
  }

  public view() {
    return <div class={styles.root}>
      <div class={styles.time}>{formatTime(this.vm.getElapsed())}</div>
      {this.vm.isPaused() ?
        <button class={styles.start} onclick={this.vm.start}>Start</button>
        :
        <button class={styles.stop} onclick={this.vm.stop}>Stop</button>
      }
    </div>;
  }
}

m.mount(document.getElementById("app")!, StopwatchView);
