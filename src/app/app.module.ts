/**
 * Modules
 */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


/**
 *  others
 */
import {AppRoutingModule} from './app-routing.module';

/**
 * Components
 */
import {AppComponent} from './app.component';
import {AuthInterceptor} from './shared/interceptors/auth-interceptor';
import {CoreModule} from './core/core.module';
import {BreadcrumbsModule} from 'ng6-breadcrumbs';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BreadcrumbsModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [
    RouterModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
