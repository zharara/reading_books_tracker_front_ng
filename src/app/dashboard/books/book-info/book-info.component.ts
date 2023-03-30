import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../data/books-data';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {
  book: Book | null = null;

  constructor(private _location: Location, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.book = JSON.parse(this.activatedRoute.snapshot.params.book);
  }

  back() {
    this._location.back();
  }
}
