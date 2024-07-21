import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movieList: any[] = [];
  constructor() {
    if (localStorage.getItem('movieList')) {
      this.movieList = JSON.parse(localStorage.getItem('movieList') as string);
    }
  }
}
