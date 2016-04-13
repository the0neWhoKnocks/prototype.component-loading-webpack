### NOTE - This is a work in progress

## Installation

```
npm i -dd -g webpack gulp karma
npm i -dd

# You can then run this to build assets
gulp build

# This to build & start watching for changes.
gulp watch
```


## Notes

- Tried using webpack-dev-server and there were live-reload issues when used with
Gulp. Basically WebPack would finish, reload the page, then files would be 
written & minified. So you wouldn't see your previous changes until you manually
refreshed or changed another file.

- When setting up tests on Windows, it suggested going into ./node_modules/karma/bin
and executing `karma init karma.conf.js` which fails when using Cygwin. You can
run `zsh` (or what shell you're using) with Window' `cmd` to make it interactive
`cmd /c start zsh`.