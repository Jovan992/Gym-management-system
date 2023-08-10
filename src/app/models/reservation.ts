import { Time } from "@angular/common";

export class Reservation {

    public name: string;
    public date: Date;
    public place: string;
    public start: Time;
    public end: Time;
    public slots: number;
}