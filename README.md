# PetoGraphicsWeb
Graphic software for streaming in browser.

## Features

- Create and control graphics using Web UI
- Customizable graphics and animations
- View graphics in other tab and stream it using browser source in eg. OBS or vMix
- Easily runnable using executable in Windows

## Usage tips

- Hold `Ctrl` + drag elements at list to form group

## Installation

Download latest release from [releases](https://github.com/SampsaKaskela/PetoGraphicsWeb/releases) page.

Extract .zip file and inside directory run `PetoGraphicsWeb.exe` to start the application. Application will open in your systems default browser at `http://localhost:5000`.

## Development

### Starting the project

Run `npm install` to install dependencies for client and server.

After installation run `npm start` in root directory to start both client and server. Client opens at `http://localhost:3000` and server at `http://localhost:5000`.

### Running tests

Run `npm test` to run tests.

### Building the project

You need to have [nexe](https://github.com/nexe/nexe) installed globally to build the project.

Run `npm run build` to create production build. The build result is found at `dist` directory.
