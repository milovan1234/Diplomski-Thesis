import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubCategory } from '../models/subCategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private http: HttpClient) { }

  public getSubCategoriesForCategory(categoryId: number) : Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(`http://localhost:56123/api/categories/${categoryId}/subcategories`);
  }
  public getSubCategories() : Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(`http://localhost:56123/api/subcategories`);
  }
}
