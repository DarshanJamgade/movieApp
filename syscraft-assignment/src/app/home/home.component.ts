import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MovieService } from '../services/movie.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgxDatatableModule, FormsModule, DatePipe, StarRatingModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @ViewChild('movieDetail') movieDetail!: ElementRef;
  movies: any[] = [];
  selectedMovie: any = null;
  searchText: string = '';

  constructor(
    public movieService: MovieService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movies = this.movieService.movieList;
    this.movieService.movieList = [...this.movies];
  }

  selectMovie(event: any, movie: any) {
    if (event.type !== 'click') return;
    this.selectedMovie = movie;
    this.cd.detectChanges();
    this.movieDetail.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    localStorage.setItem('movieList',JSON.stringify(this.movieService.movieList));
  }

  likeMovie(movie: any) {
    movie.liked = !movie.liked;
  }

  addComment(movie: any, comment: string) {
    if (!movie.comments) {
      movie.comments = [];
    }
    movie.comments.push(comment);
  }

  rateMovie(event: any, movie: any) {
    movie.rating = event.rating;
  }

  applyFilter() {
    if (!this.searchText) {
      this.movieService.movieList = [...this.movies];
    } else {
      this.movieService.movieList = this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  clearFilter() {
    this.searchText = '';
    this.movieService.movieList = [...this.movies];
  }
}
