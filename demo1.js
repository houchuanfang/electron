// 主进程
const electron= require('electron')
const {ipcMain} = electron
const app = electron.app
const  BrowesrWindow = electron.BrowserWindow


// 主窗口
let mainWindow
// 创建窗口
// app模块是为了控制整个应用的生命周期 app下面有很多事件
function createWindow() {
    mainWindow = new BrowesrWindow({
        width:800,
        height:600
    })
    //选择主页面
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    // 打开调用的开发者工具
    mainWindow.webContents.openDevTools()
    // 当关闭的时候 主窗口清空
    mainWindow.on('closed',function () {
        mainWindow = null
    })

}
app.on('ready',createWindow);
app.on('window-all-closed',function () {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

//监听web page里发出的message // 每当点击事件触发都会执行监听
ipcMain.on('asynchronous-message', (event, arg) => {
    console.log("mian1" + arg)  // prints "ping"
    event.sender.send('asynchronous-reply', 'main1')//在main process里向web page发出message
})

ipcMain.on('synchronous-message', (event, arg) => {
    console.log("mian2" + arg)  // prints "ping"
    event.returnValue = 'main2'
    event.sender.send('asynchronous-reply', 'main2')//在main process里向web page发出message
})

