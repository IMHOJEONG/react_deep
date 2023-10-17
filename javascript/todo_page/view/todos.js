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


const getTodoElement = (todo, index, events) => {
    const { text, completed } = todo;

    const element = createNewTodoNode();

    element.querySelector('input.edit').value = text;
    element.querySelector('label').textContext = text;

    if(completed) {
        element.classList.add('completed');
        element 
            .querySelector('input.toggle')
            .checked = true;
    }

    const handler = e => events.deleteItem(index);

    element    
        .querySelector('button.destroy')
        .addEventListener('click', handler);

    return element;

  
//     return <template>
// <li>
//               <div class="view">
//                   <input 
//                       class="toggle"
//                       type="checkbox"
//                   />
//                   <label></label>
//                   <button class="destroy"></button>
//               </div>
//               <input class="edit" value="${text}" />
//           </li>
//         </template>
    
//     `
//           <li ${completed ? 'class="completed"' : ""}>
//               <div class="view">
//                   <input 
//                       ${completed ? "checked" : ""}
//                       class="toggle"
//                       type="checkbox"
//                   />
//                   <label>${text}</label>
//                   <button class="destroy"></button>
//               </div>
//               <input class="edit" value="${text}" />
//           </li>
//       `;
};
  
export default (targetElement, { todos }, events) => {

    const newTodoList = targetElement.cloneNode(true);
    
    newTodoList.innerHTML = '';

    todos
        .map((todo, index) => getTodoElement(todo, index, events))
        .forEach(element => {
            newTodoList.appendChild(element);
        })

    return newTodoList;

    // const todosElements = todos.map(getTodoElement).join("");
    // newTodoList.innerHTML = todosElements;
    // return newTodoList;
};
  