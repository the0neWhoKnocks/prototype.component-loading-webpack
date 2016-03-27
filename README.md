### NOTE - This is a work in progress

## Installation

```
npm i -dd -g webpack
npm i -dd
npm run wpBuild
```

## Dev

Run the below command to watch for changes in the dev folder.

```
npm run wpWatch
```

Note - On Windows, if you run `wpWatch` then stop and start it. There will be a
leftover `Node.js` process running. You'll start to see errors being thrown on
save (even though the files are compiled), and you'll also see it Chunk the same
file as many times for each rogue `Node.js` process. For now you have to kill the
extra process via Task Manager after you stop the `wpWatch` command.

## TO-DO

* Currently, minified files don't work, but their full versions do. Getting this
error when trying to load minified files: `Uncaught ReferenceError: webpackJsonp is not defined`.
Look into UglifyJsPlugin opts to see if there's something for this.