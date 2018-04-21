import { Component, OnInit } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {


    ngOnInit() {

    }

    message = '';
    timedOut = false;

    constructor(private idle: Idle,
        
    ) {

        idle.setIdle(60*15); //15mins
        idle.setTimeout(10); //10 sec
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onTimeout
            .subscribe(() => {
                if (!location.href.endsWith('/login')
                    && !location.href.endsWith('/forgot-password')) {
                    this.timedOut = true;
                } else {
                    this.reset();
                }
            });

        this.reset();
    }

    reset() {
        this.idle.watch();
        this.timedOut = false;
    }

}
