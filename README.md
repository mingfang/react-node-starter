# React Node Starter

## Features
- React with typescript support
- Node Express
- Enrouten for directory based API routing (`server/api/data.js`)
- Proxy middleware to fan out to external APIs (`http-proxy-middleware`)
- Dockerfile
- DEV mode features
  - Nodemon and Webpack with polling change detection (Works on NFS)
  - Proxy from Webpack to Node (`src/setupProxy.js`)
    
### Commands

```shell
npm run dev
```
Starts the development server.

```shell
npm run build
```
Builds the app for production.

```shell
npm start
```
Runs the built app in production mode.

```shell
docker build --pull -t react-node-starter .
```
Builds the Docker image for the app.