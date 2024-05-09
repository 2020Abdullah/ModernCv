import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthServiceService } from './Services/auth-service.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyworkComponent } from './dashboard/mywork/mywork.component';
import { InterviewComponent } from './dashboard/interview/interview.component';
import { CreateWorkComponent } from './dashboard/mywork/create-work/create-work.component';
import { UpdateWorkComponent } from './dashboard/mywork/update-work/update-work.component';
import { MyserviceComponent } from './dashboard/myservice/myservice.component';
import { CreateMyserviceComponent } from './dashboard/myservice/create-myservice/create-myservice.component';
import { OrderComponent } from './order/order.component';
import { AllOrderComponent } from './dashboard/all-order/all-order.component';
import { AllMessagesComponent } from './dashboard/all-messages/all-messages.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: 'full'},
  {path: "home", component: HomeComponent, title: 'home'},
  {path: "create", component: CreateComponent, title: 'create'},
  {path: "signIn", component: LoginComponent, title: 'Login'},
  {path: "order/:id", component: OrderComponent},
  {path: "dashboard", component: DashboardComponent, title: 'dashboard', children: [
    {path: 'mywork', component: MyworkComponent},
    {path: 'mywork/add', component: CreateWorkComponent},
    {path: 'mywork/update/:id', component: UpdateWorkComponent},
    {path: 'InterView', component: InterviewComponent},
    {path: 'myservices', component: MyserviceComponent},
    {path: 'myservices/add', component: CreateMyserviceComponent},
    {path: 'Orders/index', component: AllOrderComponent},
    {path: 'Messages/index', component: AllMessagesComponent},
  ], canActivate: [AuthServiceService]},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
