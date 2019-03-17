import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  isExpanded = false;
  userStatus: boolean;
  subscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(status => this.userStatus = status);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  collapse() {
    this.isExpanded = false;
  }

  logout() {
    this.collapse();
    this.userService.logout();
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
