// Class to represent a task
class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }
    toggleCompleted() {
        this.completed = !this.completed;
    }
}
// Array to store tasks
let tasks = [];
// Get HTML elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const filterAllButton = document.getElementById('filterAll');
const filterCompletedButton = document.getElementById('filterCompleted');
const filterIncompleteButton = document.getElementById('filterIncomplete');
// Function to render tasks based on the selected filter
const renderTasks = (filter = 'all') => {
    taskList.innerHTML = ''; // Clear the task list
    // Filter tasks
    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'incomplete') {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    // Render tasks
    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        // Add task description
        const taskText = document.createElement('span');
        taskText.textContent = task.description;
        if (task.completed) {
            taskText.classList.add('completed');
        }
        // Toggle task completion on click
        taskText.addEventListener('click', () => {
            task.toggleCompleted();
            renderTasks(filter);
        });
        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks(filter);
        });
        // Append elements to the list item
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
};
// Add new task
addTaskButton.addEventListener('click', () => {
    const taskDescription = taskInput.value.trim();
    if (taskDescription === '') {
        alert('Please enter a task description!');
        return;
    }
    tasks.push(new Task(taskDescription)); // Add task to the list
    taskInput.value = ''; // Clear input field
    renderTasks();
});
// Event listeners for filters
filterAllButton.addEventListener('click', () => renderTasks('all'));
filterCompletedButton.addEventListener('click', () => renderTasks('completed'));
filterIncompleteButton.addEventListener('click', () => renderTasks('incomplete'));
  