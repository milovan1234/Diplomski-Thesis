import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public userLoginForm: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userLoginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.pattern('^(?=\.*[a-z])(?=\.*[A-Z])(?=\.*\\d)\.{8,15}$'),
                                     Validators.required])
    });
    
  }

  userLogin() : void {
    let email: string = this.userLoginForm.get('email').value;
    let password: string = this.userLoginForm.get('password').value;
    this.userService.userLogin(email, password).subscribe({
      next: user => {
        this.router.navigate(['/home']);
      },
      error: err => {
        alert("Uneseni podaci nisu ispravni! Pokušajte ponovo.");
        this.userLoginForm.controls.password.setValue("");
      }
    });
  }
}
