import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogoDaVelhaComponent } from './jogo-da-velha.component';

@NgModule({
  declarations: [JogoDaVelhaComponent],
  imports: [CommonModule],
  exports: [JogoDaVelhaComponent],
  // Quando não se trabalha com as rotas, é preciso exportar o componente, bastando apenas chamar sua tag no html.
})
export class JogoDaVelhaModule {}
