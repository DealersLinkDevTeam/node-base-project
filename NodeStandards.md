# NodeJS Standards
Depending on the project, the correct version of NodeJS should be used for testing and building. To ensure that the
proper version of NodeJS is running in your environment, the following criteria should be observed.

  * Unless otherwise specified, projects should use the most recent 9.X build of NodeJS
  * AWS Lambda Projects should use NodeJS 6.2
  * NodeJS 10.X should not be used because it contains breaking changes

To ensure that the proper version of NodeJS is in use the `nvm` tool should be installed and used to maintain the
version of Node in use.

# Installing NVM

## On Mac
  1. If it is not installed, installed [Homebrew](http://brew.sh/)
  2. Run the following commands:
```shell
brew update
brew install nvm
mkdir ~/.nvm
```
  3. Edit your `~/.bash_profile` and add the following lines:
```
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```
  4. Run the following commands:
```shell
source ~/.bash_profile
echo $NVM_DIR
```
  5. You should see the `~/.nvm` folder echoed back in the terminal
  6. Test the `nvm` command on the command line

## On Ubuntu
  1. From terminal run the following command:
```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
  2. Close and reopen the terminal window
  3. Test the `nvm` command on the command line

## On Windows 10
The native NodeJS installation for Windows is not recommended. Instead perform the following:
  1. Install [Linux Subsystem for Windows](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
  2. Install [Ubuntu for Windows](https://tutorials.ubuntu.com/tutorial/tutorial-ubuntu-on-windows#0) from the Windows Store (it's free).
  3. Reboot as required
  4. Open the Ubuntu Terminal Shell
  5. Follow the steps from the Ubuntu installation above.

***Note:*** Running Node in Windows this way, from the Ubuntu Shell, will be consistent with how it will run in other environments, specifically AWS.

# Using NVM

## Installing a specific version of Node using `nvm`
Once nvm is installed, you should install versions that you will use.

For example:
```shell
nvm install 6.2
nvm install 9
```

## Installing the most recent version of Node using `nvm`
You can install the move recent version of Node using the following:
```shell
nvm install node
```

However, currently this is a 10.x version which has breaking changes and is not recommended.

## Setup default Node version
You can set the default version of Node that is in use using the following:
```shell
nvm alias default node
nvm alias default 9
nvm alias default [version]
```

## Switching between version
You can switch version of Node in use using the following:
```shell
nvm use node
nvm use default
nvm use 9
nvm use [version]
```

## Using the system version of Node
You can use the system installed version of Node, instead of the NVM installed versions using the following:
```shell
nvm use system
nvm run system --version
```

## Listing installed versions
To list the versions of Node installed with NVM, use the following:
```shell
nvm ls
```

## Showing the current version of Node in use
To show the current version of Node in used, use the following:
```shell
nvm current
```

# Recommended Global Packages
The following packages are recommended to be installed globally (e.g. `npm i -g [package]`) for consistent tooling across environments. ***NOTE:*** You must run `npm i -g` for your global dependencies for each version of Node installed with `nvm` after it has been set active with `nvm use`.
 * eslint@4
 * gulp@3.9
 * gulp-cli
 * mocha@5
 * npm
 * prettier

`npm i -g eslint@4 gulp@3.9 gulp-cli mocha@5 npm prettier`

## ExpressJS Specific Global Packages
 * express-generator

## React Specific Global Packages
 * create-react-app
 * create-react-class

## Tooling Specific Global Packages
 * nsp -- Package Deprecation and Security Warning Checking
 * snyk -- Package Deprecation and Security Warning Checking
 * pm2 -- Process Manager Daemon for Node applications
 * redis-commander -- Redis exploration/debugging Web Application
