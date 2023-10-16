let template = '';

const createNewTodoNode = () => {

    if(!template) {
        template = document.getElementById('todo-item');
    }

    return template
        .content
        .firstElementChild
        .cloneNode(true);
}


const getTodoElement = (todo) => {
    const { text, completed } = todo;
  
    return <template>
<li>
              <div class="view">
                  <input 
                      class="toggle"
                      type="checkbox"
                  />
                  <label></label>
                  <button class="destroy"></button>
              </div>
              <input class="edit" value="${text}" />
          </li>
        </template>
    
    `
          <li ${completed ? 'class="completed"' : ""}>
              <div class="view">
                  <input 
                      ${completed ? "checked" : ""}
                      class="toggle"
                      type="checkbox"
                  />
                  <label>${text}</label>
                  <button class="destroy"></button>
              </div>
              <input class="edit" value="${text}" />
          </li>
      `;
  };
  
  export default (targetElement, { todos }) => {
    const newTodoList = targetElement.cloneNode(true);
    const todosElements = todos.map(getTodoElement).join("");
    newTodoList.innerHTML = todosElements;
    return newTodoList;
  };
  