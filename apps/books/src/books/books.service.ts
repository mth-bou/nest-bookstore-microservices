import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '@app/contracts/books/create-book.dto';
import { UpdateBookDto } from '@app/contracts/books/update-book.dto';
import { BookDto } from '@app/contracts/books/book.dto';

@Injectable()
export class BooksService {
  private books: BookDto[] = [
    {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      rating: 4.5,
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Author 2',
      rating: 4.0,
    },
  ];

  create(createBookDto: CreateBookDto) {
    const newBook: BookDto = {
      ...createBookDto,
      id: this.books.length + 1,
    };

    this.books.push(newBook);
    return newBook;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    const updatedBook = { ...this.books[bookIndex], ...updateBookDto };
    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  remove(id: number) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    const removedBook = this.books.splice(bookIndex, 1);
    return removedBook[0];
  }
}
