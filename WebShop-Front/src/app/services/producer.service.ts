import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producer } from '../models/producer';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  constructor(private http: HttpClient) { }

  getProducersForSubCategory(subCategoryId: number) : Observable<Producer[]> {
    return this.http.get<Producer[]>(`http://localhost:56123/api/subcategories/${subCategoryId}/producers`);
  }
}
