import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importação de módulos do NG-ZORRO
import { NzIconModule } from 'ng-zorro-antd/icon';

// Solução para problema com ícones do NG-ZORRO
import { IconDefinition } from '@ant-design/icons-angular';
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NzIconModule.forRoot(icons)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
