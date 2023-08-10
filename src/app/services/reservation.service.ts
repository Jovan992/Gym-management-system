import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private _httpClient: HttpClient,
  ) { }


  /** 
   * Get reservations from database
   */
  getReservations() {
    return this._httpClient.get("http://localhost:3000/reservations");
  }

  /** 
    * Add reservation in database
    */
  addReservation(res: Reservation) {
    return this._httpClient.post("http://localhost:3000/reservations", res);
  }

  /** 
   * Delete reservation in database
   */
  deleteReservation(id: number) {
    return this._httpClient.delete("http://localhost:3000/reservations/" + id);
  }

  /** 
   * Edit reservation in database
   */
  editReservation(id: number, data: any) {
    return this._httpClient.put(`http://localhost:3000/reservations/${id}`, data);
  }

}
