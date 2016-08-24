const ipc = require('electron').ipcRenderer;
const BrowserWindow = require('electron').remote.BrowserWindow;

let callerWindow;

ipc.on('compute-primes', function(event, fromWindowId) {
    const fromWindow = BrowserWindow.fromId(fromWindowId);

    let n = 1;
    while (true) {
        n += 1;
        for (let i = 2; i <= Math.sqrt(n); i += 1) {
            if (n % i === 0) {
                break;
            }
        }
        // found a prime!
        console.log(n);
        fromWindow.webContents.send('got-prime',n);

    }
});
