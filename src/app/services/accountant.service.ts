import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { accountantMember } from '../models/accountant';

@Injectable({
  providedIn: 'root'
})
export class AccountantService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  /** 
   * Get accountants from database
   */
  getAccountants() {
    return this._httpClient.get("http://localhost:3000/accountants");
  }

  /** 
   * Add accountant to database
   */
  addAccountant(accountant: accountantMember) {
    return this._httpClient.post("http://localhost:3000/accountants", accountant);
  }

  /** 
   * Delete accountant from database
   */
  deleteAccountant(id: number) {
    return this._httpClient.delete(`http://localhost:3000/accountants/${id}`);
  }

  /** 
   * Edit accountant in database
   */
  editAccountant(id: number, data: any) {
    return this._httpClient.put(`http://localhost:3000/accountants/${id}`, data);
  }

}
