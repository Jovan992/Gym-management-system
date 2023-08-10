import { Injectable } from '@angular/core';
import { Membership } from '../models/membership.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MembershipService {
  constructor(private http: HttpClient) {}

  /**
   * get all memberships from the database
   * @returns Membership objects array from database
   */
  getMemberships() {
    return this.http.get<Membership[]>('http://localhost:3000/membership');
  }

  /**
   * Deletes selected membership object from the database
   * @param id Id of the membership object in the database
   * @returns Membership object deleted from the data base
   */
  deleteMembership(id: number) {
    return this.http.delete(`http://localhost:3000/membership/${id}`);
  }
  /**
   * Adds new membership to the database
   * @param data Membership object that gets added to the database
   * @returns Added membership object
   */
  addMembership(data: Membership) {
    return this.http.post(`http://localhost:3000/membership`, data);
  }

  /**
   * Saves edited object to the database
   * @param id Id of the membership object in the database
   * @param data Membership object
   * @returns Edited Membership object
   */
  editMembership(id: number, data: Membership) {
    return this.http.put(`http://localhost:3000/membership/${id}`, data);
  }
}
