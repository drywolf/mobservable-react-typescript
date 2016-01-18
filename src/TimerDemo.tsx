/// <reference path="../typings/tsd.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import {observable} from 'mobservable';
import {observer} from 'mobservable-react';

interface ITimer
{
  secondsPassed: number;
}

export class TimerModel
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
  model: TimerModel;
}

@observer
export class TimerView extends React.Component<ITimerProps, TimerModel>
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
