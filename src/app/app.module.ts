import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './Layouts/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyworkComponent } from './dashboard/mywork/mywork.component';
import { InterviewComponent } from './dashboard/interview/interview.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CreateWorkComponent } from './dashboard/mywork/create-work/create-work.component';
import { UpdateWorkComponent } from './dashboard/mywork/update-work/update-work.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { MyserviceComponent } from './dashboard/myservice/myservice.component';
import { CreateMyserviceComponent } from './dashboard/myservice/create-myservice/create-myservice.component';
import { OrderComponent } from './order/order.component';
import { AllOrderComponent } from './dashboard/all-order/all-order.component';
import { AllMessagesComponent } from './dashboard/all-messages/all-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    MyworkComponent,
    InterviewComponent,
    CreateWorkComponent,
    UpdateWorkComponent,
    MyserviceComponent,
    CreateMyserviceComponent,
    OrderComponent,
    AllOrderComponent,
    AllMessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxTypedJsModule,
    NgxSpinnerModule.forRoot({ type: "ball-scale-multiple" }),
  ],
  providers: [
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


