'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.

// Ensure environment variables are read.
require('../config/env');

const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const ora = require('ora');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

const paths = require('../config/paths');
const config = require('../config/webpack.config.deploy');


// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}


// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `choosePort()` Promise resolves to the next free port.


const spinner = ora('Go to S3...')
spinner.color = 'green'
spinner.start()

webpack(config, (werr) => {
  if (werr) {
    spinner.fail('Build error. 😭')
    throw werr
  }
  spinner.succeed('I\'uploaded. 🎉\n')
})
