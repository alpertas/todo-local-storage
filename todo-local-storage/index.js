// Definitions
const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const taskList = document.querySelector("#task-list");
let items;

form.addEventListener("submit", addNewItem);
taskList.addEventListener("click", deleteItem);

// Add Task
function addNewItem() {
  if (input.value === "") {
    alert("Please enter a task.");
  } else {
    createItem(input.value);
    setItemToLocalStorage(input.value);
    input.value = "";
  }
}

// Delete Task
function deleteItem(e) {
  if (e.target.className === "bi bi-x-circle") {
    if (confirm("Are you sure you want to delete?")) {
      e.target.parentElement.parentElement.remove();
      deleteItemFromLocalStorage(
        e.target.parentElement.parentElement.textContent
      );
    }
  }
  e.preventDefault();
}

/* Local Storage */

/* 
Resource that I have used: 

https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage#example 

https://www.w3schools.com/jsreF/prop_win_localstorage.asp
*/

// Get Items

items = getItemsFromLocalStorage();
items.forEach(function (item) {
  createItem(item);
});

// Call Items
function getItemsFromLocalStorage() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

// Create a new item (task)
function createItem(text) {
  // creates a li tag for new items.
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));

  // anchor tag for deleting icon
  const a = document.createElement("a");
  a.classList = "delete-item float-end";
  a.setAttribute("href", "#");
  // bi bi-x-circle -> bootstrap -> https://icons.getbootstrap.com/icons/x-circle/
  a.innerHTML = '<i class="bi bi-x-circle"></i>';

  // Adds the "a" tag after the "li" tag. a: delete icon li: task
  li.appendChild(a);

  // Add item to list
  taskList.appendChild(li);
}

// Add Task (Local Storage)
function setItemToLocalStorage(text) {
  items = getItemsFromLocalStorage();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

// Delete Task ((Local Storage))
function deleteItemFromLocalStorage(text) {
  items = getItemsFromLocalStorage();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

// Print the tasks
// Resource that I have used: https://stackoverflow.com/questions/468881/print-div-id-printarea-div-only
function printTodos(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
}
