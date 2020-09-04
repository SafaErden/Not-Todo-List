import {
  getLocalStorage, listItemsStorage, updateLocalStorage, listStorage,
} from './storage';

function closeBtn() {
  const closeBtns = document.querySelectorAll('.fa-times-circle');

  function listenClose(item, index) {
    item.addEventListener('click', () => {
      const storedItems = [...getLocalStorage(listStorage)];
      storedItems.splice(index, 1);

      const storedListItems = [...getLocalStorage(listItemsStorage)];

      const storedListItemUpdate = storedListItems.filter(
        (itm) => itm.parentId !== item.parentNode.id,
			); /* eslint-disable-line */

      updateLocalStorage(storedItems, listStorage);
      updateLocalStorage(storedListItemUpdate, listItemsStorage);
      window.location.reload();
    });
  }

  closeBtns.forEach((item, index) => {
    listenClose(item, index);
  });
}

export default closeBtn;
