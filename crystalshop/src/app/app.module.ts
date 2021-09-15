import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Clients/components/clients-list/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StockComponent } from './Stock/stock/stock.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './Stock/stock/components/modal/modal.component';
import { ClientsFormComponent } from './Clients/components/clients-form/clients-form.component';
import { OrdersListComponent } from './Orders/components/orders-list/orders-list.component';
import { OrdersFormComponent } from './Orders/components/orders-form/orders-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StockComponent,
    ModalComponent,
    ClientsFormComponent,
    OrdersListComponent,
    OrdersFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  // entryComponents: [ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
