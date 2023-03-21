import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { UpperCasePipe } from './pipes/upper-case.pipe';
// import { PaymentCardComponent } from './components/payment-card/payment-card.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // CommonModule,
    HttpClientModule,
    // PaymentCardComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  // exports: [PaymentCardComponent]
})
export class AppModule { }
