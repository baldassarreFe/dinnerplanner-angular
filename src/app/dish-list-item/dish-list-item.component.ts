import {Component, OnInit, Input} from "@angular/core";
import {Dish} from "../model/dish";
import {DinnerService} from "../model/dinner.service";

@Component({
  selector: 'dish-list-item',
  templateUrl: './dish-list-item.component.html',
  styleUrls: ['./dish-list-item.component.css']
})
export class DishListItemComponent implements OnInit {

  @Input() dish: Dish;

  public pricePerOnePerson: number;

  constructor(public dinnerService: DinnerService) {
  }

  ngOnInit() {
    this.pricePerOnePerson = this.dish.ingredients
      .map(i => i.price)
      .reduce((a, b) => a + b, 0);
  }

}
