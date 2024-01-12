const inputUser = document.querySelector("#newTaskInput");
const list = document.querySelector("#ToDo");
const icon = document.getElementById("icon");
const alert = document.querySelector("#alert");
const text = document.querySelector(".text");
const popup = document.querySelector(".horray_popup");
const forms = document.querySelector("#newTaskForm");
const ok = document.querySelector(".okButton");
const todos = JSON.parse(localStorage.getItem("todos")) || [];

forms.addEventListener("submit", function (e) {
  e.preventDefault();
  addingTask();
  localStorage.setItem("todos", JSON.stringify(todos));
});

//background color switch
icon.addEventListener("click", function () {
  const body = document.querySelector("body");
  if (body.style.background == "white") {
    body.style.background = "black";
  } else if ((body.style.background = "black")) {
    body.style.background = "white";
  }
});

function addingTask() {
  const todo = inputUser.value;
  //pop up for fill todo
  if (!todo) {
    alert.removeAttribute("hidden");
    return;
  }
  if (todo) {
    alert.setAttribute("hidden", "hidden");
  }

  //creates element of list
  const todo_el = document.createElement("div");
  todo_el.classList.add("ToDo-lists");
  //contents added
  const todo_content_el = document.createElement("div");
  todo_content_el.classList.add("content");

  todo_el.appendChild(todo_content_el);
  //content type added
  const todo_input_el = document.createElement("input");
  todo_input_el.classList.add("text");
  todo_input_el.type = "text";
  todo_input_el.value = todo;
  todo_input_el.setAttribute("readonly", "readonly");

  todo_content_el.appendChild(todo_input_el);
  //action buttons being added complete delete edit
  const todo_action_el = document.createElement("div");
  todo_action_el.classList.add("actions");
  const todo_delete_el = document.createElement("button");
  todo_delete_el.classList.add("delete");
  todo_delete_el.innerHTML = "Delete";
  todo_action_el.appendChild(todo_delete_el);

  const todo_edit_el = document.createElement("button");
  todo_edit_el.classList.add("edit");
  todo_edit_el.innerHTML = "Edit";
  todo_action_el.appendChild(todo_edit_el);
  const todo_completed_el = document.createElement("button");
  todo_completed_el.classList.add("completed");
  todo_completed_el.innerHTML = "Completed";

  todo_action_el.appendChild(todo_completed_el);
  todo_el.appendChild(todo_action_el);

  list.appendChild(todo_el);

  inputUser.value = "";
  //completed line action
  todo_completed_el.addEventListener("click", () => {
    todo_input_el.style.textDecoration = "line-through";
    popup.removeAttribute("hidden");
  });

  ok.addEventListener("click", () => {
    popup.setAttribute("hidden", "hidden");
  });

  //edit line action
  todo_edit_el.addEventListener("click", () => {
    if (todo_edit_el.innerText.toLowerCase() == "edit") {
      todo_input_el.removeAttribute("readonly");
      todo_edit_el.innerText = "Save";
      todo_input_el.style.textDecoration = "none";
      todo_input_el.focus();
      localStorage.setItem("todos", JSON.stringify(todo));
    } else {
      todo_edit_el.innerText = "Edit";
      todo_input_el.setAttribute("readonly", "readonly");
    }
  });
  //deleted line action
  todo_delete_el.addEventListener("click", () => {
    list.removeChild(todo_el);
    localStorage.setItem("todos", JSON.stringify(todo));
  });
  todos.push(todo);
}
