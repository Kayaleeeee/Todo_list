const year = document.getElementById("year");
const month = document.getElementById("month");
const date = document.getElementById("date");
const day = document.getElementById("day");
const inputTodo = document.getElementById("inputTodo");
const list = document.getElementById("list");
const clear = document.querySelector(".clear");
const today = new Date();

year.innerHTML = today.getFullYear();
month.innerHTML = today.toLocaleDateString("en-US", { month: "long" });
day.innerHTML = today.toLocaleDateString("en-US", { day: "numeric" });

let List = [];
let id = 0;

const CHECK = "fa-check-circle-o";
const UNCHECK = "fa-circle-o";
const LINE_THROUGH = "lineThrough";

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
  //   console.log(location);
});

let data = localStorage.getItem("TODO");

if (data) {
  List = JSON.parse(data);
  id = List.length;
  loadList(List);
} else {
  List = [];
  id = 0;
}

function loadList(array) {
  array.forEach(function (item) {
    addTodo(item.name, item.id, item.done, item.trash);
  });
}

function addTodo(todo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<div class='item'>
  <i class='fa ${DONE}' job='complete' id=${id}></i>
  <span class='text' ${LINE}>${todo}</span>
  <i class = 'fa fa-trash-o' job='delete' id=${id}</i>
  </div>`;

  const position = "afterbegin";
  list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function () {
  if (event.keyCode === 13) {
    const todo = input.value;

    if (todo) {
      addTodo(todo, id, false, false);
      List.push({
        name: todo,
        id: id,
        done: false,
        trash: false,
      });

      localStorage.setItem("TODO", JSON.stringify(List));
      id++;
    }
    input.value = "";
  }
});

function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);

  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  List[element.id].done = List[element.id].done ? false : true;
  /////스토리지 저장시 boolean값 변경
}

function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  List[element.id].trash = true;
}

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;
  //item의 job.value = delete/complete

  if (elementJob == "complete") {
    completeTodo(element);
  } else {
    removeTodo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(List));
});
