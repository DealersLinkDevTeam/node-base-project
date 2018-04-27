# Code Standards and Style Guide
The following is an outline of the basic code standards as recommended by the ES6 Style Guide and supplemented by the
AirBnB style guide in places where the ES6 style guide only makes recommendations for the purposes of consistent code.

In general, this code style guide exists to ensure the following:
  * Consistent style code regardless of the author
  * Ease of maintainability when reading through a codebase or calculating diffs
  * Enforcement of coding best practices for code structure and performance
  * Ease of acquiring and on-boarding new talent

The ES6 Style Guide and AirBnB Style Guides are used to ensure that code conforms to the leading industry standards
which are used by the majority of Node developers within the Software industry.  These style and structure guidelines
are supported through the automated tooling of ESLint which has the ability to correct many of the issues outlined in
this guide.  Please see the [ESLint Rules](https://github.com/DealersLinkDevTeam/node-base-project/wiki/ESLint-Rules)
for additional details.

Consideration should be given for [language support](https://node.green/) in NodeJS, Browsers, and the environment where
the code will run. For information on setting up your environment to run the appropriate version of NodeJS please
see the [NodeJS Standards Guide](https://github.com/DealersLinkDevTeam/node-base-project/wiki/NodeJS-Standards)
  * Most Node projects should run on NodeJS 9.X
  * AWS Lambda only supports NodeJS 6.2 and should be used
  * Most modern browsers support ES2015; however transpilation using Babel is recommended for backward compatibility with older browsers.
  * NodeJS 10.x contains breaking changes and should not be used at this time.

  ***IMPORTANT NOTE:*** **When developing React or other client-side code, you must flip the line at the beginning of `.eslintrc.json` from `"browser": false,` to `"browser": true,`.**

## Naming and Usage
  * Identifiers must be at least 2 characters in length, but no more than 40 characters in length.
  * Identifiers must be camelcase, but may contain a beginning or trailing underscore.
  * Identifiers should be descriptive for what the value represents
  * Identifiers should avoid programatic terms (e.g. 'Factory', 'Descriptor') and should describe what the object represents rather than the design pattern represented.
  * Class Identifiers should be capitalized (e.g. Class, Factory, etc.) to distinguish the name from other variables.
  * Iterator variables should use a consistent and descriptive name. For example: `itr`, `jtr`, `ktr` in `for` loops, `key` in `for...of` and `for...in` loops.

```js
  // Bad
  let x = 1;                                                  // BAD; too short
  let AVeryLongButOtherwisePerfectlyLegalVariableName = 1;    // BAD; too long
  let WidgetFactoryMethod = (() => { return new Widget(); }); // BAD; this is a design pattern descriptor
  let snake_case_variable = 1                                 // BAD; variable is not camelcase
  // OK but not descriptive
  let _x = 1;
  let y_ = 2;
  // Good (Better)
  let itr = 1;                                                // Good this is a descriptive iterator name
  let CreateWidget = (() => { return new Widget(); });        // This is a descriptive method of what it does
  for (let jtr = 1; jtr < 10; jtr++) {
    // Do something...
  }
```

## Development Methodologies

### Functional Programming
Effort should be made to make use of JavaScripts (ES6) [Functional Programming Methodologies](https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)
and high-level functions.

For example, use of `filter`, `map`, and `reduce` can greatly simplify code by removing cumbersome `for` loops to
iterate through arrays and objects.

Take for example the following code using control structures:
```js
let animals = [
  { name: 'Fluffy', species: 'Bunny', age: 1 },
  { name: 'Cujo', species: 'Dog', age: 10 },
  { name: 'Buddy', species: 'Dog', age: 5 },
  { name: 'Mr. Bigglesworth', species: 'Cat', age: 10 }
];

let dogs = [];
let names = [];
let totalAge = 0;
for (let itr = 0; itr < animals.length; itr++) {
  let anim = animals[itr];
  if (anim.species === 'Dog') { dogs.push(anim); }
  names.push(anim.name);
  totalAge += anim.age;
}
```

It can be written functionally as follows:
```js
let dogs = animals.filter((animal) => { return animal.species === 'Dog'; });
let names = animals.map((animal) => { return animal.name; });
let totalAge = animals.reduce((sum, animal) => { return sum + animal.age; }, 0);
```

### Promises, Promise Chaining, and Callback functions
Effort should be made to use Promises and Promise chaining when possible instead of callbacks.  Further, when dealing
with modules(libraries) which require connectivity of some form, but do not provide Promises, then the
[Bluebird](https://www.npmjs.com/package/bluebird) `.promisify()` functionality should be used to create Promisified
versions of such functions.  Built-in CommonJS(Node) libraries which are structured to use callbacks (e.g. `fs`), can
make use of the [`util.promisify()`](https://nodejs.org/api/util.html#util_util_promisify_original) functionality added
in NodeJS 8.0.0

Regarding Promises and Promise Chains, they should be strung together to avoid 'stacked' promises. Take for example,
the following Promise code:

```js
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);

let cache = redis.createClient(...);
// Nested Promises
cache.getAsync('Key')
  .then((result) => {
    if (result) {
      cache.getAsync(result)
        .then((inner_result) => {
          // Do Something
        })
        .catch((err) => {
          throw err;
        })
    }
  })
  .catch((err) => {
    // Something went wrong
  });
```
This can be more cleanly written to remove the nesting as follows:
```js
// Promise Chaining
cache.getAsync('Key')
  .then((result) => {
    if (!result) {
      return Promise.reject('No data');
    }
    return cache.getAsync(result);
  })
  .then((result) => {
    // Do something
  })
  .catch((err) => {
    // Something went wrong
  });
```

Take note how the latter code is shorter (284 vs 249 chars) and does not extend to the right with each nested level.

### ES6 `import` vs. `require`
Effort should be made to use `import` and `require` in the appropriate circumstances to assist in the reduction of
unneeded code.  For NodeJS, familiarity with the [`Modules`](https://nodejs.org/api/modules.html#modules_require_main)
subsystem is assumed.

***`import` / `export`***
  * was introduced in ES6 and in many cases must be transpiled, reducing it to a `require` statement in such instances.
  * loads dependencies asynchronously in environments which support it natively
  * binds dependancies at initial interpretation time.
  * assist packaging tools in tree-shaking to remove unneeded code.
  * can export multiple classes which can be selectively imported.

***`require` / `module.exports`***
  * part of CommonJS/Node functionality
  * loads dependencies synchronously
  * bind dependencies at runtime, allowing for dynamic or conditional loading of resources
  * does not reveal dependencies for tree-shaking
  * must export a specific class or bound export to be required.

Use `import` in most circumstances where you are loading dependencies and use `export` in cases where the module is
then paired with `import`.

Use `require` in cases where you need to load the dependency dynamically or conditionally, and use `module.exports`
where the module will be used with `require`.

## Structure and Formatting

### File Beginning
The first line of the file should be a comment that contains the relative path to the project root and current
filename.

```js
// ./index.js
```

```js
// ./app/lib/base.js
```

### Comment Blocks
Large comments should use the JSDocs comment format when providing information.
```js

/*
 * Some information
 * More Information
 */
```

### Internal Code Documentation
[JSDoc](http://usejsdoc.org/) style comments should appear before `class` and `function` declarations when automatic
documentation is desireable.

```js
/**
 * @param {!Object} params - The object containing all Controller parameters.
 * @example
 * let widget = new Widget({});
 */
class Widget {
  constructor(param) {

  }
}
```

### Indenting
Indentation should be performed using 2 spaces. The body `case` blocks should be indented an additional level, even if
no block indicators are present. Space indentation looks identical within all editors and makes for better readability
across platforms and editors.

```js
function doSomething() {
  // Two space indent
  let x = 1;
  switch(x) {
    // Two space indent
    case 1:
      // Two space indent
      break;
    case 2: {
      // case block with 2 space indent
      break;
    }
  }
}
```

### Spacing
  * Tabs are not allowed in the code outside of string literals
  * Tabs and spaces should not be mixed
  * Irregular whitespace characters (e.g. non-breaking space, mathematical short-space, etc.) are not allowed in code outside of string literals and comments.
  * Consecutive spaces are not allowed in blocks of code outside of string literals and comments
  * Comments should begin with at least one space, block comments should end with at least one space
  * Commas should have no space before them and a single space after them.
  * Semicolons that appear on the same line as multiple statements should have no spaces before and one space after.
  * Blocks that begin on the same line as another statement should have a single space before the block start (`{`).
  * Spaces should appear immediately inside single-line blocks between the braces and the contents of the block.
  * No spaces should appear immediately inside parentheses between the parens and the contents.
  * No spaces should appear immediately inside array literal notations between the brackets and tokens.
  * No spaces should appear immediately inside computed properties between the brackets and the value.
  * One or more spaces should appear after the colon for an object key, but no space should be used between the key and the colon.
  * Colons inside switch-case statements should have no space before and a single-space or newline after.
  * No spaces should appear around the scope (dot `.`) operator when separating properties
  * Infix operators should have spaces on both sides of the operator.
  * Word-based unary operators should have spaces on both sides of the operator.
  * Symbol-based unary operators should have no spaces on either side of the operator.
  * Consecutive spaces are not allowed in regular expressions (use a quantifier expression instead).
  * Keywords should have spaces on either side unless they begin a statement or line, in which case they should be followed by a space
  * Function declarations should have no spaces between the function name and the function signature.
  * Function calls should have no spaces between the function name and the parameter body.
  * Arrow notation should have spaces on each side of the arrow.
  * Template tagged literals should have no spaces between the tag and the back-tick (\`).
  * Template Expressions should have no spaces immediately inside the curly braces.
  * The rest/spread operator (`...`) should have a space before it when in a list, but no other spacing otherwise.
  * Generator functions should have a space before the star (`*`) and no space after the star.
  * Yield statements with a start should have a space before the star (`*`) and no space after the star.

```js
  // General Spacing
  let x_ =   1;               // BAD; Consecutive Spaces in code
  let x_ = 1;                 // GOOD; Single spacing in code
  /* Lots  of  Spaces */      // OK; Consecutive spaces within a comment
  let str = 'Some  Thing';    // OK; Consecutive spaces inside a string

  // Comments
  //Bad Line                  // BAD; Should have a space immediate after comment beginning
  /*Bad Block*/               // BAD; Should have a space immediate after comment beginning
  /* Bad Block*/              // BAD; Should have a space immediate before block comment end
  // Good Line                // GOOD
  /* Good Block */            // GOOD

  // Commas
  let x ,y;                   // BAD; Should have no space prior to comma & a space following comma
  let z , w;                  // BAD; Should have no space prior to comma
  let a, b;                   // GOOD

  // Semicolons (on same line)
  for (let itr = 1 ;itr < 10 ;itr++) { ... }      // BAD; Should have no space before semicolon & a space after semicolon
  for (let itr = 1 ; itr < 10 ; itr++) { ... }    // BAD; Should have no space before semicolon
  for (let itr = 1; itr < 10; itr++) { ... }      // GOOD

  /* Curly Brace Usage '{}' */
  // Blocks
  if (str){                   // BAD; Should have a space prior to block beginning
  }

  if (str) {                  // GOOD
  }
  // Single-line Blocks
  if (str) {doSomething();}   // BAD; Should have spaces immediately inside curly braces '{ }'
  if (str) {doSomething(); }  // BAD; Should have a space immediately after opening curly brace '{'
  if (str) { doSomething();}  // BAD; Should have a space immediately prior to the closing curly brace '}'
  if (str){ doSomething(); }  // BAD; Should have a space before block beginning
  if (str) { doSomething(); } // GOOD

  // Parenthesis Usage '()'
  ( doSomething() );          // BAD; Should have no spaces immediately inside parens `()`
  (doSomething() );           // BAD; Should have no space immediately before closing parens `)`
  ( doSomething());           // BAD; Should have no space immediately after opening parens `(`
  (doSomething());            // GOOD

  /* Bracket Usage '[]' */
  // Array Literals
  let arr = [ 1, 2, 3 ];      // BAD; Should have no spaces immediately inside brackets '[ ]'
  let arr = [1, 2, 3 ];       // BAD; Should have no space immediately prior to the closing bracket ']'
  let arr = [ 1, 2, 3];       // BAD; Should have no space immediately after the opening bracket '['
  let arr = [1, 2, 3];        // GOOD
  // Computed Properties
  let val = arr [ key ];      // BAD; Should have no space after object/array identifier & no spaces immediately inside brackets '[ ]'
  let val = arr [ key];       // BAD; Should have no space after object/array identifier & no spaces immediately after opening bracket '['
  let val = arr [key ];       // BAD; Should have no space after object/array identifier & no spaces immediately before closing bracket ']'
  let val = arr [key];        // BAD; Should have no space after object/array identifier
  let val = arr[ key ];       // BAD; Should have no spaces immediately inside brackets '[ ]'
  let val = arr[ key];        // BAD; Should have no spaces immediately after opening bracket '['
  let val = arr[key ];        // BAD; Should have no spaces immediately before closing bracket ']'
  let val = arr[key];         // GOOD

  /* Colon Usage ':' */
  // Keys Object Literal Colons
  let obj = {
    key1 :1,                  // BAD; Should have space after key name & a space after colon
    key2 : 2,                 // BAD; Should have space after key name
    key3: 3,                  // GOOD
    key10:     10,            // OK; Extra spaced allowed so values align
    key100:   100,            // -- Be Consistent
    key1000: 1000             // ...
    key20:   20,              // OK; Extra spaced allowed so values align
    key200:  200,             // -- Be Consistent
    key2000: 2000             // ...
  }
  // Switch-Case Colons
  switch(x) {
    case 1 :break;            // BAD; Should have no space before colon and a space after colon
    case 2 : break;           // BAD; Should have no space before colon
    case 3: break;            // GOOD
  }

  // Scope Operator (dot `.`)
  obj . key1                  // BAD; Should have no spaces before or after dot
  obj. key1                   // BAD; Should have no space after dot
  obj .key1                   // BAD; Should have no space before dot
  obj.key1                    // GOOD

  // Infix Operators
  a=a+b;                      // BAD; Should have spaces immediately surrounding infix operators
  a =a +b;                    // BAD; Should have a space following infix operators
  a= a+ b;                    // BAD; Should have a space prior to infix operators
  a = a + b;                  // GOOD

  // Unary Word Operators
  let x =newWidget();         // BAD; Should have spaces immediately surrounding unary word operator
  let x =new Widget();        // BAD; Should have a space immediately prior to unary word operator
  let x = newWidget();        // BAD; Should have a space immediately following unary word operator
  let x = new Widget();       // GOOD

  // Unary Symbol Operators
  x ++;                       // BAD; Should have no space immediately prior to unary operator
  ++ x;                       // BAD; Should have no space immediately following unary operator
  x++;                        // GOOD
  ++x;                        // GOOD

  // Regular Expressions
  let re = /    /g;           // BAD; Consecutive Spaces in a Regular Expressions
  let re = / {4}/g;           // GOOD; Uses quantifier expression for number of spaces

  // Keywords -- Applies to all keywords
  for(idx of arr) { ... }     // BAD; Should have a space after `for` keyword
  try { }catch{ }             // BAD; Should have a spaces before and after `catch` keyword
  for (idx of arr) { ... }    // GOOD
  try { } catch { }           // GOOD

  // Function Declarations
  function doSomething (){ }  // BAD; Should have no space after function name and parameters
  function doSomething(){ }   // BAD; Should have a space before block beginning
  function doSomething() { }  // GOOD

  // Function Calls
  doSomething ();             // BAD; Should have no space after function name and before parens
  doSomething();              // GOOD

  // Arrow Notation
  ()=>{ ... }                 // BAD; Should have spaces to each side of the arrow (`=>`)
  ()=> { ... }                // BAD; Should have a space before the arrow (`=>`)
  () =>{ ... }                // BAD; Should have a space after the arrow (`=>`)
  () => { ... }               // GOOD

  // Template Tagged Literals
  func `Stuff`;               // BAD; Should have no space between tag and template literal
  func`Stuff`;                // GOOD

  // Template Expressions
  let str = `${ x }`;         // BAD; Should have no spaces immediately inside expression (`${ }`)
  let str = `${x }`;          // BAD; Should have no space immediately before expression close (`}`)
  let str = `${ x}`;          // BAD; Should have no space immediately after expression open (`${`)
  let str = `${x}`;           // GOOD

  // Rest / Spread Operator (`...`)
  let [x, y,... z] = obj;       // BAD; Should have a space before and no space after spread operator
  let [x, y,...z] = obj;        // BAD; Should have a space before spread operator
  let [x, y, ...z] = obj;       // GOOD
  w = function(x, y,... z) { }  // BAD; Should have a space before and no space after rest operator
  w = function(x, y,...z) { }   // BAD; Should have a space before rest operator
  w = function(x, y, ...z) { }  // GOOD

  // Generator/Yield Star `*` Operator
  function* generator() { }     // BAD; Should have a space before the star and no space after star
  function * generator() { }    // BAD; Should have no space after star
  function *generator() { }     // GOOD;
```

### New Lines
  * Files must end with a single newline
  * Files may begin with a single newline
  * No more than two consecutive newlines anywhere in the file
  * Line breaks should use Unix-style (`\n`)
  * Block comments (`/* */`) should be preceded with a newline
  * When separating lists of properties or variable declarations, commas should appear at the end of lines before the newline character.
  * Object literals must be contained in a single-line or be separated as a list of properties on each on its own newline
  * When it is necessary to separate array literals on newlines, the brackets and each token should appear on their own separate newlines.
  * When it is necessary to separate lists of parameters in a function declarations, the parens and each parameter should appear on their own separate newlines.
  * When separating lines with operators, the operator should appear at the end of lines before the newline character.
  * When separating properties or method chains, the dot should appear at the beginning line after the newline character.
  * Method chains longer than 2 in length must have the entire chain reformatted onto new lines.
  * Non-single-line blocks should use the `One-True-Brace-Style` where block openings are followed by a newline and block closings are started on their own new line. Additional statements should follow the closing brace and the above guidelines if additional blocks are used.

```js
// (bof)
// ... optional blank line (unix-newline)  \n

/* Commas Usage (Note the empty line before block comment here) */
// Object Lists
// BAD
let obj1 = {              // Commas should end, not start lines
          x: 1        
        , y: 2
      };

let obj2 = {  x: 1, y: 2, // Inconsistent break up on lines and braces
        z: 2, w: 1 };

// GOOD
let obja = { x: 1, y: 2 }
let objb = {
  x: 1,
  y: 2,
  z: 2,
  w: 1
}

// Array lists
// BAD
let arr1 = [             // Commas should end, not start lines
  1        
, 2
];

let arr2 = [1,  2,      // Inconsistent break up on lines and braces
  2, 1];

// GOOD
let arra = [1, 2];
let arrb = [
  1,
  2,
  2,
  1
];

// Function Signatures
// BAD
function func1(                   // Commas should end, not start lines
  param1             
, param2
) { }

function func1(param1, param2,    // Inconsistent break up on lines and braces
  param3, param4) {}

// GOOD
function funca(param1, param2) {}
function funcb(
  param1,
  param2,
  param3,
  param4
) { }


// Operator Separation
// BAD
let _x_ = a               // Operators should end, not start lines
        + b
        + c
        + d;

let _y_ = a               // Inconsistent break up of operators some start lines, some end lines
        + b +         
          c + d;

let _z_ = a + b +         // Inconsistent use of line-breaks each operator on a new line or none
          c + d;
// GOOD
let _u_ = a + b + c + d;
let _v_ = a +
          b +
          c +
          d;

// Method or Property Chains
// BAD
let prop1 = obj.            // Dot should appear at the beginning of a line for clarity of chaining
  val1.
  val2.
  val3.
  val4;

let prop2 = obj.val1.val2.  // Inconsistent use of line breaks
  .val3.val4;

obj.                        // Dot should appear at the beginning of a line for clarity of chaining
  func1().
  func2().
  func3();

obj.func1().func2().func3();// Chain too long on same line (greater than 2)

obj.func1().func2()         // Inconsistent use of line breaks
  .func3().func4();

// OK BUT NOT GOOD
obj                         // Object appears on the line by itself
  .func1()
  .func2()
  .func3();

// OK
obj.func1().func2()         // Chaining can occur with consistent breaks after 2nd chain
  .func3()
  .func4();

// GOOD
let propa = obj.val1.val2.val3.val4;
let propb = obj
  .val1
  .val2
  .val3
  .val4;

obj.func1().func2();        // Two chain can appear on same line

obj.func1()
  .func2()
  .func3()
  .func4();

// Block Usage
// BAD
// Stroustrup Formatting
if (foo) {
  bar();
}
else {
  baz();
}

try {
  fizz();
}
catch (err) {
  buzz();
}

// Allman Formatting
if (foo)
{
  bar();
}
else
{
  baz();
}

try
{
  fizz();
}
catch (err)
{
  buzz();
}

// GOOD
// One True Brace Formatting
if (foo) {
  bar();
} else {
  baz();
}

try {
  fizz();
} catch (err) {
  buzz();
}

// ... required blank line
// (eof)
```


## Variables and Variable Scoping
  * Variables should be scoped to the current block using `let` or `const`. `var` should not be used.
  * Variables should not shadowed by using identical names within a lower scope.
  * No redeclaration of Classes or restricted names.
  * No variable usage before variable definition.
  * No unused variables.
  * No self-assignment
  * No `undefined` assignment

```js
  // Variable Declaration
  // BAD
  var itr = 0;
  var arr = [];

  // GOOD
  let itr = 0;
  const arr = [];

  // Shadowing
  // BAD
  let itr = 0;
  while (arr.length === 0) {
    let itr = 0;            // Shadows `itr` in outer scope
  }

  // GOOD
  let itr = 0;
  while (arr.length === 0) {
    let tmp = 0;            
  }

  // No redeclaration of classes or restricted names
  // BAD
  let Object = 1;           // Restricted name
  class A {}
  A = 1;                    // Redeclaration of class

  // Variable use before definition
  // BAD
  a = 1;                    // This is valid code because of variable hoisting, but bad practice
  var a;

  // Self Assignment
  // BAD
  let foo = 1;
  foo = foo;

  // Undefined Assignment
  // BAD
  let foo = undefined;
```

## Best Practices
The following section contains best coding practices and design patterns.

  * Comments with `TODO`, `FIXME`, `NOTE` should be removed before pushing to production
  * Recommend that cyclomatic complexity is kept under 15
  * Require used of valid `typeof` comparisons
  * Require that consistent `return` values are given either always returning a value or never returning a value within a function.
  * Require a `default` case in `switch` blocks
  * No multi-line strings -- Use template literals instead
  * Require `this` to be aliased to `self` when context passing`
  * Require JSX Code to use Double-Quotes where possible
  * Require normal strings to use Single-Quotes where possible
  * Recommend code lines be less than 120 characters in length
  * No quoted properties unless it is necessary -- `var obj = { "a": 1 };`
  * Require shorthand assignment operators when possible -- `x += y;` instead of `x = x + 1;`
  * Require semicolons at line/statement ending
  * Require `super()` is called in the constructor of extended classes
  * Require `super()` is called before `this` in the constructor of extended classes
  * Require consistency with object literal shorthand, to either always or never use it within a project
  * Require arrow functions instead of long-form function declarations for callback functions
  * Recommend `const` is used in places where a variable is never reassigned
  * Recommend numeric literals in place of `parseInt()`
  * Recommend use of rest operator in place of `arguments`
  * Recommend use of spread operator in place of `apply()`
  * Recommend use of template literals in place of string concatenations
  * Require `yield` in generator functions
  * Require description when using `Symbol`

## Poor Design and Bad Syntax
  * No extra semicolons -- `a++;;`
  * No labels -- `gotoLabel:`
  * No expressions which do no alter execution state -- `0; {0}`
  * No `console` or `debugger` code lines in production code.
  * No `alert`, `confirm`, or `prompt` code lines in client-side code
  * No use of `eval` or implicit `eval` functionality including:
      * `setTimeout()` with a string parameter
      * `setInterval()` with a string parameter
      * `execScript()`
      * `new Function(...)`
      * `javascript:` URLs
  * No duplications of identities in:
      * function arguments in function signatures -- `function foo(a, b, a) { }`
      * keys in object literals -- `obj = { a: 1, a: 1 }`
      * cases in `switch` statements
      * class members -- `class Foo { bar() { }; bar() { }; }`
  * No Regular expression irregularities, including:
      * empty character class in Regular Expressions -- `/^abc[]/`
      * ASCII control characters in Regular Expressions -- `\x18`
      * invalid Regular Expressions
  * No useless escape characters in Strings, templates, and Regular Expressions -- `"\'"`, `'\"'`, `/\@/`, etc.
  * No unusual declarations, including:
      * variable declarations within `switch-case` blocks
      * function declarations within loops -- `for (let x = 0; x < 10; x++) { (function() { return x; })(); }`
      * `new Object` declarations -- use `{}` object literal
      * `new Symbol` declarations -- Symbol is not intended to be called as a constructor.
  * No unusual or problematic reassignments, including:
      * const reassignment -- `const a = 1; a = 2;`
      * exception reassignment in `catch` blocks -- `catch(err) { err = 1; }`
      * function reassignment -- `function foo() { }; foo = bar;`
  * No empty uncommented blocks, including:
      * empty functions without -- `function foo { }`
      * empty conditional or control blocks -- `if (foo) { }`
      * case fall-through -- `switch(x) { case a: doSomething(); case b: doSomething(); break; }`
  * No unmodified loop conditions -- `foo = true; while (foo) { /* foo never modified */ }`
  * No constant conditional structures -- `while (true) { }`
  * No unnecessary and inconsistent `if-else` control blocks, including:
      * lonely `if` statement inside of an `if` statement -- use `if` with compound comparison instead `if (a && b) { }`
      * lonely `if` statement inside of an `else` statement -- use `else if` instead
      * `else` statement after `if` statement with a `return` as the subsequent `else` statement is redundant
  * No `async` when `await` is missing
  * No use of `this` outside classes or class-like objects
  * No path concatenation with `__dirname` or `__filename` -- `let fullPath = __dirname + '/foo.js';` -- use `path.join(__dirname, ...);` instead

## Confusing Syntax and Gotchas
  * No confusing syntax, including:
      * `void` code lines -- this returns a true `undefined` which is no longer needed in ES6. The behavior is nuanced and may confuse a developer who is not familiar with its quirks.
      * absent parenthesis in `new <Class>` statements -- `new Person` -- It isn't entirely clear that the constructor is being called and isn't consistent.
      * `new require('')` declarations -- It isn't clear if the required code returns a constructor
      * Regular Expressions that looks like division -- `/=foo` -- use `/\=foo` instead
      * unsafe negotiations -- `-a + b` -- did the author mean `b - a` or `-(a + b)`?
      * confusing arrow function -- `var x = a => 1 ? 2 : 3;` did the author mean `function (a) { return 1 ? 2 : 3 };` or `var x = a >= 1 ? 2 : 3;`
      * `.call()` or `.apply()` code lines that do nothing -- `foo.call(undefined, 1,2, 3);` -- did the author intend this to do nothing?
  * No code which can cause unexpected behaviors, including:
      * unreachable code -- `function x() { return 1; let y = 1; }`
      * unsafe `finally` statements within `try-catch` block -- `finally { throw new Error; }`
      * `throw` of literal values -- `throw 1;` -- `Error` or an object should be thrown
  * No confusing comparison operations, including:
      * use of `==` and `!=` -- use `===` and `!==` instead
      * comparison of `NaN` -- uses `isNaN()` instead
      * comparisons for a literal `-0`
      * use of yoda conditions -- `if ('red' === color) { }`
      * extra boolean cast -- `if (Boolean(foo))`
      * unneeded ternary operators -- `let isYes = (answer === 1) ? true : false`
      * assignment operators in conditional structures -- `if (a = 1) { }`
  * No confusing assignment statements, including:
      * floating decimals -- `let [x, y, z] = [.5, 2., -.7]`
      * multi-assign statements -- `let a = b = c = 5;`
      * empty destructuring patterns -- `let {} = foo; let [] = bar`

## Deprecations
  * No `caller` or `callee` -- deprecated in ES5
  * No use of `__iterator__` -- was 3rd party library deprecated in favor of iterator functions in ES5/ES6
  * No use of `__proto__` -- removed in ES3.1
  * No `new Buffer` declarations -- deprecated in Node v5
  * No Octal literal numeral -- `let num = 071` -- deprecated in ES6. `let num = \o71` is okay though.
  * No Octal escapes in strings -- `let foo = '\251';` -- deprecated in ES6
