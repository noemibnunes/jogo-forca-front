import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JogoDaForcaService {
  private apiUrl = 'http://localhost:8080/jogo-da-forca';

  constructor(private http: HttpClient) { }

  inicializarJogo(): Observable<{ dica: string; qtd_letras:  number; progresso: string}> {
    return this.http.get<{ dica: string; qtd_letras:  number; progresso: string }>(`${this.apiUrl}/iniciar`);
  }

  tentarLetra(letra: string): Observable<{ acerto: boolean; progresso: string; erros: number; mensagem: string; vitoria: boolean | null }> {
    return this.http.post<{ acerto: boolean; progresso: string; erros: number; mensagem: string; vitoria: boolean | null }>(
      `${this.apiUrl}/tentar`, 
      { letra }
    );
  }
  
  

  adivinharPalavra(palavra: string): Observable<string> {
    const params = new HttpParams().set('palavra', palavra);
    return this.http.post(`${this.apiUrl}/adivinhar`, {}, { params, responseType: 'text' });
  }
}
