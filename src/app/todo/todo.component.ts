import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoList } from '../todo.interface';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  title: string = '';
  description: string = '';
  todoList: TodoList[] = [];
  isEditing: number = 0;
  buttonValue: string = 'Add';

  constructor(private todoListService: TodoService){}

  ngOnInit(): void {
    this.focusInput();
    this.todoList = this.todoListService.getTodos();
  }

  addTodo(): void {
    if(this.title.trim()){
      if (this.isEditing) {
        const editIndex = this.todoList.findIndex(todo => todo.id === this.isEditing);
        if (editIndex !== -1) {
          this.todoList[editIndex].title = this.title.trim();
          this.todoList[editIndex].description = this.description.trim();
        }
        this.resetForm();
      } else {
        const maxId = this.todoList.length > 0 ? Math.max(...this.todoList.map(todo => todo.id)) : 0;
        this.todoList.push({ id: maxId + 1, title: this.title.trim(), description: this.description.trim(), isCompleted: false });
        this.resetForm();
      }
      this.todoListService.saveToLocal(this.todoList);
    }
  }

  removeTodo(id: number): void {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    this.todoListService.saveToLocal(this.todoList);
  }
  completeTodo(id: number): void {
    const editIndex = this.todoList.findIndex(todo => todo.id === id);
    if (editIndex !== -1) {
      this.todoList[editIndex].isCompleted = true;
    }
    this.todoListService.saveToLocal(this.todoList);
  }

  editTodo(id: number): void {
    const todo = this.todoList.find(todo => todo.id === id);
    if (todo) {
      this.isEditing = id;
      this.title = todo.title;
      this.description = todo.description;
      this.buttonValue = 'Update';
      this.focusInput();
    }
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
    this.isEditing = 0;
    this.buttonValue = 'Add';
    this.focusInput();
  }

  private focusInput(): void {
    const inputElement = document.querySelector('.todo-input') as HTMLElement;
    inputElement?.focus();
  }

  getHtml(description: string): string {
    return description.replace(/\n/g, '<br>');
  }
}
