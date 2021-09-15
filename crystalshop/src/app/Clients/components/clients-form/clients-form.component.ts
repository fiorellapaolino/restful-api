import { Component, OnInit } from '@angular/core';
import { Clients } from '../../models/clients';
import { ClientsService } from '../../services/clients.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit {
  client: Clients = {
    id_client: 0,
    name_client: '',
  };
  private baseUrl = 'http://localhost:5000/';
  edit: boolean = false;

  constructor( 
    private ClientsService: ClientsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id_client) {
      this.ClientsService.getOneClient(params.id_client).subscribe(
        res => {
          console.log(res)
          this.client = res;
          // this.client.id_client = res.id_client;
          this.edit = true;
        },
        (err) => { if (err.status == 404) console.log(err);
        }
      );
    }
  }

  saveNewClient(client: Clients) {
      this.ClientsService.saveClients(this.client).subscribe(
      (newclient) => {
        console.log('savenewitem', newclient);
        this.router.navigate(['/client']);
      },
      (err) => {
        if (err.status == 500) console.log(err);
      }
    );
  }

  updateClients() {
    this.ClientsService.updateClients(this.client.id_client, this.client).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/client']);
      },
      (err) => { if (err.status == 404) console.log(err);
      }
    );
  }
}