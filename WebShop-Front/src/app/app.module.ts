import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { RouterModule } from '@angular/router';
import { ReplacePipe } from './replace.pipe';
import { SubCategoriesPageComponent } from './pages/sub-categories-page/sub-categories-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductComponent } from './shared/product/product.component';
import { FiltersComponent } from './pages/products-page/filters/filters.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ProductDetailComponent } from './pages/product-detail-page/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsPageComponent,
    ReplacePipe,
    SubCategoriesPageComponent,
    HomePageComponent,
    ProductComponent,
    FiltersComponent,
    FooterComponent,
    ProductDetailPageComponent,
    ErrorPageComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'home', component: HomePageComponent },
      { path: 'error', component: ErrorPageComponent, pathMatch: 'full' },
      { path: ':categoryName', component: SubCategoriesPageComponent, pathMatch: 'full' },
      { path: ':categoryName/:subCategoryName', component: ProductsPageComponent, pathMatch: 'full' },
      { path: ':categoryName/:subCategoryName/:productId', component: ProductDetailPageComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'error', pathMatch: 'full' }
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
