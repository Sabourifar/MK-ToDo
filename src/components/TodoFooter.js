import React, { Component } from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import TodoStore from "../stores/TodoStore";

@observer
class TodoFooter extends Component {
	@action.bound
	filterTodos(filter) {
		TodoStore.setFilter(filter);
	}

	@action.bound
	clearCompleted() {
		TodoStore.clearCompleted();
	}

	render() {
		const activeTodos = TodoStore.todos.filter((todo) => !todo.completed);
		const completedTodos = TodoStore.todos.filter((todo) => todo.completed);

		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{activeTodos.length}</strong> items left
				</span>
				<ul className="filters">
					<li>
						<a
							href="#/"
							className={TodoStore.filter === "all" ? "selected" : ""}
							onClick={() => this.filterTodos("all")}
						>
							All
						</a>
					</li>
					<li>
						<a
							href="#/active"
							className={TodoStore.filter === "active" ? "selected" : ""}
							onClick={() => this.filterTodos("active")}
						>
							Active
						</a>
					</li>
					<li>
						<a
							href="#/completed"
							className={TodoStore.filter === "completed" ? "selected" : ""}
							onClick={() => this.filterTodos("completed")}
						>
							Completed
						</a>
					</li>
				</ul>
				{completedTodos.length > 0 && (
					<button className="clear-completed" onClick={this.clearCompleted}>
						Clear completed
					</button>
				)}
			</footer>
		);
	}
}

export default TodoFooter;
