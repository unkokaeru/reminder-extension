# Daily Task Tracker Chrome Extension

## Description

Daily Task Tracker is a Chrome Extension designed to help users keep track of daily tasks directly from their browser. It allows users to upload a list of tasks from a text file, each potentially associated with a hyperlink. Users can easily see which tasks are pending and visit associated links with a single click. The extension also features a badge count on the icon, showing the number of unvisited tasks, providing a quick glance at remaining tasks without needing to open the extension.

## Features

- **Task Upload:** Users can upload tasks through a `.txt` file, where each task can optionally be associated with a hyperlink.
- **Task Tracking:** The extension displays all uploaded tasks and marks them as visited once clicked.
- **Badge Count:** A dynamic badge on the extension icon shows the number of tasks yet to be visited, updating in real-time.
- **Persistence:** Visited status of tasks persists across browser sessions, resetting only when Chrome is restarted.

## Installation

To install Daily Task Tracker, follow these steps:

1. Clone the repository or download the ZIP file and extract it.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" at the top-right corner.
4. Click "Load unpacked" and select the extracted folder for the extension.
5. The extension should now appear in your Chrome toolbar.

## Usage

1. **Uploading Tasks:**
   - Click on the Daily Task Tracker icon in your Chrome toolbar.
   - Use the "Upload File" button to select and upload your `.txt` file containing tasks.
   - Tasks should be formatted as `Task Name - https://example.com/link` per line.

2. **Viewing and Visiting Tasks:**
   - Uploaded tasks will be displayed within the popup.
   - Click any task to visit its associated link. Visited tasks will be greyed out.

3. **Tracking Unvisited Tasks:**
   - The badge on the extension icon indicates the number of tasks yet to be visited.
   - This count updates in real-time as tasks are visited.

## Customizing

- Feel free to delve into the `popup.css` file to customize the appearance of your task list.
- Advanced users can modify `popup.js` or `background.js` to add new features or alter existing functionality.

## Contributing

We welcome contributions and suggestions! Please fork the repository and submit a pull request with your improvements or open an issue to discuss new features or changes.

## License

This project is open source and available under the [MIT License](LICENSE).