import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/services/interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
  standalone: true
})
export class CarDetailsComponent implements OnInit {

  userDetails?: UserDetails;
  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.userDetails = this.getUserDetails();
  }

  private getUserDetails(): UserDetails {
    return this.storageService.userDetails;
  }

  navigate() { this.router.navigate(['slots']) }

}
