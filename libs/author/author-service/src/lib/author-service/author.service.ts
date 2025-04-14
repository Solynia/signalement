import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author, AuthorCreate, AuthorUpdate } from './author.model';

const API_URL = '/api/author';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  constructor(private httpClient: HttpClient) {}

  findById(id: string) {
    return this.httpClient.get<Author>(`${API_URL}/${id}`);
  }

  findAll() {
    return this.httpClient.get<Author[]>(`${API_URL}`);
  }

  create(data: AuthorCreate) {
    return this.httpClient.post<Author>(`${API_URL}`, data);
  }

  update(id: string, data: AuthorUpdate) {
    return this.httpClient.put<Author>(`${API_URL}/${id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete<{ id: string }>(`${API_URL}/${id}`);
  }
}
