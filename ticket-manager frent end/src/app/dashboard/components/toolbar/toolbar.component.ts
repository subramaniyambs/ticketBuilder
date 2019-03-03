import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtService } from '../../../core';
import { Router } from '@angular/router';



@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: [ './toolbar.component.scss' ]
})
export class ToolbarComponent implements OnInit {
	
	mydate: Date;
	@Output() toggleSidenav = new EventEmitter<void>();
	constructor(private jwtService: JwtService, private router: Router) {}

	ngOnInit() {
		setInterval(() => {         //replaced function() by ()=>
			this.mydate = new Date();
			// console.log(this.mydate); // just testing if it is working
		  }, 1000);
	}
	logout() {
		this.jwtService.destroyToken();
		this.router.navigate([ '/login' ]);
	}
	
	
}
