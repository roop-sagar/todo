import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoList } from '../todo.interface';
import { TodoService } from '../service/todo.service';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule, TodoListComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todoList: any;
  title: string = '';
  description: string = '';
  isEditing: number = 0;
  buttonValue: string = 'Add';

  constructor(private todoListService: TodoService) {}

  ngOnInit(): void {
    this.focusInput();
    this.todoListService.getTodos().subscribe({
      next: (res: TodoList[]) => (this.todoList = res),
      error: (err) => console.error(err),
    });
  }

  addTodo(): void {
    if (this.title.trim()) {
      if (this.isEditing) {
        const editIndex = this.todoList.findIndex(
          (todo: TodoList) => todo.id === this.isEditing
        );
        if (editIndex !== -1) {
          this.todoList[editIndex].title = this.title.trim();
          this.todoList[editIndex].description = this.description.trim();
        }
        this.todoListService.saveToLocal(this.todoList);
      } else {
        const maxId =
          this.todoList.length > 0
            ? Math.max(...this.todoList.map((todo: TodoList) => todo.id))
            : 0;
        this.todoList.push({
          id: maxId + 1,
          title: this.title.trim(),
          description: this.description.trim(),
          isCompleted: false,
        });
      }
      this.resetForm();
    }
  }

  resetForm(): void {
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

  handleEmitTodoData(event: {todo:TodoList,action:string}): void {
    const {todo, action} = event;
    if (action == 'edit') {
      this.isEditing = todo.id;
      this.title = todo.title;
      this.description = todo.description;
      this.buttonValue = 'Update';
      this.focusInput();
    } else if (action === 'markAsComplete') {
      const editIndex = this.todoList.findIndex(
        (ele: TodoList) => ele.id === todo.id
      );
      if (editIndex !== -1) {
        this.todoList[editIndex].isCompleted = true;
      }
    } else if (action === 'delete') {
      this.todoList = this.todoList.filter((ele:TodoList) => ele.id !== todo.id);
    }
    this.todoListService.saveToLocal(this.todoList);
  }
}
