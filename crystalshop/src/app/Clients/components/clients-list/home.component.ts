import { Component, OnInit } from '@angular/core';
import { Clients } from '../../models/clients';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from '../../services/clients.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  titleInParent = "Clients"

  clients: Clients[] = [];

  private baseUrl = 'http://localhost:5000/';

  constructor(
    private httpClient: HttpClient,
    private ClientsService: ClientsService,

  ) { }

  ngOnInit(): void {
    this.getClients()
  }

  getClients() { // usar services
    this.ClientsService.getClients().subscribe(
      res => {
        this.clients = res;
      });
  }

  delete(id_client: number) {
    var answer = confirm('Are you sure?');
    if (answer == true) {
      this.httpClient
        .delete<Clients[]>(this.baseUrl + 'client/' + id_client)
        .subscribe(
          (res) => {
            this.getClients();
          },
          (err) => {
            if (err.status == 405) {
              alert("Item can't be deleted. The item has an order.");
            }
          }
        );
    }
  }
}
