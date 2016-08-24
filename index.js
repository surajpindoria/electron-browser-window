const BrowserWindow = require('electron').remote.BrowserWindow;
const ipcRenderer = require('electron').ipcRenderer;
const path = require('path');

let buttonNoWindow = document.getElementById('btn-no-window');
let buttonWindow = document.getElementById('btn-window');
let myWindowId;
let workerWindow;

buttonNoWindow.onclick = function() {
    while (true) {
        n += 1;
        for (let i = 2; i <= Math.sqrt(n); i += 1) {
            if (n % i === 0) {
                break;
            }
        }
        // found a prime!
        console.log(n);
    }
};

buttonWindow.onclick = function() {
    console.log('*** click');

    let workerPath = 'file://' + path.join(__dirname, '/worker.html');

    workerWindow = new BrowserWindow({ width: 400, height: 400, show: false });
    workerWindow.loadURL(workerPath);
    workerWindow.openDevTools();

    workerWindow.webContents.on('did-finish-load', function() {
        workerWindow.webContents.send('compute-primes', myWindowId);
    });
};

ipcRenderer.on('window-id', function(event, id) {
    myWindowId = id;
});

ipcRenderer.on('got-prime', function(event, prime) {
   console.log("prime " + prime);
});
