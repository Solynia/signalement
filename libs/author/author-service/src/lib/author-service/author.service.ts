import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Author, AuthorCreate, AuthorUpdate } from './author.model';

const API_URL = '/api/author';

// TODO implement in backend
const mapStringToDate = (el: Author): Author => ({
  ...el,
  birth_date: new Date(el.birth_date),
});

@Injectable({ providedIn: 'root' })
export class AuthorService {
  constructor(private httpClient: HttpClient) {}

  findById(id: string) {
    return this.httpClient
      .get<Author>(`${API_URL}/${id}`)
      .pipe(map(mapStringToDate));
  }

  findAll() {
    return this.httpClient
      .get<Author[]>(`${API_URL}`)
      .pipe(map((v) => v.map(mapStringToDate)));
  }

  create(data: AuthorCreate) {
    return this.httpClient
      .post<Author>(`${API_URL}`, data)
      .pipe(map(mapStringToDate));
  }

  update(id: string, data: AuthorUpdate) {
    return this.httpClient
      .put<Author>(`${API_URL}/${id}`, data)
      .pipe(map(mapStringToDate));
  }

  delete(id: string) {
    return this.httpClient.delete<{ id: string }>(`${API_URL}/${id}`);
  }
}
