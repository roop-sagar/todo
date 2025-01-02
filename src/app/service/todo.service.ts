import { Injectable } from '@angular/core';
import { TodoList } from '../todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodos(): TodoList[] {
    const todos = localStorage.getItem('todos') || '[]';
    return JSON.parse(todos) || [];
  }

  saveToLocal(todoList: TodoList[]) {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }
}
