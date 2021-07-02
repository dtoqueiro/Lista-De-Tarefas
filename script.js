const listContainers = document.querySelector("[data-list]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input ]");

let lists = [];

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function createList(name) {
  return { id: Date.now().toString(), name: name };
}

function render() {
  clearElement(listContainers);
  lists.forEach((list) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("todo-item");
    itemDiv.id = list.id;
    const item = document.createElement("li");
    item.classList.add("item");
    item.innerText = list.name;
    itemDiv.append(item);
    //Botão de Completar
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    itemDiv.appendChild(completedButton);
    //Botão de Excluir
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    itemDiv.appendChild(trashButton);

    listContainers.appendChild(itemDiv);
  });
}
newListForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName === null || listName === "") return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  render();
});

listContainers.addEventListener("click", deleteCheck);

function deleteCheck(e) {
  const item = e.target;
  console.log(item);
  //Remove a Tarefa
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Tem que remover da lista também
    let index = lists.findIndex((x) => x.id === todo.id);
    lists.splice(index, 1);
    todo.remove();
  }
}
