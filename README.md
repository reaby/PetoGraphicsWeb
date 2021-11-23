# PetoGraphicsWeb
Graphic software for streaming in browser.

## Features

- Create and control graphics using Web UI
- Customizable graphics and animations
- View graphics in other tab and stream it using browser source in eg. OBS or vMix
- Easily runnable using executable in Windows

## Development

### Starting the project

First run `npm install` inside `client` and `server` directories to install dependencies.

After installation run `npm start` in root directory to start both client and server. Client opens at `http://localhost:3000` and server at `http://localhost:5000`.

### Building the project

First run `npm run build` inside root directory to build client.

Copy `client/build` directory to `server/client`.

You need to have [nexe](https://github.com/nexe/nexe) installed globally to build the project.

Navigate to `server` directory and run

```
nexe index.js
nexe --build
```

After build is done you can copy the executable file and `client` directory to move the application. You can also move the `configs` directory but it is not required. Application will automatically create `configs` directory when started.
