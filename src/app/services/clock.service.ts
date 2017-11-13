import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ClockService {
    TickList = [];
    ticker;
    clock_speed = 1000;
    ticks;
    Tick_CheckIn(tick): Promise<boolean> {
        console.log("Checking in ticker");

        this.TickList.push(tick);
        return Promise.resolve(true);
    }
    Tick() {
        this.ticks++;
        this.TickList.forEach(ticker => {
            ticker.tick();
        });
    }
    StartTicker(delay:number) {
        console.log("Init ticker");
        if (!this.ticker) {
            this.ticker = Observable.interval(delay || this.clock_speed).subscribe(x => this.Tick());
        }
    }

    StopTicker() {
        console.log("Uninit Unticker");
        if (this.ticker) {
            this.ticker.unsubscribe();
            this.ticker = null;
        }
    }
}

