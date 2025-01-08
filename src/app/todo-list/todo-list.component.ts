import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoList } from '../todo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
@Input() todo!:TodoList;
@Output() emitTodoData: EventEmitter<{todo:TodoList,action: string}> = new EventEmitter();

constructor(){}

todoAction(action: string): void {
  this.emitTodoData.emit({todo:this.todo,action:action});
}

getHtml(description: string): string {
  return description.replace(/\n/g, '<br>');
}
}
