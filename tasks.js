let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById('taskList');
  if (!list) return;

  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.name;

    if (task.completed) {
      li.style.textDecoration = 'line-through';
      li.style.opacity = '0.6';
    }

    li.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
      updateProgress();
    };

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  if (!input || input.value.trim() === '') return;

  tasks.push({ name: input.value.trim(), completed: false });
  input.value = '';

  saveTasks();
  renderTasks();
  updateProgress();
}

function updateProgress() {
  const barHome = document.querySelector('#home #progress-bar');
  const barProgress = document.querySelector('#progress #progress-bar');
  const imgHome = document.getElementById('tree-image');
  const imgProgress = document.getElementById('tree-image-progress');

  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : (done / total) * 100;

  if(barHome) barHome.style.width = percent + '%';
  if(barProgress) barProgress.style.width = percent + '%';

  let stage = 'seedling';
  if(done === 1) stage = 'sprout';
  if(done === 2) stage = 'sapling';
  if(done === 3) stage = 'young-tree';
  if(done >= 4) stage = 'full-tree';

  if(imgHome) imgHome.src = 'images/' + stage + '.png';
  if(imgProgress) imgProgress.src = 'images/' + stage + '.png';
}

window.onload = () => {
  renderTasks();
  updateProgress();
};
