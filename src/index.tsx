/// <reference path="../typings/tsd.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import {observable} from 'mobservable';
import {observer} from 'mobservable-react';

import "mobservable-react-devtools";

import { TimerView, TimerModel } from './TimerDemo';
import { TodoList, TodoStoreModel } from './TodoDemo';

interface IDemoProps
{
  name: string;
}

class Demo extends React.Component<IDemoProps, any>
{
  constructor(props: IDemoProps)
  {
    super(props);
  }
  
  timer_model = new TimerModel();
  todo_model = new TodoStoreModel();
  
  render()
  {    
    var todo_template = (item, key) => 
      <div key={key}>Index: {key} Data: {item.text}</div>;
    
    return (
      <div>
        <div>Hello {this.props.name}!</div>
        <hr/>
        <TimerView model={this.timer_model}/>
        <hr/>
        <TodoList model={this.todo_model} item_template={todo_template}/>
      </div>
    );
  }
}


function render()
{
  ReactDOM.render(
    <Demo name="World" />,
    document.getElementById('app')
  );
}

render();
