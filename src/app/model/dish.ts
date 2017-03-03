import {Ingredient} from "./ingredient";
export class Dish {
  constructor(public id: number,
              public name: string,
              public description: string,
              public type: string,
              public image: string,
              public ingredients: Ingredient[]) {
  }
}
