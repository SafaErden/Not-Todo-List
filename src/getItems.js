import {
  getLocalStorage,
  setLocalStorage,
  listItemsStorage,
  updateLocalStorage,
  listStorage,
  listLength,
} from './storage';

function Project(title) {
  this.title = title;
  let idx;
  if (listLength(listStorage) === 0) {
    idx = 0;
  } else {
    idx = JSON.parse(localStorage.getItem(listStorage))[listLength(listStorage) - 1].id + 1;
  }
  this.id = idx;
}
/* eslint-disable */
function Item(parentId, title, description, date, priority) {
  this.parentId = parentId;
  this.title = title;
  this.date = date;
  this.description = description;
  this.priority = priority;
  this.status = false;
  let idx;
  if (listLength(listItemsStorage) === 0) {
    idx = 0;
  } else {
    idx = JSON.parse(localStorage.getItem(listItemsStorage))[listLength(listItemsStorage) - 1].id + 1;
  }
  this.id = idx;
}

let currentProject = -1;

const projectInput = document.getElementById('project');
const createProject = document.getElementById('create-project');

function createProjects() {
  createProject.addEventListener('click', () => {
    if (projectInput.value) {
      const newProject = new Project(projectInput.value);
      setLocalStorage(getLocalStorage(listStorage), listStorage, newProject);
      projectInput.value = '';
      window.location.reload();
    }
  });
}

function getItems(id) {
  const items = getLocalStorage(listItemsStorage);
  const result = items.filter((item) => item.parentId == id);
  renderItems(result);
}

function removeItem() {
  const deleteItem = document.querySelectorAll('.fa-trash');
  deleteItem.forEach((item) => {
    item.addEventListener('click', () => {
      const storedListItemUpdate = [...getLocalStorage(listItemsStorage)];
      storedListItemUpdate.splice(item.parentNode.dataset.id, 1);

      updateLocalStorage(storedListItemUpdate, listItemsStorage);
      getItems(currentProject);
    });
  });
}

function clickableLis() {
  const clickableLi = document.querySelectorAll('.list-group-item');
  clickableLi.forEach((item) => {
    item.addEventListener('click', () => {
      getItems(item.id);
      showForm(item);
      Array.from(clickableLi).filter((li) => {
        if (li.id !== currentProject) {
          li.style.backgroundColor = '#fff';
        } else {
          li.style.backgroundColor = '#ccc';
        }
      });
    });
  });
}

function showForm(item) {
  const itemForm = document.getElementById('form');
  itemForm.classList.add('d-flex');
  currentProject = item.id;
}

function renderItems(result) {
  const items = document.getElementById('items');
  items.innerHTML = '';
  result.forEach((item) => {
    let tickColor;
    let itemBorder;
    item.status ? (tickColor = 'text-success') : (tickColor = 'text-dark');
    item.priority == 'high'
      ? (itemBorder = 'border-danger')
      : item.priority == 'medium' ? (itemBorder = 'border-warning') : (itemBorder = 'border-success');
    const itemsDiv = document.createElement('div');
    itemsDiv.classList.add('border', itemBorder, 'w-100', 'p-1', 'my-3', 'rounded', 'bg-light', 'toggleItems');

    const itemHeader = document.createElement('div');
    itemHeader.classList.add('w-100', 'd-flex', 'justify-content-between', 'p-2', 'my-1', 'position-relative');
    itemsDiv.appendChild(itemHeader);

    const itemTitle = document.createElement('div');
    itemTitle.classList.add('togglerTitle');
    itemTitle.innerText = item.title;
    itemHeader.appendChild(itemTitle);

    const itemIcons = document.createElement('div');
    itemIcons.classList.add('d-flex', 'item-icons');
    itemIcons.dataset.id = item.id;
    itemHeader.appendChild(itemIcons);

    const itemEdit = document.createElement('i');
    itemEdit.classList.add('fa', 'fa-pencil', 'm-1');

    const itemStatus = document.createElement('i');
    itemStatus.classList.add('fa', 'fa-check-circle', 'm-1', tickColor);

    const itemDelete = document.createElement('i');
    itemDelete.classList.add('fa', 'fa-trash', 'm-1', 'text-danger');

    itemIcons.appendChild(itemEdit);
    itemIcons.appendChild(itemStatus);
    itemIcons.appendChild(itemDelete);

    const itemDetail = document.createElement('div');
    itemDetail.classList.add('d-none', 'flex-column', 'align-items-start', 'border');

    const itemDate = document.createElement('div');
    itemDate.innerText = `Date: ${item.date}`;

    const itemDescription = document.createElement('div');
    itemDescription.innerText = `Description: ${item.description}`;

    const itemPriority = document.createElement('div');
    itemPriority.innerText = `Priority: ${item.priority}`;

    itemDetail.appendChild(itemDescription);
    itemDetail.appendChild(itemDate);
    itemDetail.appendChild(itemPriority);
    itemsDiv.appendChild(itemDetail);

    items.appendChild(itemsDiv);
  });
  itemToggleListener();
  itemStatusListener();
  editItems();
  removeItem();
}

