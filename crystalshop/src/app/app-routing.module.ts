import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Clients/components/clients-list/home.component';
import { StockComponent } from './Stock/stock/stock.component'
import { ModalComponent } from './Stock/stock/components/modal/modal.component';
import { ClientsFormComponent } from './Clients/components/clients-form/clients-form.component';
import { OrdersListComponent } from './Orders/components/orders-list/orders-list.component';
import { OrdersFormComponent } from './Orders/components/orders-form/orders-form.component';
import { LinechartComponent } from './Orders/components/linechart/linechart.component';
import { GoogleSigninComponent } from './google-signin/components/google-signin/google-signin.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: GoogleSigninComponent },

  {path: 'stock', component: StockComponent, canActivate: [AuthGuard]},
  {path: 'newstock', component: ModalComponent, canActivate: [AuthGuard] },
  {path: 'stock/edit/:id_stock', component: ModalComponent, canActivate: [AuthGuard] },

  {path: 'client', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'newclient', component: ClientsFormComponent, canActivate: [AuthGuard] },
  {path: 'client/edit/:id_client', component: ClientsFormComponent, canActivate: [AuthGuard] },

  {path: 'ordersjoin', component: OrdersListComponent, canActivate: [AuthGuard] },
  {path: 'neworder', component: OrdersFormComponent, canActivate: [AuthGuard] },
  {path: 'charts', component: LinechartComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
