import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { HostListener } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ShopCartService } from 'src/app/services/shop-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent implements OnInit {
  public categories : Category[];
  constructor(
    public userService: UserService, 
    public categoryService: CategoryService,
    private router: Router,
    public shopCartService: ShopCartService) { }

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

  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e) {
    let element = document.querySelector('.navbar');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('sticky-top');
    } else {
      element.classList.remove('sticky-top');
    }
  }

  onClickLogo() : void {
    this.router.navigate(['/home']);
  }

  onClickLogout(): void {
    this.userService.userLogout();
    alert("Uspešno ste se odjavili!");
    this.router.navigate(['/home']);
  }
  
}
