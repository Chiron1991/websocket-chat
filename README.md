# websocket-chat
This repository basically contains the chat from the [Socket.io tutorial](https://socket.io/get-started/chat/).
It's my personal playground for getting familiar with websockets and the whole Node transpiling stack.

## Requirements
- Node.js 7.10.0+
- yarn 0.23.4+

## Preparation
1. Clone the project by running `git clone https://github.com/Chiron1991/websocket-chat.git`.
2. `cd` into the project.
3. Install dependencies by running `yarn install`.

## Configuration
The default configuration resides at `config/default.json`.
websocket-chat uses [config](https://github.com/lorenwest/node-config) to manage configuration. Read their wiki to know how to hack into the configuration.

## Developing
1. Make sure your `NODE_ENV` is __not__ `production`.
2. Start Webpack to build your frontend assets by running `yarn webpack`.
3. Start the server by running `yarn devserver`.
4. Make changes. Both the server and Webpack will restart on detected changes.

## Production
1. Make sure your `NODE_ENV` __is__ `production`.
2. Prepare both server and asset files by running `yarn build`.
3. Start the server by running `yarn serve`.