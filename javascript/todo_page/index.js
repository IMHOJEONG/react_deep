import getTodos from "./getTodos.js";
import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";
import applyDiff from "./applyDiff.js";

import registry from './registry.js';

registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state = {
  todos: getTodos(),
  currentFilter: "All",
};

const render = () => {
  window.requestAnimationFrame(()=>{
      const main = document.querySelector('.todoapp');
      const newMain = registry.renderRoot(main, state);
      // main.replaceWith(newMain);
      applyDiff(document.body, main, newMain);
  });
}

window.setInterval(()=>{
  state.todos = getTodos();
  render();
}, 5000);

render();

const getTodoElement = (todo) => {
  const { text, completed } = todo;

  return `
        <li ${completed ? 'class="completed"' : ""}>
            <div class="view">
            
            </div>
            <input class="edit" value="${text}">
        </li>
    `;
};

const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);
  const { length } = notCompleted;
  if (length === 1) {
    return "1 Item left";
  }

  return `${length} Items left`;
};

export default (targetElement, state) => {
  const { currentFilter, todos } = state;

  const element = targetElement.cloneNode(true);
  const list = element.querySelector(".todo-list");
  const counter = element.querySelector(".todo-count");
  const filters = element.querySelector(".filters");

  list.innerHTML = todos.map(getTodoElement).join("");

  counter.textContent = getTodoCount(todos);

  Array.from(filters.querySelectorAll("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });

  return element;
};
