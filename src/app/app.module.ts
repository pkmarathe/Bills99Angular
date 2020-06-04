import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';  
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';   
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule} from 'agm-direction'; // agm-direction
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,    
    PagesModule,
    routing,
    HttpClientModule,
    HttpModule,Ng4LoadingSpinnerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDwRZHa0qDJS3dt-HYIf8h_t1jK-TycAco'
    }),
    AgmDirectionModule
  ],
  declarations: [
    AppComponent,
  ],   
  bootstrap: [AppComponent],  
})
export class AppModule { }
