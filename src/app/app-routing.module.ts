import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TODO: Make components standalone of feasible
// TODO: Set title as Parking Automation - Search
const routes: Routes = [
  {
    path: 'search',
    loadComponent: () => import('./components/search-car/search-car.component')
      .then((mod) => mod.SearchCarComponent)
  },
  {
    path: 'registration',
    loadComponent: () => import('./components/registration/registration.component')
      .then((mod) => mod.RegistrationComponent)
  },
  {
    path: 'car-details',
    loadComponent: () => import('./components/car-details/car-details.component')
      .then((mod) => mod.CarDetailsComponent)
  },
  {
    path: 'slots',
    loadComponent: () => import('./components/parking-slot-selection/parking-slot-selection.component')
      .then((mod) => mod.ParkingSlotSelectionComponent)
  },
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  { path: '**', redirectTo: 'search' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
