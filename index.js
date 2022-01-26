const input = document.querySelector("#input");
const todoButton = document.querySelector("#todo-btn");
const todoForm = document.querySelector("#todoForm");
const deleteBtn = document.querySelector("#delete-btn");
const todoPut = todoForm.nextElementSibling;
const outPut = document.querySelector("#outPut");
const ken = document.querySelector("#ken");
const error = document.querySelector(".error");
let isDone = true;
let todos = [];
const url = "https://jsonplaceholder.typicode.com/todos";

const getTodos = async () => {
  try {
    const res = await axios(url, { params: { _limit: 10 } });
    if (res.status === 200) {
      todos = res.data;
      ken.innerHTML += `
      <p class='p'>Get Todos= Status code: ${res.status}</p>
      `;
      showOutput();
    } else {
      ken.innerHTML += `
      <p class='p'>Get Todos= Status code: ${res.status}</p>
      `;
    }
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

getTodos();

const sendPostRequest = async () => {
  const newPost = {
    completed: true,
    title: input.value,

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      newPost
    );

    data = res.data;
    todos.unshift(data);
    ken.innerHTML += `
      <p class='p1'>Post Todos= Status code: ${res.status}</p>
      `;

    outPut.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="todo-container">
      <h3>${data.title}</h3>
      <div class='btn-container'>
      <button id="check-btn" class="check-btn btn ">
      <i class="fas fa-check"></i>
      </button>
      <button id='delete-btn' class='btn delete-btn'>X</button>
      </div>
      </div>
      `
    );
  } catch (err) {
    // Handle Error Here

    console.error(err);
  }
};

const showOutput = () => {
  todos.forEach((todo) => {
    outPut.innerHTML += `
    <div class="todo-container">
    <h3>${todo.title}</h3>
    <div class='btn-container'>
    <button id="check-btn" class="check-btn btn ">
    <i class="fas fa-check"></i>
    </button>
    <button id='delete-btn' class='btn delete-btn'>X</button>
    </div>
    </div>
    `;
  });
};

const checkBtn = (e) => {
  const item = e.target;
  if (item.id === "check-btn") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("checkDone");

    if (item.parentElement.parentElement.classList.contains("checkDone")) {
      isDone = false;
    } else {
      isDone = true;
    }
  }
};
const deletBtn = (e) => {
  const item = e.target;
  if (
    item.id === "delete-btn" &&
    item.parentElement.parentElement.classList.contains("checkDone") &&
    isDone === false
  ) {
    axios.delete("https://jsonplaceholder.typicode.com/todos/1");

    const todo = item.parentElement.parentElement;
    todo.remove();
    isDone = true;
  }
};

todoPut.addEventListener("click", checkBtn);
todoPut.addEventListener("click", deletBtn);
todoButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value !== "") {
    sendPostRequest();
    input.value = "";
    input.focus();
    // console.log(res);
    error.style.display = "none";
  } else {
    error.style.display = "block";
  }
});
