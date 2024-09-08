import { Component, OnInit } from '@angular/core';
import { LibraryService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  books: any[] = [];
  newBook = { title: '', author: '', year: '' };  // New book model
  selectedBook: any = null;  // Book to update or delete

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  // Fetch all books (READ operation)
  getAllBooks() {
    this.libraryService.getBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  // Add a new book (CREATE operation)
  addBook() {
    this.libraryService.addBook(this.newBook).subscribe(
      (data) => {
        this.books.push(data);  // Update local list
        this.newBook = { title: '', author: '', year: '' };  // Reset form
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }

  // Update an existing book (UPDATE operation)
  updateBook() {
    if (!this.selectedBook) return;

    this.libraryService.updateBook(this.selectedBook.id, this.selectedBook).subscribe(
      (data) => {
        console.log('Book updated:', data);
        this.getAllBooks();  // Refresh the list
        this.selectedBook = null;  // Reset the selected book
      },
      (error) => {
        console.error('Error updating book:', error);
      }
    );
  }

  // Delete a book (DELETE operation)
  deleteBook(id: number) {
    this.libraryService.deleteBook(id).subscribe(
      (data) => {
        console.log('Book deleted:', data);
        this.getAllBooks();  // Refresh the list
      },
      (error) => {
        console.error('Error deleting book:', error);
      }
    );
  }

  // Select a book for editing
  selectBook(book: any) {
    this.selectedBook = { ...book };  // Make a copy of the book object
  }
}
