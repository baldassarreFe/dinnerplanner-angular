import {Component, OnInit} from "@angular/core";
import {DinnerService} from "../model/dinner.service";

@Component({
  selector: 'overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit {

  constructor(public dinnerService: DinnerService) {
  }

  ngOnInit() {
  }

}
