import { Members } from './members.model';

export class Group {
  constructor(
    public photo: string,
    public groupName: string,
    public numberOfMembers: number,
    public assignedMembers: Members[],
    public id: number
  ) {}
}
