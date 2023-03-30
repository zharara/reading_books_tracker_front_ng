import { Component, } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  templateUrl: './about.component.html'
})
export class AboutComponent {
  constructor(private _location: Location) { }


  back() {
    this._location.back();
  }
}
