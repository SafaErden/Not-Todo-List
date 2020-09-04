import { setListItemsStorage, setListStorage } from './storage';

import render from './domContent';
import closeBtn from './closeBtns';
import {
  createProjects, removeItem, clickableLis, projectItmBtns,
} from './getItems';

setListItemsStorage();
setListStorage();

createProjects();

window.onload = render();

closeBtn();

removeItem();

clickableLis();

projectItmBtns();
