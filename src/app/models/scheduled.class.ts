import { Time } from "@angular/common";
import { Members } from "./members.model";
import { Group } from "./group";

export class ScheduledClass {

    public id: number;
    public name: string;
    public trainer: string;
    public location: string;
    public start: Time;
    public end: Time;
    public date: String;
    public participants?: Members[] = [];
    public groups?: Group[] = [];
}