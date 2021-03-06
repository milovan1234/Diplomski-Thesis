import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './temp/auth.guard';
import { UserGuard } from './temp/user.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtInterceptor } from './temp/jwt.interceptor';
import { ErrorInterceptor } from './temp/error.interceptor';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { CookieService } from 'ngx-cookie-service';
import { ShopCartPageComponent } from './pages/shop-cart-page/shop-cart-page.component';
import { CartProductComponent } from './pages/shop-cart-page/cart-product/cart-product.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

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
    ProductDetailComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ShopCartPageComponent,
    CartProductComponent,
    SearchPageComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'home', component: HomePageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'error', component: ErrorPageComponent, pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'cart', component: ShopCartPageComponent, pathMatch: 'full' , canActivate: [UserGuard]},
      { path: 'register', component: RegisterPageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: ':categoryName', component: SubCategoriesPageComponent, pathMatch: 'full' },
      { path: ':categoryName/:subCategoryName', component: ProductsPageComponent, pathMatch: 'full' },
      { path: ':categoryName/:subCategoryName/:productId', component: ProductDetailPageComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'error', pathMatch: 'full' }
    ]),
    HttpClientModule    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
