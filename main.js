// electron wrapper
const electron = require('electron');

// module that controls app lifecycle
const { app } = electron;

// module to create native window
const { BrowserWindow } = electron;

// express app configuration
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

// global window reference
let win;

/* HANDLE STAGES OF ELECTRON WRAPPER LIFECYCLE */

// [ BEFORE READY ]
app.on('will-finish-launching', prepareApp);

// [ READY ]
app.on('ready', createWindow);

// [ CLOSE ALL WINDOWS ]
app.on('window-all-closed', windowsAllClosed);

// [ RE-OPEN ]
app.on('activate', onActivate);


/* HELPER FUNCTIONS */

function createWindow() {
  // instantiate app server if not already running
  if (!app.hasOwnProperty('server')) {
    app.server = require(`${__dirname}/app/app.js`)(config);
  }

  // create new draggable window
   win = new BrowserWindow({
     title: 'Project Utopia',
     minWidth: 1200,
     minHeight: 700,
     width: 1200,
     height: 700,
     maxWidth: 1200,
     maxHeight: 700,
     fullscreen: false,
     titleBarStyle: 'hidden'
   });

  // load app index.html
  win.loadURL(`http://${config.server.host}:${config.server.port}/gamelist`);
  // game?id=2&stage=1`

  // console.log(win);
  win.focus();

  // handle close
  win.on('closed', function() {
    // dereference global win & allow garbage collection
    win = null;
  });
}

function onActivate() {
  // app has been opened via dock click
  if (win == null) {
    createWindow();
  }
}

function windowsAllClosed() {
  // MAC OS X -- keep applications open unless "Cmd + Q"
  if (process.platform !== "darwin") {
    app.quit();
  }
}

function prepareApp() {
  // do something before the app starts up
  console.log("... and we're live, baby, yeeeeeahhhhhh!");
}