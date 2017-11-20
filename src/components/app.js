import React from 'react';
import _ from 'lodash';
import CreateTodo from './create-todo';
import TodosList from './todos-list';

const todos = [
{
    task: 'make React tutorial',
    isCompleted: false,
    description: 'sad',
    important: true
},
{
    task: 'eat dinner',
    isCompleted: false,
    description: 'lol',
    important: false
}
];

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos,
            date: new Date()
        };
    }

    render() {
        return (
            <div>
                <h2>{this.state.date.toLocaleTimeString()}.</h2>
                <p>{this.formatDate(new Date())} </p>
                
                <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
                <TodosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    toggleImportant={this.toggleImportant.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    saveDes={this.saveDes.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
            </div>
        );
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos });
    }
    toggleImportant(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.important = !foundTodo.important;
        this.setState({ todos: this.state.todos });
    }

    createTask(task) {
        this.state.todos.push({
            task,
            isCompleted: false,
            description: '',
            important: false
        });
        this.setState({ todos: this.state.todos });
    }

    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.setState({ todos: this.state.todos });
    }

    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos });
    }

    saveDes(oldDes, newDes) {
        const foundTodo = _.find(this.state.todos, todo => todo.description === oldDes);
        foundTodo.description = newDes;
        this.setState({ todos: this.state.todos });
    }
    componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

   formatDate(date) {
  var monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
}
