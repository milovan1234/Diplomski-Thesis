import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  public userRegisterForm: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userRegisterForm = new FormGroup({
      firstName: new FormControl('', [Validators.pattern("^(?=\.{1,40}$)[a-zčćšđžA-ZČĆŠĐŽ]+(?:[-'\s][a-zčćšđžA-ZČĆŠĐŽ]+)*$"),
                                      Validators.required]),
      lastName: new FormControl('', [Validators.pattern("^(?=\.{1,40}$)[a-zčćšđžA-ZČĆŠĐŽ]+(?:[-'\s][a-zčćšđžA-ZČĆŠĐŽ]+)*$"),
                                     Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.pattern('^(?=\.*[a-z])(?=\.*[A-Z])(?=\.*\\d)\.{8,15}$'),
                                     Validators.required]),
      confirmPassword: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.pattern('^\\+(381)\\s(6)\\d{1}\\s\\d{3}\-\\d{3,5}$'),
                                     Validators.required])                               
    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  userRegister(): void {
    this.userService.userRegister(
      this.userRegisterForm.get('firstName').value,
      this.userRegisterForm.get('lastName').value,
      this.userRegisterForm.get('email').value,
      this.userRegisterForm.get('password').value,
      this.userRegisterForm.get('phoneNumber').value).subscribe({
        next: success => {
          alert("Uspešno ste se registrovali! Prijavite se.");
          this.router.navigate(['/login']);
        },
        error: err => {
          alert("Već postoji korisnik sa unesenom email adresom.");
          this.userRegisterForm.controls.email.setValue("");
          this.userRegisterForm.controls.password.setValue("");
          this.userRegisterForm.controls.confirmPassword.setValue("");
        }
      });
  }
}
