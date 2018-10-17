import React from 'react';
import TaskForm from './TaskForm';

export default class Column extends React.Component{
  processTask(val, id){
    let category = this.props.category
    let taskObj = {
      val, id, category
    }
    this.props.addToBoard(taskObj);
  }

  moveRight(taskObj){
    this.props.moveToRight(taskObj);
  }

  moveLeft(taskObj){
    this.props.moveToLeft(taskObj);
  }

  render () {

    let filteredTaskList = this.props.tasks.filter(task => task.category === this.props.category) || [];
      
    let taskList = filteredTaskList.map((task, i) => {
      const {val, category} = task;
      const {categories} = this.props;
      const firstCategory = categories[0];
      const lastCategory = categories[categories.length-1];
      switch (category) {
        case firstCategory:
        return <li 
                key={i}>
                  {val} 
                <button onClick={()=>this.moveRight(task)}>{'>>'}</button>
              </li>
        case lastCategory:
        return <li 
                key={i}>
                <button onClick={()=>this.moveLeft(task)}>{'<<'}</button>
                  {val} 
              </li>
        default:
        return <li 
                key={i}>
                <button onClick={()=>this.moveLeft(task)}>{'<<'}</button>
                  {val} 
                <button onClick={()=>this.moveRight(task)}>{'>>'}</button>
              </li>
      }
    })
      
  
    
    return (
      <div className='col-2'>
        <div className='category'>{this.props.category}</div>
        <ul>
          {taskList}
        </ul>
        <TaskForm sendTask={ (task, id) => this.processTask(task, id )}/>
      </div>
  );
  }
}
