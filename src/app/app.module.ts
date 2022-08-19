import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/*BrowserAnimationsMosule can only be used after installing angular material*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { DataService } from './data.service';
import { ReactiveFormsModule } from '@angular/forms'; /*For creating a registration form */
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    BrowserAnimationsModule,
    ToastrModule.forRoot(),/*isse ham jo pop up show hoga alert type usko modify*/
    ReactiveFormsModule,   
    HttpClientModule, /*API ko call krne ke liye*/ /*Get Put Post request perform krne ke liye*/
    HttpClientInMemoryWebApiModule.forRoot(DataService),

  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }

