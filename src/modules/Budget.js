import { Category } from './Category.js';

export class Budget {
  constructor(title = 'New Budget') {
    this.title = title,
    this.income = 0,
    this.categories = [
      new Category("Savings"),
      new Category("Giving"),
      new Category("Housing"),
      new Category("Transportation"),
      new Category("Food"),
      new Category("Personal"),
      new Category("Lifestyle"),
      new Category("Health"),
      new Category("Insurance"),
      new Category("Debt"),
    ],
    this.active = true
  }
}