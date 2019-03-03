import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	template: `
   <app-toolbar></app-toolbar>
  `,
	styles: []
})
export class DashboardComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
	
}
