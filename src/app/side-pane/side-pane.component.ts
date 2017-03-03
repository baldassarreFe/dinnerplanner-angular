import {Component, OnInit} from "@angular/core";
import {DinnerService} from "../model/dinner.service";

@Component({
  selector: 'side-pane',
  templateUrl: './side-pane.component.html',
  styleUrls: ['./side-pane.component.css']
})
export class SidePaneComponent implements OnInit {

  constructor(public dinnerService: DinnerService) {
  }

  ngOnInit() {
  }

}
