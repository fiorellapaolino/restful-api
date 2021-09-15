import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Clients/components/clients-list/home.component';
import { StockComponent } from './Stock/stock/stock.component'
import { ModalComponent } from './Stock/stock/components/modal/modal.component';
import { ClientsFormComponent } from './Clients/components/clients-form/clients-form.component';
import { OrdersListComponent } from './Orders/components/orders-list/orders-list.component';
import { OrdersFormComponent } from './Orders/components/orders-form/orders-form.component';

const routes: Routes = [
  {path: 'stock', component: StockComponent},
  {path: 'newstock', component: ModalComponent},
  {path: 'stock/edit/:id_stock', component: ModalComponent},

  {path: 'client', component: HomeComponent},
  {path: 'newclient', component: ClientsFormComponent},
  {path: 'client/edit/:id_client', component: ClientsFormComponent},

  {path: 'orders', component: OrdersListComponent},
  {path: 'neworder', component: OrdersFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
