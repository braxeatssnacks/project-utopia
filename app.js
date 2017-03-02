const electron = require("electron");
// module that controls app lifecycle
const { app } = electron;
// module to create native window
const { BrowserWindow } = electron;

// global window reference
let win;

/* HANDLE STAGES OF APP LIFECYCLE */

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
  // create new draggable window
   win = new BrowserWindow({
     title: "Project Utopia",
     minWidth: 1000,
     minHeight: 600,
     width: 1200,
     height: 800,
     titleBarStyle: 'hidden-inset',
   });

  // load app view
  win.loadURL(`file://${__dirname}/game/index.html`);

  // console.log(win);

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
  console.log("... and we're live, baby!");
}
