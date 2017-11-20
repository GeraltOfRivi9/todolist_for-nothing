import React from 'react';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false

        };
    }

    renderTaskSection() {
        const { task, isCompleted, description, important } = this.props;      

        const taskStyle = {
            color: isCompleted ? 'red' : 'green',
            cursor: 'pointer',
            textTransform: important ? 'uppercase' : 'lowercase'
        };
        

        if (this.state.isEditing) {
            return (
                <td>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input type="text" defaultValue={task} ref="editInput" />
                        <input type="text" defaultValue={description} ref="editDes" />
                    </form>
                </td>
            );
        }

        return (
            <td style={ taskStyle}>
               <input id="checkBox" type="checkbox" onClick={this.props.toggleTask.bind(this, task)}/>
               <button 
                onClick={this.props.toggleImportant.bind(this, task)}>!</button> {task} <br/> {description} 
            </td>
        );
    }

    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <td>
                    <button onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </td>
            );
        }

        return (
            <td>
                <button onClick={this.onEditClick.bind(this)}>Edit</button>
                <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
            </td>
        );
    }

    render() {
        return (
            <tr>
                {this.renderTaskSection()}
                {this.renderActionsSection()}
            </tr>
        );
    }

    

    onEditClick() {
        this.setState({ isEditing: true });
        console.log()

    }

    onCancelClick() {
        this.setState({ isEditing: false });
    }

    onSaveClick(event) {
        event.preventDefault();

        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        const oldDes = this.props.description;
        const newDes = this.refs.editDes;
        this.props.saveTask(oldTask, newTask);
        this.props.saveDes(oldDes, newDes);
        this.setState({ isEditing: false });
    }
}
