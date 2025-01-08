import { Injectable } from '@angular/core';
import { TodoList } from '../todo.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodos(): Observable<TodoList[]> {
    return of(JSON.parse(localStorage.getItem('todos') || '[]'));
  }

  saveToLocal(todoList: TodoList[]) {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }
}
