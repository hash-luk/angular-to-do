import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public form: FormGroup;
  public todos: Todo [] = []; //to do

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      title: ['',Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      done: [false, Validators.required]
    })
  }

  // loadPreview() {
  //   this.todos.push({title:'Passear com o cachorro', done: false});
  //   this.todos.push({title:'Ir a padaria', done: true});
  // }

  verifyString() {
    let title = this.form.controls['title'].value;

    if(title == undefined || title == '') {
      alert('Digite algo')
    }else{
      this.addToDo()
    }
  }

  addToDo() {
    let title = this.form.controls['title'].value;

    this.todos.push(new Todo(title,false))
    this.form.reset();
  }

  removeToDo(todo : Todo) {
    const index = this.todos.indexOf(todo)
    this.todos.splice(index,1);
  }

  markAsDone(todo : Todo) {
    todo.done=true;
  }

  makeTitleEditable(todo : Todo) {
    var title = document.querySelector('.title');
    var checktitle = title?.getAttribute('contenteditable');
    var editbutton = document.querySelector('.editButton') as HTMLInputElement;

    checktitle == 'false' ? (title?.setAttribute('contenteditable','true'),editbutton.innerHTML="Salvar") : (title?.setAttribute('contenteditable','false'),editbutton.innerHTML="Editar");
    // alert('Clickei')
  }


}
