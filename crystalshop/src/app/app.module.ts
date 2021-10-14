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
import { LinechartComponent } from './Orders/components/linechart/linechart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { PiechartComponent } from './Stock/stock/components/piechart/piechart.component';
import { GoogleSigninComponent } from './google-signin/components/google-signin/google-signin.component';
import { AuthService } from './shared/auth/auth.service';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AuthGuard } from './shared/guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StockComponent,
    ModalComponent,
    ClientsFormComponent,
    OrdersListComponent,
    OrdersFormComponent,
    LinechartComponent,
    PiechartComponent,
    GoogleSigninComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    HighchartsChartModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule

    ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
