const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    let editingTask = false;
    let editInput = null;

    function createTask() {
      const taskText = taskInput.value;

      if (taskText) {
        const listItem = document.createElement('li');
        listItem.classList.add('fade-in');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const taskLabel = document.createElement('label');
        taskLabel.innerText = taskText;

        const editButton = document.createElement('button');
        editButinnerText = 'Edit';
        editButton.className = 'edit-button';

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete-button';

        editButton.addEventListener('click', function () {
          if (editingTask) {
            saveEditedTask(listItem, editInput.value);
          } else {
            editTask(listItem);
          }
        });

        deleteButton.addEventListener('click', function () {
          listItem.classList.remove('fade-in');
          listItem.classList.add('fade-out');
          setTimeout(function () {
            listItem.remove();
          }, 300);
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskLabel);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);

        taskInput.value = '';
      }
    }

    function editTask(listItem) {
      const taskLabel = listItem.querySelector('label');
      const editButton = listItem.querySelector('.edit-button');
      const deleteButton = listItem.querySelector('.delete-button');

      const taskText = taskLabel.innerText;
      taskLabel.style.display = 'none';

      const input = document.createElement('input');
      input.type = 'text';
      input.value = taskText;

      editInput = input;
      editingTask = true;

      listItem.insertBefore(input, editButton);

      taskInput.value = taskText;
      taskInput.focus();

      editButton.innerText = 'Save';
      deleteButton.disabled = true;
    }

    function saveEditedTask(listItem, newText) {
      const taskLabel = listItem.querySelector('label');
      const editButton = listItem.querySelector('.edit-button');
      const deleteButton = listItem.querySelector('.delete-button');
      const input = listItem.querySelector('input[type="text"]');

      taskLabel.innerText = newText;
      taskLabel.style.display = 'block';

      listItem.removeChild(input);

      editButton.innerText = 'Edit';
      deleteButton.disabled = false;

      editingTask = false;
    }

    addButton.addEventListener('click', function () {
      createTask();
    });

    taskInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        createTask();
      }
    });
