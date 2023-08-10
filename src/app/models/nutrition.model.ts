import { Meal } from './meal.model';

export class Nutrition {
  constructor(
    public memberPhoto: string,
    public memberName: string,
    public nutritionGoal: string,
    public nutritionPlan: Meal[],
    public id: number
  ) {}
}
