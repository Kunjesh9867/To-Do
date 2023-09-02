//GROUP-2

//AARSH PARIMAL PATEL - 200520260, 
//DAXIL ASHISHKUMAR PATEL - 200520270, 
//KUNJESH KANTILAL RAMANI - 200515106

//ASSIGNMENT-3

// Adding DOM
document.addEventListener("DOMContentLoaded", function () {
    // Get references to various elements
    const addButton = document.getElementById("addButton");
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
    const dingSound = document.getElementById("dingSound");
    const deletedingSound = document.getElementById("deletedingSound");
    const deleteAllButton = document.getElementById("deleteAllButton");
  
    // Add event listener for the 'Add' button
    addButton.addEventListener("click", function () {
      // Get and trim the entered task
      const todoText = todoInput.value.trim();
  
      // Display an alert if the input is empty
      if (todoText === "") {
        errordingSound.play();
        alert("Please enter a task before adding.");    
        return;
      }
  
      // Create a new todo item
      createTodoItem(todoText);
      todoInput.value = "";
      updateDeleteAllButtonVisibility();
    });
  
    // Function to create a new todo item
    function createTodoItem(text) {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      adddingSound.play();
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("form-check-input");
      const todoText = document.createElement("span");
      todoText.textContent = text;
      todoText.classList.add("flex-grow-1");
  
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Use Font Awesome trash icon
      deleteButton.classList.add("delete-button", "btn", "btn-danger");
  
      const editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fas fa-pen-to-square"></i>';
      editButton.classList.add("edit-button", "btn", "btn-primary");
  
      // Add event listener for delete button
      deleteButton.addEventListener("click", function () {
        li.style.animation = "fadeOut 0.8s forwards";
        deletedingSound.play();
        li.addEventListener("animationend", function () {
          li.remove();
          updateDeleteAllButtonVisibility();
        });
      });
  
      // Add event listener for edit button
      editButton.addEventListener("click", function () {
        const newText = prompt("Edit the task:", text);
        if (newText !== null && newText.trim() !== "") {
          todoText.textContent = newText;
        }
        editdingSound.play();
      });
  
      // Add event listener for checkbox change
      checkbox.addEventListener("change", function () {
        // Handle checked and unchecked states
        if (checkbox.checked) {
          li.classList.add("checked");
          todoList.appendChild(li);
          dingSound.play();
          editButton.style.display = "none";
        } else {
          li.classList.remove("checked");
          todoList.insertBefore(li, todoList.firstChild);
          editButton.style.display = "block";
        }
      });
  
      // Build the to-do item
      li.appendChild(checkbox);
      li.appendChild(todoText);
      li.appendChild(deleteButton);
      li.appendChild(editButton);
      todoList.appendChild(li);
      updateDeleteAllButtonVisibility();
    }
  
    // Event listener for the 'Delete All' button
    deleteAllButton.addEventListener("click", function () {
      // Loop through todo items and apply fadeOut animation
      const todoItems = todoList.children;
      for (let i = 0; i < todoItems.length; i++) {
        const li = todoItems[i];
        li.style.animation = "fadeOut 0.8s forwards";
        deletedingSound.play();
        li.addEventListener("animationend", function () {
          li.remove();
          updateDeleteAllButtonVisibility();
        });
      }
      deleteAllButton.style.visibility = "hidden";
    });
  
    // Event listener for todo list clicks
    todoList.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-button")) {
        event.target.parentElement.style.animation = "fadeOut 0.8s forwards";
        event.target.parentElement.addEventListener("animationend", function () {
          event.target.parentElement.remove();
          updateDeleteAllButtonVisibility();
        });
      }
    });
  
    // Function to update the visibility of the 'Delete All' button
    function updateDeleteAllButtonVisibility() {
      deleteAllButton.style.visibility =
        todoList.children.length === 0 ? "hidden" : "visible";
    }
  
    // Initialize 'Delete All' button visibility
    updateDeleteAllButtonVisibility();
  });
  