import { v4 as uuidv4 } from 'uuid';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import '/styles.css';

console.log('Hello from Webpack!!!');

const getTodo = ({ id, value, checked }) =>
  `
  <li data-id=${id}>
    <input data-action="check" type="checkbox" ${checked ? 'checked' : ''}/>
    <span>${value}</span>
    <button data-action="delete">x</button>
    <button data-action="view">view</button>
  </li>`;

const modal = basicLightbox.create(`
  <div class="modal">
  <h4>Lorem ipsum</h4>
      <p class="text">
          This is modal text
      </p>
      <button>x</button>
  </div>
`);




const refs = {
  form: document.querySelector('.form'),
  list: document.querySelector('.todo-list'),
  modalButton: modal.element().querySelector('button'),
};

let todos = [
  { id: '1', value: 'lorem ipsum 1', checked: false },
  { id: '2', value: 'lorem ipsum 2', checked: true },
  { id: '3', value: 'lorem ipsum 3', checked: true },
];

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const loadTodos = () => {
  try {
    todos = JSON.parse(localStorage.getItem('todos')) || [];

    // throw new Error('ffjfjfj'); - //создать искуственную ошибку
  } catch (error) {
    console.log('error:', error);
    todos = [];
  }
};

const handleSubmit = event => {
  const input = event.target.elements.text;
  event.preventDefault();
  const { value } = input;

  //   const newTodo = { value: value, checked: true }; ниже диструктуризируем
  const newTodo = { id: uuidv4(), value, checked: false };

  todos.push(newTodo);
  console.log(todos);
  input.value = '';
  saveTodos();
  render();
};

const deleteTodo = id => {
  console.log('delete todo');
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  render();
};

const viewTodo = id => {
  const text = modal.element().querySelector('.text');
  text.textContent = id;
  modal.show();
};

const toggolCheckbox = id => {
  todos = todos.map(item =>
    item.id === id
      ? {
          ...item,
          checked: !item.checked,
        }
      : item,
  );
  console.log('check', id);
  saveTodos();
  render();
};

const handleTodoClick = event => {
  const { action } = event.target.dataset;
  console.log(action);

  const parent = event.target.closest('li');

  const { id } = parent?.dataset || {};
  console.log(id);

  switch (action) {
    case 'delete':
      deleteTodo(id);
      break;

    case 'view':
      viewTodo(id);
      break;

    case 'check':
      toggolCheckbox(id);
      break;
  }
};

const render = () => {
  const itemList = todos.map(todo => getTodo(todo)).join('');
  console.log(itemList);
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', itemList);
};
loadTodos();
render();

refs.form.addEventListener('submit', handleSubmit);
refs.list.addEventListener('click', handleTodoClick);
refs.modalButton.addEventListener('click', modal.close);


// закрытие модалки клавишрой экскейп, доделоать, код не полный. Проверяетс открыта ли модалка
// window.addEventListener('keydown', ()=> {
//   if (modal.visible()){
//     modal.close();
//   }
// });
