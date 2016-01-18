/// <reference path="../typings/tsd.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import {observable} from 'mobservable';
import {observer} from 'mobservable-react';

import "mobservable-react-devtools";

class DemoProps {
  public name: string;
}

class Demo extends React.Component<DemoProps, any> {
  constructor(props: DemoProps) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>Hello {this.props.name}!</div>
        <Timer model={new TimerState()}/>
      </div>
    );
  }
}

interface ITimer
{
  secondsPassed: number;
}

class TimerState
{
  constructor()
  {
    this.timer = observable<ITimer>(
    {
      secondsPassed: 0
    });
    
    setInterval(() => this.timer.secondsPassed++, 1000);
  }
  
  timer: ITimer;
}

interface ITimerProps
{
  model: any;
}

@observer
class Timer extends React.Component<ITimerProps, TimerState>
{
  constructor(props: ITimerProps)
  {
    super(props);
    this.state = props.model;
  }
  
  render() {
    return (
      <span>Seconds passed: {this.state.timer.secondsPassed}</span>
    )
  }
}

function render() {
  ReactDOM.render(
    <Demo name="World" />,
    document.getElementById('app')
  );
}

render();
