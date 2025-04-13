import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Signalement,
  SignalementCreate,
  SignalementUpdate,
} from './signalement.model';

const API_URL = '/api/signalement';

@Injectable({ providedIn: 'root' })
export class SignalementService {
  constructor(private httpClient: HttpClient) {}

  findById(id: string) {
    return this.httpClient.get<Signalement>(`${API_URL}/${id}`);
  }

  findAll() {
    return this.httpClient.get<Signalement[]>(`${API_URL}`);
  }

  create(data: SignalementCreate) {
    return this.httpClient.post<Signalement>(`${API_URL}`, data);
  }

  update(id: string, data: SignalementUpdate) {
    return this.httpClient.put<Signalement>(`${API_URL}/${id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete<{ id: string }>(`${API_URL}/${id}`);
  }
}
