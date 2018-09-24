import {enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MissingTranslationStrategy} from '@angular/core';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}


// use the require method provided by webpack
declare const require;
// we use the webpack raw-loader to return the content as a string
const local = localStorage.getItem('localeId') ? localStorage.getItem('localeId') : 'en';

const translations = require('raw-loader!./locale/messages.' + local + '.xlf');

platformBrowserDynamic().bootstrapModule(AppModule, {
  missingTranslation: MissingTranslationStrategy.Ignore,
  providers: [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  ]
})
  .catch(err => console.log(err));
