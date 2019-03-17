import { DevicesService } from './../../services/devices.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserRegistration } from '../../models/user.registration.interface';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  errors: string;
  isRequesting: boolean;
  submitted = false;

  constructor(private userService: UserService, private deviceService: DevicesService, private router: Router) { }

  ngOnInit() {
    this.deviceService.getDevices().subscribe((res) => {});
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
    this.errors = '';
    if (valid) {
        this.submitted = true;
        this.isRequesting = true;
        this.userService.register(value.email, value.password, value.firstName, value.lastName, value.location)
          .finally(() => this.isRequesting = false)
          .subscribe(
            result  => { if (result) {
                this.router.navigate(['/login']);
            }},
            errors =>  this.errors = errors);
    } else {
      this.errors = 'Fields can\'t be empty';
    }
  }
}
