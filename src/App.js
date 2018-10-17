import React, { Component } from 'react';
import './App.css';
import './grid.css';
import Column from './components/Column';

class App extends Component {
	constructor(){
		super();
		this.state={
			taskBoard:[]
		};
		this.categories = ['This Week', 'Today', 'In Progress', 'Waiting To Discuss', 'Waiting For Feedback', 'Done'];
	}
  
	componentDidMount(){
		this.handleLocalStorage();
	}
  
	handleLocalStorage(){
		if(!this.state.taskBoard.length){
			let existingTasks = JSON.parse( localStorage.getItem('taskBoard') );
			this.setState({
				taskBoard: existingTasks || []
			});

		}
	}

	addToBoard(taskObj){
		this.setState({
			taskBoard: [...this.state.taskBoard, taskObj]
		}, () => localStorage.setItem('taskBoard', JSON.stringify(this.state.taskBoard)));
	}

	handleMoveToRight(taskObj){
		const {id, category} = taskObj;
		const nextCategoryIndex = this.categories.findIndex(cat=>cat === category)+1;
		const nextCategory = this.categories[nextCategoryIndex];
		const updatedTaskList = this.state.taskBoard.map(task => {
			if (task.id === id){
				task.category = nextCategory;
			}
			return task;
		});
		this.setState({
			taskBoard: updatedTaskList 
		}, () => localStorage.setItem('taskBoard', JSON.stringify(this.state.taskBoard)));
	}

	handleMoveToLeft(taskObj){
		const {id, category} = taskObj;
		const previousCategoryIndex = this.categories.findIndex(cat=>cat === category)-1;
		const previousCategory = this.categories[previousCategoryIndex];
		const updatedTaskList = this.state.taskBoard.map(task => {
			if (task.id === id){
				task.category = previousCategory;
			}
			return task;
		});
		this.setState({
			taskBoard: updatedTaskList 
		}, () => localStorage.setItem('taskBoard', JSON.stringify(this.state.taskBoard)));
	}

	render() {
		let columns = this.categories.map((category, i) => {
			return (<Column 
				key={i}
				category={category}
				categories = {this.categories}
				tasks={this.state.taskBoard } 
				addToBoard={task => this.addToBoard(task)}
				moveToRight={task => this.handleMoveToRight(task)}
				moveToLeft={task => this.handleMoveToLeft(task)}
			/>);
		});
		return (
			<div className="App">
				<div className='container'>
					<div className='row'>
						<div className='col-12'>
							<header className="App-header">
								<h1>Task Board</h1>
							</header>
						</div>
					</div>
					<div className='row'>
						{ columns }
					</div>
				</div>
			</div>
		);
	}
}

export default App;
