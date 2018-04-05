# base-nodejs
A no-frills pre-bootstraped NodeJS repo to quick start your NodeJS projects.

## Contains
* NPM package.json actions
* Gulp / Basic Gulp Script
* ESLint / ESLint Configuration
* Mocha / Unit.js
* Istanbul / nyc
* Codacy Integration / Coverage
* Cross Env (for environment variables)
* Basic TravisCI Configuration

## How to use this repo
To use this repository as a base for your own projects, simply clone this repo and then remove .git folder from the
project root.

# Actions
NPM actions are included to facilitate most project needs

## Build -- `npm run build`
The build process utilizes Gulp and the included `gulpfile.js`. The `defaul` gulp taks runs linting and testing only.
However, this gulpfile comes preloaded with a number of other helpful tasks that include linting, testing, and code
reformatting. Changes and additional tasks can be added based on the requirements and needs of the project's build,
packaging and deployment goals.

## Lint -- `npm run lint`
The linting process utilizes ESLint and is preloaded with over 150 rules to validating and quality checking of code.
The [ESLint Rules](https://eslint.org/docs/rules/) can be altered by editing the `.eslintrc.json` file.

## Testing -- `npm test`
The testing process utilizes Mocha and Unit.JS, and includes a base unit test file located in the `test/` folder.
Additional test files and test can be added to the included `test/index.js` file or within the `test/` folder itself.
Further, the tests are piped through Istanbul by using NYC to provide test coverage reporting

## Coverage Report -- `npm run coverage`
Test coverage reporting is facilitated using Instanbul through NYC and then pushing the reporting to Codacy. The
reporting integrates with Codacy and requires extra steps outlined below.

## Fix Code Styling -- `npm run fix`
Some automatic code styling fixes are possible with the preloaded ESLint rules. This command runs ESLint in fix mode to
correct styling issues.

## Prettify Code Styling -- `npm run pretty`
Automatic code prettification for standardized code styling is performed by Prettier, the outputted prettified code is
then sent through ESLint in fix mode to correct some minor styling issues that Prettier introduces. The
[prettier options](https://prettier.io/docs/en/options.html) can be configured in the `.prettierrc.json` file, and if
no piping through ESLint is desired, then the `pretty` action in the `gulpfile.js` can be modified. However, if this is
desired then all formatting rules in `.eslintrc.json` should be removed.

# Configuration / Information

## TravisCI Integration
It is highly recommended that you install the [TravisCI CLI](https://github.com/travis-ci/travis.rb) tool before
beginning. The `.travis.yml` file is included for use with TravisCI.

## Codacy Coverage

In order for Codacy Coverage to work this to work, the Codacy Project Token must be added to your environment variables.

This can be done by setting the appropriate environment variable:
```
export CODACY_PROJECT_TOKEN=<Token_from_Codacy>
```
Or, by updating the `package.json` file to update the coverage action as follows

```js
  "coverage": "cross-env CODACY_PROJECT_TOKEN=<Token_from_Codacy> nyc --reporter=lcov mocha && cat ./coverage/lcov.info | codacy-coverage"
```

When integrating with Travis you will also need to configure travis with the environment variable for building by performing:
```
travis encrypt CODACY_PROJECT_TOKEN=<Token_from_Codacy> --add
```
