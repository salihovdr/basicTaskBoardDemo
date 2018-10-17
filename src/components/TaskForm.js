import React from 'react';
import uuidv4 from 'uuid/v4';

export default class TaskForm extends React.Component{
	constructor(){
		super();
		this.state={
			task: '',
			creating: false
		};
	}

	handleSubmit(e){
		e.preventDefault();
		e.target.reset();
		this.setState({
			creating: false
		});
		let id = uuidv4();
		let task = this.state.task;
		this.props.sendTask(task, id);
	}

	handleChange(e){
		this.setState({
			task: e.target.value,
		});
	}

	toggleAddBtn(){
		this.setState({
			creating: true
		});
	}

	render(){

		let form;
		let addBtn;

		if (!this.state.creating){
			addBtn = (<button onClick={()=>this.toggleAddBtn()}>New</button>);
			form = '';
		} else {
			addBtn='';
			form = (<form onSubmit={(e)=> this.handleSubmit(e)}>
				<input 
					type='text'
					value={this.state.value}
					onChange={(e)=>this.handleChange(e)}
				/>
				<input type='submit'/>
			</form>);
		}
    
		return (
			<React.Fragment>
				{ form }
				{ addBtn }
			</React.Fragment>
		);
	}
}