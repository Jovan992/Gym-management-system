import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { staffMember } from '../models/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  /** 
   * Get staff from database
   */
  getStaff() {
    return this._httpClient.get("http://localhost:3000/staff");
  }

  /** 
   * Add staff to database
   */
  addStaff(staff: staffMember) {
    return this._httpClient.post("http://localhost:3000/staff", staff);
  }

  /** 
   * Delete staff from database
   */
  deleteStaff(staffId: number) {
    return this._httpClient.delete(`http://localhost:3000/staff/${staffId}`);
  }

  /** 
   * Edit staff in database
   */
  editStaff(id: number, data: any) {
    return this._httpClient.put(`http://localhost:3000/staff/${id}`, data);
  }
  
}
