document.addEventListener('DOMContentLoaded', function () {
    // Check if the file has been uploaded previously
    chrome.storage.local.get(['dailyTasks'], function (result) {
        if (result.dailyTasks && result.dailyTasks.length > 0) {
            document.getElementById('fileInputContainer').style.display = 'none';
            document.getElementById('uploadNewFile').style.display = 'block';
        } else {
            document.getElementById('fileInputContainer').style.display = 'block';
            document.getElementById('uploadNewFile').style.display = 'none';
        }
    });

    document.getElementById('fileInput').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            const tasks = e.target.result.split('\n').filter(task => task.trim() !== '').map(taskLine => {
                const [taskName, taskLink] = taskLine.split(' - ');
                return { name: taskName.trim(), link: taskLink.trim() };
            });
            chrome.storage.local.set({ dailyTasks: tasks }, function () {
                updateTasksList(); // Update the displayed list with clickable links
                // Hide the file input container after successful upload
                document.getElementById('fileInputContainer').style.display = 'none';
                // Set a flag indicating the file has been uploaded
                chrome.storage.local.set({ fileUploaded: true });
            });
        };
        reader.readAsText(file);
    });

    function updateTasksList() {
        chrome.storage.local.get(['dailyTasks', 'visitedTasks'], function (result) {
            let tasksList = document.getElementById('tasksList');
            tasksList.innerHTML = ''; // Clear current list
            if (result.dailyTasks && result.dailyTasks.length > 0) {
                result.dailyTasks.forEach(function (task, index) {
                    let taskElement = document.createElement('a');
                    taskElement.textContent = task.name;
                    taskElement.href = task.link;
                    taskElement.target = '_blank';
                    taskElement.className = result.visitedTasks && result.visitedTasks[index] ? 'visited' : '';
                    taskElement.addEventListener('click', function () {
                        markTaskAsVisited(index);
                        taskElement.classList.add('visited'); // Add visited styling
                    });
                    tasksList.appendChild(taskElement);
                });
            } else {
                // Display a friendly message if there are no tasks
                let noTasksElement = document.createElement('div');
                noTasksElement.textContent = 'No tasks found. Upload a file to see your tasks.';
                noTasksElement.className = 'no-tasks';
                noTasksElement.style.textAlign = 'center';
                noTasksElement.style.marginTop = '20px';
                tasksList.appendChild(noTasksElement);
            }
        });
        // Call this function whenever you mark a task as visited or modify tasks
        requestBadgeUpdate();
    }

    function markTaskAsVisited(index) {
        chrome.storage.local.get(['visitedTasks'], function (result) {
            let visited = result.visitedTasks || [];
            visited[index] = true; // Mark as visited
            chrome.storage.local.set({ visitedTasks: visited });
        });
        // Call this function whenever you mark a task as visited or modify tasks
        requestBadgeUpdate();
    }

    // Function to send a message to the background script to update the badge
    function requestBadgeUpdate() {
        chrome.runtime.sendMessage({ action: "updateBadge" });
    }

    updateTasksList(); // Initial call to update tasks list or show message
});
