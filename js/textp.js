const {ipcRenderer} = require('electron')
function init(){
    //监听mian process里发出的message
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        alert("web2" + arg);// prints "pong"  在electron中web page里的console方法不起作用，因此使用alert作为测试方法
    })
}


function say_hello(){
    //在web page里向main process发出message
    // ipcRenderer.send() 是渲染进程向主进程传递的信息，主进程用ipcMain.on('asynchronous-message',(event, arg) => {})来监听，其中arg用来接收渲染进程传递过来的msg
    ipcRenderer.send('asynchronous-message', 'xixi') // prints "pong"
    ipcRenderer.sendSync('synchronous-message', 'haha') // prints "pong"
    // alert("web1" + 'ping');
}