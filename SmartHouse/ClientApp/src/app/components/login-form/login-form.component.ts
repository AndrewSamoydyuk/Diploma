import { Subscription } from 'rxjs/Subscription';
import { Credentials } from '../../models/credentials.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  errors: string;
  isRequesting: boolean;
  submitted = false;
  credentials: Credentials = { email: '', password: '' };


  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userService.logout();
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
         this.credentials.email = param['email'];
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.errors = '';
    if (valid) {
      this.submitted = true;
      this.isRequesting = true;
      this.userService.login(value.email, value.password)
        .finally(() => this.isRequesting = false)
        .subscribe(
        result => {
          if (result) {
             this.router.navigate(['/']);
          }
        },
        error => this.errors = error);
    } else {
      this.errors = 'Fields can\'t be empty';
    }
  }
}
