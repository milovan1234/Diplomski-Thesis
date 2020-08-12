import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProductsForSubCategory(subCategoryId: number) : Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:56123/api/subcategories/${subCategoryId}/products`);
  }
  public getImageFile(productId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:56123/api/products/${productId}/photo`);
  }
}
