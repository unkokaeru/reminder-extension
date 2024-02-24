chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');

    // Initialize storage or perform other setup tasks here
    // For example, setting up an initial, empty list of tasks
    chrome.storage.local.set({ dailyTasks: [] }, function () {
        console.log("Initialized the task list.");
    });

    // Any other initialization logic can go here
});

chrome.runtime.onStartup.addListener(function () {
    chrome.storage.local.set({ visitedTasks: [] }); // Clear visited tasks state
});

function updateBadge() {
    chrome.storage.local.get(['dailyTasks', 'visitedTasks'], function (result) {
        const totalTasks = result.dailyTasks ? result.dailyTasks.length : 0;
        const visitedTasksCount = result.visitedTasks ? result.visitedTasks.filter(Boolean).length : 0;
        const unvisitedCount = totalTasks - visitedTasksCount;

        const badgeText = unvisitedCount > 0 ? unvisitedCount.toString() : '';
        chrome.action.setBadgeText({ text: badgeText });
    });
}

// Call updateBadge when the extension is installed/updated
chrome.runtime.onInstalled.addListener(updateBadge);
chrome.runtime.onStartup.addListener(updateBadge);

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "updateBadge") {
        updateBadge();
    }
});