/// <reference path="../typings/tsd.d.ts" />

// NOTE: original code sample taken from https://mweststrate.github.io/mobservable/getting-started.html#demo
// (translated to TypeScript)

import React = require('react');
import ReactDOM = require('react-dom');
import {observable} from 'mobservable';
import {observer} from 'mobservable-react';

class ITodoItem
{
  text: string;
  completed: boolean;
}

export class TodoStoreModel
{
  constructor()
  {
    this.todos = observable<ITodoItem>([]);
  }
  
  addTodo(task: string): void
  {
    this.todos.push(
      {
        text: task,
        completed: false
      });
  }
  
  report()
  {
    if (this.todos.length === 0)
      return "No todos yet...";
        
    return "First todo: '" + this.todos[0].text
        + "'. Progress: "
        + this.completedTodosCount + "/" + this.todos.length;
  }
  
  get completedTodosCount()
  {
    return this.todos.filter(todo => todo.completed).length;
  }
  
  todos: Array<ITodoItem>;
}

interface ITodoListProps
{
  model: TodoStoreModel;
  item_template?: (item: ITodoItem, key: any) => React.ReactElement<ITodoViewProps>;
}

@observer
export class TodoList extends React.Component<ITodoListProps, TodoStoreModel>
{
    displayName = 'TodoList';
    
  constructor(props: ITodoListProps)
  {
    super(props);
    this.state = props.model;
  }

    render()
    {
        var model = this.props.model;
        var item_template = this.props.item_template;
        
        return (<div>
            { model.report() }
            <ul><hr/>
                { model.todos.map(function(todo, idx) {
                    return item_template ? item_template(todo, idx) : (<TodoView todo={ todo } key={ idx } />)
                }) }
            <hr/></ul>
            <button onClick={ this.onNewTodo.bind(this) }>New Todo</button>
            <br/>
            <small>(double-click a todo to edit)</small>
        </div>);
    }

    onNewTodo()
    {
        this.state.addTodo(prompt('Enter a new todo:','coffee plz'));
    }
}

interface ITodoViewProps
{
  todo: ITodoItem;
  key: any;
}

@observer
export class TodoView extends React.Component<ITodoViewProps, {}>
{
    displayName = 'TodoView';

    constructor(props: ITodoViewProps)
    {
      super(props);
    }

    render()
    {
        var todo = this.props.todo;
        return (<li onDoubleClick={ this.onRename.bind(this) }>
            <input type='checkbox' checked={ todo.completed }
                onChange={ this.onToggleCompleted.bind(this) } />
            <code>{todo.text}</code>
        </li>);
    }

    onToggleCompleted()
    {
        var todo = this.props.todo;
        todo.completed = !todo.completed;
    }

    onRename()
    {
        var todo = this.props.todo;
        todo.text = prompt('Task name', todo.text) || "";
    }
}
