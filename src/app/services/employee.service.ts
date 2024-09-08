import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private apiUrl = 'https://api.example.com/books';  // Replace with actual API endpoint

  constructor(private http: HttpClient) { }

  // CREATE: Add a new book
  addBook(book: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, book);
  }

  // READ: Get all books
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // READ: Get a single book by ID
  getBookById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // UPDATE: Update book details
  updateBook(id: number, book: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, book);
  }

  // DELETE: Delete a book
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
