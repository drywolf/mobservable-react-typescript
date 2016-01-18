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

class Demo extends React.Component<IDemoProps, any> {
  constructor(props: IDemoProps) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>Hello {this.props.name}!</div>
        <hr/>
        <TimerView model={new TimerModel()}/>
        <hr/>
        <TodoList model={new TodoStoreModel()}/>
      </div>
    );
  }
}


function render() {
  ReactDOM.render(
    <Demo name="World" />,
    document.getElementById('app')
  );
}

render();
