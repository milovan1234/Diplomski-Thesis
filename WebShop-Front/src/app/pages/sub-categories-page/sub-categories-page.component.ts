import { Component, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/models/subCategory';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';

@Component({
  selector: 'app-sub-categories-page',
  templateUrl: './sub-categories-page.component.html',
  styleUrls: ['./sub-categories-page.component.css']
})
export class SubCategoriesPageComponent implements OnInit {
  public categoryId: number;
  public categoryName: string;
  public subCategories: SubCategory[];

  constructor(private route: ActivatedRoute, 
              private categoryService: CategoryService, 
              private subCategoryService: SubCategoryService) { }

  ngOnInit(): void {
    this.route.url.subscribe(params => {
      this.categoryName = params[0].path.replace(/-/g, " ");
      this.categoryService.getCategories().subscribe({
        next: categories => {
          this.categoryId = categories.find(x => x.categoryName.toLowerCase() == this.categoryName).id;
          this.getSubCategories();
        }
      });
    });    
  }
  
  public getSubCategories() {
    this.subCategoryService.getSubCategoriesForCategory(this.categoryId).subscribe({
      next: subCategories => {
        this.subCategories = subCategories;
      }
    });
  }
}
