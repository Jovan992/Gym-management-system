import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nutrition } from '../models/nutrition.model';
import { Members } from '../models/members.model';
import { Meal } from '../models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class NutritionScheduleService {
  buttonStatus: string = '';
  dailyMealSchedule: Meal[] = [];

  constructor(private http: HttpClient) {}

  getMeal(data: Meal) {
    this.dailyMealSchedule.push(data);
    return this.dailyMealSchedule;
  }
  resetMeal() {
    return (this.dailyMealSchedule = []);
  }
  /**
   * Gets nutrition schedule data from the database
   * @returns Array of nutritionSchedule objects from the database
   */
  getNutritionSchedule() {
    return this.http.get<Nutrition[]>(
      'http://localhost:3000/nutritionSchedule'
    );
  }

  /**
   * Adds data to the nutritionSchedule database
   * @param data Nutrition object
   * @returns added Nutrition object
   */
  addNutritionSchedule(data: Nutrition) {
    return this.http.post('http://localhost:3000/nutritionSchedule', data);
  }

  /**
   * Saves edited object to the database
   * @param id Id of the nutrition object in the database
   * @param data Nutrition object
   * @returns Edited nutrition object
   */
  editNutritionSchedule(id: number, data: Nutrition) {
    return this.http.put(`http://localhost:3000/nutritionSchedule/${id}`, data);
  }

  /**
   * Deletes nutrition schedule object from the database
   * @param id Id of the Nutrition Schedule object for deletion
   * @returns deleted object
   */
  deleteNutritionSchedule(id: number) {
    return this.http.delete(`http://localhost:3000/nutritionSchedule/${id}`);
  }

  /**
   * Removes nutrition schedule of the deleted member
   * @param id Id of deleted member from the database
   */
  removeNutritionBasedOnMember(id: number) {
    this.getNutritionSchedule().subscribe({
      next: (value) => {
        const nutrition = value.find((nutr) => nutr.id === id);
        if (!nutrition) return;
        this.deleteNutritionSchedule(id).subscribe({
          next: (value) => {},
          error: (err) => {},
        });
      },
      error: (error) => {},
    });
  }

  /**
   * Updates nutrition schedule object based on the edited Members object
   * @param id Id of the nutritionSchedule object that is updated
   * @param data Members object that is edited
   */
  updateNutritionSchedule(id: number, data: Members) {
    this.getNutritionSchedule().subscribe({
      next: (value) => {
        let nutrition = value.find((nutr) => {
          return nutr.id === id;
        });
        if (nutrition) {
          nutrition.memberName = data.name + ' ' + data.surname;
          nutrition.memberPhoto = data.photo;
          this.editNutritionSchedule(id, nutrition).subscribe({
            next: (val) => {},
            error: (err) => {},
          });
        }
      },
      error: (err) => {},
    });
  }
}
