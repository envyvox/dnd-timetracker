import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public date: Date = new Date();
    public intervalId: number | undefined;

    @HostListener('window:beforeunload', ['$event'])
    public beforeunloadHandler() {
        this.onStopTimer();
    }

    public ngOnInit(): void {
        const storedDate = localStorage.getItem('stored-date');
        if (storedDate !== null) {
            this.date = new Date(storedDate);
        }
    }

    public onAddMinutes(minutes: number): void {
        this.date = new Date(this.date.setMinutes(this.date.getMinutes() + minutes));
    }

    public onAddHours(hours: number): void {
        this.date = new Date(this.date.setHours(this.date.getHours() + hours));
    }

    public onStartTimer(): void {
        this.intervalId = setInterval(() => {
            this.date = new Date(this.date.setSeconds(this.date.getSeconds() + 1));
        }, 1000);
    }

    public onStopTimer(): void {
        clearInterval(this.intervalId);
        localStorage.setItem('stored-date', this.date.toISOString());
        this.intervalId = undefined;
    }
}
