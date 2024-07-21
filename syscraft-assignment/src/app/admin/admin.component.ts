import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  movieForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      cast: this.formBuilder.array(['']),
      releaseDate: ['', Validators.required],
      publishMovie: [false],
      publishReview: [false],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.movieForm.controls;
  }

  onSubmit() {
    if (this.movieForm.invalid) {
      return;
    }
    this.movieService.movieList.push(this.movieForm.value);
    localStorage.setItem(
      'movieList',
      JSON.stringify(this.movieService.movieList)
    );
    this.movieForm.reset()
  }

  addItem() {
    const control = this.formBuilder.control('');
    this.formArray.push(control);
  }

  get formArray(): FormArray {
    return this.movieForm.get('cast') as FormArray;
  }
}
