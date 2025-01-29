import { Component, OnInit } from '@angular/core';
import { JogoDaForcaService } from '../../services/jogo-da-forca.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  dica: string = '';
  progresso: string = '';
  qtd_letras: number = 0;
  mensagem: string = '';
  letra: string = '';
  palavra: string = '';
  erros:  number = 0;

  alfabeto: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  letrasTentadas: string[] = [];
  letrasCertas: string[] = [];
  letrasErradas: string[] = [];
  vitoria: boolean = false;

  constructor(private jogoDaForcaService: JogoDaForcaService) {}

  ngOnInit(): void {
    this.inicializarJogo();
  }

  inicializarJogo(): void {
    this.letrasTentadas = [];
    this.letrasCertas = [];
    this.letrasErradas = [];
    this.vitoria = false;
    this.erros = 0;

    this.jogoDaForcaService.inicializarJogo().subscribe((data) => {
      this.dica = data.dica;
      this.qtd_letras = data.qtd_letras;
      this.mensagem = '';
      this.progresso = data.progresso;
    });
  }

  tentarLetra(letra: string): void {
    if (!this.letrasTentadas.includes(letra)) {
      this.letrasTentadas.push(letra);
      this.jogoDaForcaService.tentarLetra(letra).subscribe((response) => {
        this.progresso = response.progresso;
        this.mensagem = response.mensagem;
        if (response.acerto) {
          this.letrasCertas.push(letra);
        } else {
          this.erros = response.erros;
          this.letrasErradas.push(letra);
        }

        if (response.vitoria !== null) {
          this.vitoria = response.vitoria;
        }
      });
    }
  }

  adivinharPalavra(): void {
    if (!this.vitoria) { 
      this.jogoDaForcaService.adivinharPalavra(this.palavra).subscribe((response: { mensagem: string; progresso: string; vitoria: boolean }) => {
        this.palavra = '';
        this.mensagem = response.mensagem; 
        this.progresso = response.progresso
        this.vitoria = response.vitoria;  
      });
    }
  }  

  getMensagemClasse(): string {
    if (this.vitoria === false && this.mensagem.toLowerCase().includes('perdeu')) {
      console.log(this.vitoria);
      return 'mensagem-vermelha';
    } else if (this.vitoria === true && this.mensagem.toLowerCase().includes('ganhou')) {
      return 'mensagem-verde';  
    } else {
      return 'mensagem-progresso';
    }
  }
  
}
