#!/bin/bash

# Enable error reporting to the console.
set -e

# Install bundles if needed
bundle check || bundle install

# NPM install if needed.
npm install

# Build the site.
gulp

# Upload to FTP
cp -R ../${github_reposity}/_site/* .