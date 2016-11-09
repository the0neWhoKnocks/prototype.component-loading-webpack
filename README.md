# Creating components with WebPack 

[![Build Status](https://travis-ci.org/the0neWhoKnocks/prototype.component-loading-webpack.svg?branch=master)](https://travis-ci.org/the0neWhoKnocks/prototype.component-loading-webpack)
[![Coverage Status](https://coveralls.io/repos/github/the0neWhoKnocks/prototype.component-loading-webpack/badge.svg?branch=master)](https://coveralls.io/github/the0neWhoKnocks/prototype.component-loading-webpack?branch=master)

## Installation

```
npm i -dd -g webpack gulp karma
npm i -dd

# You can then run this to build assets
gulp build

# This to build & start watching for changes.
gulp watch

# To run tests
gulp test
# OR
gulp test:watch
```


## Notes

- If you want to test Coveralls locally, you'll have to
   - Uncomment the entry in `karma.conf.js` within `reporters`.
   - Create a `.coveralls.yml` file and add your repo token.
      - Get the token by signing in to https://coveralls.io with your GitHub 
      creds.
      - Go to the **Repos** section, click **Add Repos**, add the repo. 
      - Go into the repo, there should be a **Refresh** button at the top, click 
      on that and wait for the repo to sync.
      - Once synced, there should be a **Repo Stats** section to the right where 
      you'll find the repo token at the bottom. 
      - Copy that token into `.coveralls.yml` like `repo_token: XXXXXXXXXXX`. 
   - Now if you run tests locally, it'll push the current data to Coveralls if
   the tests were successful.

- Tried using webpack-dev-server and there were live-reload issues when used with
Gulp. Basically WebPack would finish, reload the page, then files would be 
written & minified. So you wouldn't see your previous changes until you manually
refreshed or changed another file.


## Troubleshooting

- When setting up tests on Windows, it suggested going into ./node_modules/karma/bin
and executing `karma init karma.conf.js` which fails when using Cygwin. You can
run `zsh` (or what shell you're using) with Window' `cmd` to make it interactive
`cmd /c start zsh`.

- On Windows (with Cygwin) if you try to install `husky` you'll get an error.
There's currently [a PR out](https://github.com/typicode/husky/pull/70) for it, but if it still hasn't been merged by the
time you try to install this, you can download the repo to the top level of this
repo, and then just run `npm i ./husky`, `./husky` being the name of the
downloaded folder.