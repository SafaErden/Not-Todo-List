import { format } from 'date-fns';

const listStorage = 'list';
const defaultProject0 = { title: 'Smoking cigarettes', id: 0 };
const defaultProject1 = { title: 'Drinking too much alcohol', id: 1 };
const defaultProject2 = { title: 'Coding too long without any break', id: 2 };
const defaultProject3 = { title: 'Coding before reading the documents', id: 3 };
const defaultNotTodo1 = {
  parentId: 0,
  id: 0,
  title: 'Do not buy cigarattes',
  date: format(new Date(2020, 1, 23), 'yyyy-MM-dd'),
  description: 'avoid buyin new pack of cigarattes',
  priority: 'high',
  status: false,
};
const defaultNotTodo2 = {
  parentId: 0,
  id: 1,
  title: 'Try to smoke not more than twice in a day',
  date: format(new Date(2020, 11, 14), 'yyyy-MM-dd'),
  description: 'Try to smoke not more than twice in a day',
  priority: 'medium',
  status: false,
};
const defaultNotTodo3 = {
  parentId: 0,
  id: 2,
  title: 'Avoid smokers',
  date: format(new Date(2020, 5, 2), 'yyyy-MM-dd'),
  description: 'Avoid spending time with people who smoke',
  priority: 'low',
  status: false,
};
/* eslint-disable */
const setListStorage = () => {
	let listLen = 0;
	if (JSON.parse(localStorage.getItem(listStorage))) {
		listLen = JSON.parse(localStorage.getItem(listStorage)).length;
	} else {
		localStorage.setItem(listStorage, JSON.stringify([]));
		setLocalStorage(getLocalStorage(listStorage), listStorage, defaultProject0);
		setLocalStorage(getLocalStorage(listStorage), listStorage, defaultProject1);
		setLocalStorage(getLocalStorage(listStorage), listStorage, defaultProject2);
		setLocalStorage(getLocalStorage(listStorage), listStorage, defaultProject3);
	}
};

const listItemsStorage = 'list-items';
const setListItemsStorage = () => {
	let listItemsLen = 0;
	if (JSON.parse(localStorage.getItem(listItemsStorage))) {
		listItemsLen = JSON.parse(localStorage.getItem(listItemsStorage)).length;
	} else {
		localStorage.setItem(listItemsStorage, JSON.stringify([]));
		setLocalStorage(getLocalStorage(listItemsStorage), listItemsStorage, defaultNotTodo1);
		setLocalStorage(getLocalStorage(listItemsStorage), listItemsStorage, defaultNotTodo2);
		setLocalStorage(getLocalStorage(listItemsStorage), listItemsStorage, defaultNotTodo3);
	}
};
/* eslint-enable */
function getLocalStorage(name) {
  const local = JSON.parse(localStorage.getItem(name));
  return local;
}

function setLocalStorage(array, name, value) {
  array.push(value);
  localStorage.setItem(name, JSON.stringify(array));
}

function updateLocalStorage(array, name) {
  localStorage.setItem(name, JSON.stringify(array));
}

const listLength = (name) => {
  let listLen = 0;
  if (JSON.parse(localStorage.getItem(name))) {
    listLen = JSON.parse(localStorage.getItem(name)).length;
  }
  return listLen;
};

export {
  setListItemsStorage,
  setListStorage,
  setLocalStorage,
  getLocalStorage,
  listStorage,
  listItemsStorage,
  updateLocalStorage,
  listLength,
};
