# CloudFRaaS Web Application Server
* [Introduction](#introduction)
* [Features](#features)
* [Development](#development)
* [Contributions](#contributions)

## Introduction
This repository holds the Application Web Server used by the CloudFRaaS platform.  It is based on Express and is hardened for Public Internet usage.

## Features
The code base supports both Server and Client side rendering of React code.  Currently, it only supports serving static assets from itself. CDN support is on the roadmap.

To provide universal support of JavaScript 2018 and some experimental features, both server and client side code run through babel.  Therefore, the deployments entail transpiling both ends of the code.  

This system has a tight coupling between the client, and the server in order to provide a simplified view of CORS security measures and also implement the Back-end For Front-end Design Pattern.  The idea here is that this web platform will serve to support a broader SOA architecture behind the network edge and support the UI in an optimal way.  This allows internal services to operate in a pure Domain-centric model independent of the needs of the web platform.  By separating concerns here the web platform is able to highly optimize the user experience independent of the greater platform.
## Development
The main directory breakdown is pretty straight forward:
1) The `server` folder holds all code that is intended to ONLY run on the server.  It will never run on the client.
2) The `universal` folder holds isomorphic javascript code that will run both on the server, and the client.  All the React code lives here.

### Environment Variables
* `NODE_ENV` - classic usage.  Possible values are `local`, `stage`, `production`.
* `NODE_PORT` - Defines the port the express server binds to for serving data.

### End Points
The server API has two REST based endpoints:
* `/` - serves the main entry point view template to deliver browser code.
* `/public` - serves the client-side static assets.

The majority of the server's API is GraphQL.  The entry point for the graphql API is: `/graphql`.  To view the schema, point your browser to `/graphql`.  The Playground Visual GraphQL Inspector will show up.  This is disabled for production builds.  
 
### Usage
1. To start development locally, clone the project, then run the following steps:
```bash
npm install
npm start
```
Navigate to `localhost:<NODE_PORT>` or whatever the log output shows for the target address.

### npm scripts (partial list)
Name              | Responsibility
----------------- | -------------------------------------
`start`           | Used locally to run and develop the application.  It will hot reload the server during active development.
`start:client`    | Really only useful when running generic `start.
`start:server`    | Runs the server side build out with babel on the fly.  Useful for API work only.
`clean`           | Purges the build directory for server side builds.
`test`            | Runs linting and unit tests. Automatically creates code coverage reports.
`test:watch`      | Runs unit tests and watches for changes.  Automatically re-runs them when a change is detected.
`lint`            | Runs `eslint` against the `src` directory.
`build`           | Builds the client and server bundles.
`build:server`    | Builds the server code for vanilla Node to use.
`build:client`    | Builds the client side bundles to be used for static assets.

## Contributions
This repo is configured with `eslint` and `prettier`.  It is expected that the application will have zero linting errors for any PRs intended for the `master` branch.

Code coverage guidelines are expected to be met.  Thresholds are set in the jest configuration.
