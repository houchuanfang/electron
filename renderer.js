// renderer.js
// 引入ipcRenderer对象
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
// 设置监听
ipcRenderer.on('main-process-messages', (event, message) => {
    console.log('message from Main Process: ' , message);  // Prints Main Process Message.
});

// // main.js
// // 当页面加载完成时，会触发`did-finish-load`事件。
// win.webContents.on('did-finish-load', () => {
//     win.webContents.send('main-process-messages', 'webContents event "did-finish-load" called');
// });
// renderer.js
ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log('asynchronous-reply: %O %O', event, arg);
});
ipcRenderer.send('asynchronous-message', 'hello');
