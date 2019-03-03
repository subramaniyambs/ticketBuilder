


import { ClientService } from './../../../clients/services/client.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';


import { TicketService } from './../../../tickets/services/ticket.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import 'rxjs/add/operator/map';
import { Ticket } from '../../../tickets/models/ticket';

import 'rxjs/Rx';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
 
})
export class HomeComponent implements OnInit {

  LineChart =[];
  constructor( private TicketService: TicketService,
               private clientService: ClientService) {}
  
  dataSource = new MatTableDataSource<Ticket>();
  
  resultsLength = 0;
  ClientresultsLength= 0;
  isResultsLoading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    // line chart 
    this.TicketService.getTickets(name).subscribe(
      data => {
        this.dataSource.data = data.docs;
        console.log(data);
        this.resultsLength = data.total;
      },
    
    ) ;

    this.LineChart = new Chart('lineChart' ,{
      type: 'line',
      data: {
        labels: ["Jan","Feb","March","April","May","Lune","July","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
          label: 'Number of tickets in months',
          data: [2,5,4,7,6,9,2,5,4,1,5,9],
          fill:false,
          lineTension: 0.2,
          borderColor:"red",
          borderWidth: 1
        }]
      },
      options:{
          title: {
            text:"line chart",
            display:true
          },
          scales:{
            yAxes:[{
              ticks:{
                beginAtZero:true
              }
            }]
          }
        }
    });
  }
}