function projectItmBtns() {
  const projecItmBtn = document.getElementById('projectItem');
  projecItmBtn.addEventListener('click', () => {
    const itemFrom = document.getElementById('itemForm');
    const { children } = itemFrom;
    const inputs = Array.from(children);
    const newItem = new Item(currentProject, inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);
    setLocalStorage(getLocalStorage(listItemsStorage), listItemsStorage, newItem);
    getItems(currentProject);
    itemFrom.children[0].value = '';
    itemFrom.children[1].value = '';
    itemFrom.children[2].value = '';
    itemFrom.children[3].value = '';
  });
}

function itemToggleListener() {
  const toggleItems = document.querySelectorAll('.togglerTitle');
  toggleItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (item.parentNode.parentNode.childNodes[1].classList.contains('d-none')) {
        item.parentNode.parentNode.childNodes[1].classList.remove('d-none');
        item.parentNode.parentNode.childNodes[1].classList.add('d-flex');
      } else {
        item.parentNode.parentNode.childNodes[1].classList.add('d-none');
        item.parentNode.parentNode.childNodes[1].classList.remove('d-flex');
      }
    });
  });
}

function itemStatusListener() {
  const itemStatus = document.querySelectorAll('.fa-check-circle');
  itemStatus.forEach((item) => {
    item.addEventListener('click', () => {
      updateItemStatus(item.parentNode.dataset.id, item);
    });
  });
}

function updateItemStatus(itemId, itm) {
  const listItems = getLocalStorage(listItemsStorage);

  listItems.forEach((item) => {
    if (item.id == itemId) {
      item.status == false
        ? ((item.status = true), itm.classList.add('text-success'), itm.classList.remove('text-dark'))
        : ((item.status = false), itm.classList.add('text-dark'), itm.classList.remove('text-success'));
    }
  });
  updateLocalStorage(listItems, listItemsStorage);
}

function editItems() {
  const editBtns = document.querySelectorAll('.fa-pencil');
  editBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const itemForm = document.getElementById('itemForm');
      itemForm.children[0].style.cssText = 'border-bottom-color:red !important';
      itemForm.children[1].style.cssText = 'border-bottom-color:red !important';
      itemForm.children[2].style.cssText = 'border-bottom-color:red !important';

      const items = getLocalStorage(listItemsStorage);
      const item = items[btn.parentNode.dataset.id];
      const itemFrom = document.getElementById('itemForm');
      const fields = Array.from(itemFrom.children);
      fields[0].value = item.title;
      fields[1].value = item.description;
      fields[2].value = item.date;
      fields[3].value = item.priority;

      document.getElementById('projectItem').classList.add('d-none');
      const updateBtn = document.getElementById('projectItem2');
      updateBtn.classList.remove('d-none');
      updateBtn.classList.add('text-danger');
      updateBtn.addEventListener('click', () => {
        item.title = fields[0].value;
        item.description = fields[1].value;
        item.date = fields[2].value;
        item.priority = fields[3].value;
        updateLocalStorage(items, listItemsStorage);
        document.getElementById('projectItem').classList.remove('d-none');
        updateBtn.classList.add('d-none');

        itemForm.children[0].style.cssText = 'border-bottom-color:black !important';
        itemForm.children[1].style.cssText = 'border-bottom-color:black !important';
        itemForm.children[2].style.cssText = 'border-bottom-color:black !important';
        getItems(currentProject);
      });
    });
  });
}

export {
  createProjects, removeItem, clickableLis, getItems, projectItmBtns,
};
/* eslint-enable */