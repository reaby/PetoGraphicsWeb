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

### Running tests

Run `npm test` to run tests.

### Building the project

You need to have [nexe](https://github.com/nexe/nexe) installed globally to build the project.

Run `build.bat` to create production build. The build result is found at `dist` directory.
