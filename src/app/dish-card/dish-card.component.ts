import {Component, OnInit, Input, ViewContainerRef} from "@angular/core";
import {Dish} from "../model/dish";
import {DinnerService} from "../model/dinner.service";
import {Overlay} from "angular2-modal";
import {Modal} from "angular2-modal/plugins/bootstrap";

@Component({
  selector: 'dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent implements OnInit {
  ngOnInit(): void {
  }

  @Input() dish: Dish;
  @Input() showAddButton: boolean = true;

  constructor(public dinnerService: DinnerService, private overlay: Overlay, private vcRef: ViewContainerRef, private modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  private tableRow = function (ingr) {
    return `
      <tr>
        <td>${ingr.quantity} ${ingr.unit}</td>
        <td>${ingr.name}</td>
        <td>SEK ${ingr.price.toFixed(2)}</td>
      </tr>
      `
  }

  public showModal(): void {
    let m = this.modal.confirm().okBtn('Add');
    if (!this.showAddButton)
      m = this.modal.confirm().okBtnClass("hidden");

    m.size('lg')
      .isBlocking(false)
      .showClose(true)
      .keyboard(27)
      .title(this.dish.name)
      .body(`
            <div class="row">
              <div class="col-xs-12 col-md-4">
                <img class="img-responsive" src="${this.dish.image}" alt="">
              </div>
              <div class="col-xs-12 col-md-6">
                <h4>Preparation</h4>
                <p>${this.dish.description}</p>
                <h4>Ingredients</h4>
                <table class="ingredients-list">
                  <tr>
                    <th>Quantity&nbsp&nbsp</th>
                    <th>Ingredient&nbsp&nbsp</th>
                    <th>Price&nbsp&nbsp</th>
                  </tr>
                  ${this.dish.ingredients.map(i => this.tableRow(i)).join('')}
                </table>
              </div>
            </div>`)
      .open()
      .then((resultPromise) => {
        return resultPromise.result.then(
          (result) => this.dinnerService.addDish(this.dish),
          () => console.log('Rejected')
        );
      });
  }
}
