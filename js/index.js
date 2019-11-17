console.log('\nDeveloped by Ali Tursucular\n\nLinkedIn: https://www.linkedin.com/in/alitursucular/\nPersonal Portfolio: https://alitursucular.github.io');

import { orders } from './orders.js';

const speechBubbleClose = document.querySelectorAll('.speech-bubble-close');
const speechBubbleRight = document.querySelector('.speech-bubble-right');
const tbody = document.querySelector('tbody');
const thead = document.querySelector('thead');
const th = document.querySelectorAll('thead th');
const err = document.querySelector('.err');

// SPEECH BUBBLES
speechBubbleClose.forEach((i) => {
  i.addEventListener('click', () => {
    i.parentElement.remove();
  });
});

speechBubbleRight.addEventListener('mouseover', () => {
  if (!thead.classList.contains('thead-flash-once')) {
    thead.classList.add('thead-flash-once');
  }
});

speechBubbleRight.addEventListener('mouseout', () => {
  if (thead.classList.contains('thead-flash-once')) {
    thead.classList.remove('thead-flash-once');
  }
});

// TABLE CREATION
orders.forEach((order) => {
  const values = Object.values(order);
  let row = tbody.insertRow(-1);
  row.className = 'order';

  for (const value of values) {
    let cell = row.insertCell();
    switch (value) {
      case 'pending':
        cell.className = 'text-warning order-item';
        break;
      case 'processing':
        cell.className = 'text-info order-item';
        break;
      case 'completed':
        cell.className = 'text-success order-item';
        break;
      default:
        cell.className = 'order-item';
    }
    cell.innerHTML = value;
  }
});

// FILTER
let filterInput = document.querySelector('.filter-input');
const order = document.querySelectorAll('.order');

filterInput.addEventListener('keyup', () => {
  let criteria = filterInput.value.toUpperCase().trim();
  let j = 0;

  order.forEach((data) => {
    thead.style.opacity = '1'
    err.style.display = '';
    speechBubbleRight.style.visibility = '';
    if (data.innerText.toUpperCase().indexOf(criteria) > -1) {
      data.style.display = '';
    } else {
      data.style.display = 'none';
      j++;
      if (j === order.length) {
        thead.style.opacity = '0.2'
        err.style.display = 'flex';
        speechBubbleRight.style.visibility = 'hidden';
      }
    }
  });
});

// SORT
let sortDirection;

th.forEach((col, idx) => {
  col.addEventListener('click', () => {
    sortDirection = !sortDirection;
    /** Remember: 
      * We obtained all tr elements that has 'order' class before!
      * However, querySelectorAll returns a NodeList, not an Array.
      * While forEach method can be used on NodeLists, filter method cannot. 
      * This is why we preferred to make this conversion below; where we actually need an array to filter.
      * Note: NoteList is very similar to array and easy to convert.
    **/
    const rowsArrFromNodeList = Array.from(order);
    const filteredRows = rowsArrFromNodeList.filter(item => item.style.display != 'none');

    filteredRows.sort((a, b) => {
      return a.childNodes[idx].innerHTML.localeCompare(b.childNodes[idx].innerHTML, 'en', { numeric: true, sensitivity: 'base' });
    }).forEach((row) => {
      sortDirection ? tbody.insertBefore(row, tbody.childNodes[tbody.length]) : tbody.insertBefore(row, tbody.childNodes[0]);
    });

  });
});
