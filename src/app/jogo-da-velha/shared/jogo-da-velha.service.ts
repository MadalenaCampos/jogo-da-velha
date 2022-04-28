import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JogoDaVelhaService {
  // Constantes.

  // Tamanho do tabuleiro.
  private readonly TAM_TAB: number = 3;
  // Peças
  private readonly X: number = 1;
  private readonly O: number = 2;
  // O tabuleiro representará 3 estados (X, O, VAZIO) ou (1, 2, 0).
  private readonly VAZIO: number = 0;

  // Atributos de controle do jogo.

  private tabuleiro: any;
  // Número de movimentos realizados, começando em zero e acabando no tamanho do tabuleiro(9), caso chegue em 9 e o jogo não tenha acabado significa que deu empate.
  private numMovimentos: number;
  // Utilizados para armazenar as posições da vitória, usado pra destacar o caminho de quem venceu.
  private vitoria: any;

  // Atributos usados pra indicar quem perdeu ou venceu, indicando qual tela deve ser exibida.
  private _jogador: number;
  private _showInicio: boolean;
  private _showTabuleiro: boolean;
  private _showFinal: boolean;

  // O underline é uma convenção usada para definir variáveis/atributos privados em uma classe

  constructor() {}

  public inicializar(): void {
    this._showInicio = true;
    this._showTabuleiro = false;
    this._showFinal = false;
    this.numMovimentos = 0;
    this._jogador = this.X;
    this.vitoria = false;
    this.inicializarTabuleiro();
  }

  public inicializarTabuleiro(): void {
    this.tabuleiro = [this.TAM_TAB];
    for (let i = 0; i < this.TAM_TAB; i++) {
      this.tabuleiro[i] = [this.VAZIO, this.VAZIO, this.VAZIO];
      // Com isso o tabuleiro é inicializado com todos os campos vazios.
    }
  }

  get showInicio(): boolean {
    // Retorna se a tela de início deve ser exibida.
    return this._showInicio;
  }

  get showTabuleiro(): boolean {
    // Retorna se a tela de tabuleiro deve ser exibida.
    return this._showTabuleiro;
  }

  get showFinal(): boolean {
    // Retorna se a tela de final deve ser exibida.
    return this._showFinal;
  }

  get jogador(): number {
    // Retorna qual o jogador que está jogando.
    return this._jogador;
  }

  public iniciarJogo(): void {
    this._showInicio = false;
    this._showTabuleiro = true;
  }

  public jogar(posX: number, posY: number): void {
    // Jogada invalida
    if (this.tabuleiro[posX][posY] !== this.VAZIO || this.vitoria) {
      // Se a posição já estiver ocupada ou o jogo já acabou, não faz nada.
      return;
    }

    this.tabuleiro[posX][posY] = this._jogador;
    this.numMovimentos++;
    // Verifica se o jogo acabou.
    this.vitoria = this.fimJogo(posX, posY, this.tabuleiro, this._jogador);
    // Faz a inversão do jogador.
    this._jogador = this._jogador === this.X ? this.O : this.X;

    // Se o jogo acabou, exibe a tela de final.
    if (this.vitoria !== false) {
      this._showFinal = true;
    }

    // Se o jogo não acabou é a vez do próximo jogador(CPU).
    if (!this.vitoria && this.numMovimentos < 9) {
      this.cpuJogar();
    }

    // Houve vitória
    if (this.vitoria !== false) {
      this._showFinal = true;
    }

    // Houve empate
    if (this.numMovimentos === 9 && !this.vitoria) {
      this._jogador = 0;
      this._showFinal = true;
    }
  }

  public fimJogo(
    linha: number,
    coluna: number,
    tabuleiro: number,
    jogador: number
  ): any {
    let fim: any = false;

    // Valida a linha
    if (
      tabuleiro[linha][0] === jogador &&
      tabuleiro[linha][1] === jogador &&
      tabuleiro[linha][2] === jogador
    ) {
      fim = [
        [linha, 0],
        [linha, 1],
        [linha, 2],
      ];
    }

    // Valida a coluna
    if (
      tabuleiro[0][coluna] === jogador &&
      tabuleiro[1][coluna] === jogador &&
      tabuleiro[2][coluna] === jogador
    ) {
      fim = [
        [0, coluna],
        [1, coluna],
        [2, coluna],
      ];
    }

    // Valida a diagonal
    if (
      tabuleiro[0][0] === jogador &&
      tabuleiro[1][1] === jogador &&
      tabuleiro[2][2] === jogador
    ) {
      fim = [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
    }

    if (
      tabuleiro[0][2] === jogador &&
      tabuleiro[1][1] === jogador &&
      tabuleiro[2][0] === jogador
    ) {
      fim = [
        [0, 2],
        [1, 1],
        [2, 0],
      ];
    }

    return fim;
  }

  public cpuJogar(): void {
    // Verifica jogada de vitória
    let jogada: number[] = this.obterJogada(this.O);

    if (jogada.length <= 0) {
      // Tenta fazer uma jogada para evitar derrota
      jogada = this.obterJogada(this.X);
    }

    if (jogada.length <= 0) {
      // Se não conseguir fazer uma jogada para não derrota, faz uma jogada aleatória.
      let jogadas: any = [];

      for (let i = 0; i < this.TAM_TAB; i++) {
        for (let j = 0; j < this.TAM_TAB; j++) {
          if (this.tabuleiro[i][j] === this.VAZIO) {
            jogadas.push([i, j]);
          }
        }
      }
      let k = Math.floor(Math.random() * (jogadas.length - 1));
      jogada = [jogadas[k][0], jogadas[k][1]];
    }

    this.tabuleiro[jogada[0]][jogada[1]] = this._jogador;
    this.numMovimentos++;
    // Verifica se o jogo acabou.
    this.vitoria = this.fimJogo(
      jogada[0],
      jogada[1],
      this.tabuleiro,
      this._jogador
    );
    // Faz a inversão do jogador.
    this._jogador = this._jogador === this.X ? this.O : this.X;
  }

  public obterJogada(jogador: number): number[] {
    let tab = this.tabuleiro;
    for (let lin = 0; lin < this.TAM_TAB; lin++) {
      for (let col = 0; col < this.TAM_TAB; col++) {
        if (tab[lin][col] !== this.VAZIO) {
          continue;
        }
        tab[lin][col] = jogador;
        if (this.fimJogo(lin, col, tab, jogador)) {
          return [lin, col];
        }
        tab[lin][col] = this.VAZIO;
      }
    }
    return [];
  }

  public exibirX(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.X;
  }

  public exibirO(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.O;
  }

  public exibirVitoria(posX: number, posY: number): boolean {
    let exibirVitoria: boolean = false;

    if (!this.vitoria) {
      return exibirVitoria;
    }

    for (let pos of this.vitoria) {
      if (pos[0] === posX && pos[1] === posY) {
        exibirVitoria = true;
        break;
      }
    }
    return exibirVitoria;
  }

  public novoJogo(): void {
    this.inicializar();
    this._showFinal = false;
    this._showInicio = false;
    this._showTabuleiro = true;
  }
}
