import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';



import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		FormsModule,
		BrowserAnimationsModule,
		
		AppRoutingModule,
		MaterialModule,
		AuthModule,
		CoreModule,
		HttpClientModule,
		ReactiveFormsModule,
		PdfViewerModule,

	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
