import { observable, action, computed } from "mobx";
import TodoModel from "./TodoModel";

class TodoStore {
	@observable todos = [];
	@observable filter = "all";
	lastID = 0;

	@action
	addTodo(title) {
		this.todos.push(new TodoModel(this, title, false, this.lastID++));
	}

	@action
	removeTodo(id) {
		this.todos = this.todos.filter((todo) => todo.id !== id);
	}

	@action
	setFilter(filter) {
		this.filter = filter;
	}

	@computed
	get filteredTodos() {
		const { filter, todos } = this;
		switch (filter) {
			case "active":
				return todos.filter((todo) => !todo.completed);
			case "completed":
				return todos.filter((todo) => todo.completed);
			case "all":
			default:
				return todos;
		}
	}

	@action
	clearCompleted() {
		this.todos = this.todos.filter((todo) => !todo.completed);
	}
}

const store = new TodoStore();
export default store;
