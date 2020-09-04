import { getLocalStorage, listStorage } from './storage';

const ul = document.querySelector('.list-group');

function sideScroll(element, direction, speed, distance, step) {
  let scrollAmount = 0;
  const slideTimer = setInterval(() => {
    if (direction === 'left') {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}

const rightBtn = document.getElementById('slide-right');
const leftBtn = document.getElementById('slide-left');

rightBtn.onclick = () => {
  const scrolled = ul.scrollWidth - ul.scrollLeft === ul.clientWidth;
  sideScroll(ul, 'right', 25, 100, 10);
  if (scrolled) {
    rightBtn.style.color = 'grey';
  } else {
    rightBtn.style.color = 'black';
    leftBtn.style.color = 'black';
  }
};

leftBtn.onclick = () => {
  sideScroll(ul, 'left', 25, 100, 10);
  if (ul.scrollLeft === 0) {
    leftBtn.style.color = 'grey';
  } else {
    leftBtn.style.color = 'black';
    rightBtn.style.color = 'black';
  }
};

function render() {
  ul.innerHTML = '';
  const local = getLocalStorage(listStorage);

  local.forEach((item, idx, array) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'm-1', 'pr-4', 'border', 'rounded', 'wrap');
    li.innerText = array[idx].title;
    li.id = array[idx].id;

    const icon = document.createElement('i');
    icon.classList.add('fa', 'fa-times-circle', 'ml-2', 'text-danger');

    li.appendChild(icon);
    ul.appendChild(li);
    if (ul.scrollWidth === ul.clientWidth) {
      rightBtn.style.color = 'grey';
      leftBtn.style.color = 'grey';
    } else {
      rightBtn.style.color = 'black';
    }
  });
}

export default render;
