import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
  Signalement,
  SignalementCreate,
  SignalementUpdate,
} from './signalement.model';

const API_URL = '/api/signalement';

// TODO implement in backend
const mapStringToDate = (el: Signalement): Signalement => ({
  ...el,
  author: {
    ...el.author,
    birth_date: new Date(el.author.birth_date),
  },
});

@Injectable({ providedIn: 'root' })
export class SignalementService {
  constructor(private httpClient: HttpClient) {}

  findById(id: string) {
    return this.httpClient
      .get<Signalement>(`${API_URL}/${id}`)
      .pipe(map(mapStringToDate));
  }

  findAll() {
    return this.httpClient
      .get<Signalement[]>(`${API_URL}`)
      .pipe(map((v) => v.map(mapStringToDate)));
  }

  create(data: SignalementCreate) {
    return this.httpClient
      .post<Signalement>(`${API_URL}`, data)
      .pipe(map(mapStringToDate));
  }

  update(id: string, data: SignalementUpdate) {
    return this.httpClient
      .put<Signalement>(`${API_URL}/${id}`, data)
      .pipe(map(mapStringToDate));
  }

  delete(id: string) {
    return this.httpClient.delete<{ id: string }>(`${API_URL}/${id}`);
  }
}
