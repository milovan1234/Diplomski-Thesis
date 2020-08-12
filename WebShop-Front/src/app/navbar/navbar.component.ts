import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public categories : Category[];
  constructor(public userService: UserService, public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  public getCategories() : void {
    this.categoryService.getCategories().subscribe({
      next: categories => {
        this.categories = categories;
      }
    });
  }
}
