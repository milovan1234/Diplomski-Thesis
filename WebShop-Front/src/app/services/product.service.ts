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

  public getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:56123/api/products/${productId}`);
  }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:56123/api/products`);
  }
}
