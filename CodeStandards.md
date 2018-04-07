 # Table of Contents

# Standards

# ESLint Rules
The ESLint configuration uses a modified version of the [`eslint:recommended`](https://eslint.org/docs/rules/)
ruleset. Where it is relevant, the rule will be highlighted as such. These rules can be found in the `.eslintrc.json`
file found in the root-level folder of the project.

Each rule will be presented with an example of the bad code that it is designed to prevent and rationale as to
why the pattern should be avoided.

## Syntax and Logic Errors
These rules relate to possible syntax errors or logical errors within the code.


### no-compare-neg-zero (error) [recommended]
Disallow comparing against -0

#### Rationale
`-0` is a distinct value in floating-point numbers from `+0`, comparisons against other floating-point numbers can
lead to unexpected behavior when comparing against `-0`. That is, code like `x === -0` will pass for both `+0` and `-0`.
**Note**: Normal ECMAScript comparison operations treat `+0` and `-0` identically, and floating points operations
generally do not create `-0` results. However, the ECMAScript `Math` library can.

#### 👎 Bad code
```js
if (x === -0) {
  // Do something...
}
```

#### 👍 Good code
```js
if (x === 0) {
  // Do something...
}
```

```js
// Compare for floating-point neg-zero
if (Object.is(x, -0)) {
  // Do something...
}
```


### no-cond-assign (error) [recommended]
Disallow assignment operators in conditional expressions in `if`, `for`, `while`, and `do...while` statements.

#### Rationale
In conditional statements, it is very easy to mistype a comparison operator (such as `==`) as an assignment operator
(such as `=`). There are valid reasons to use assignment operators in conditional statements; however, it can be
difficult to tell whether a specific assignment was intentional, leading to code which is more difficult to maintain.

#### 👎 Bad code
```js
// Check the user's job title
if (user.jobTitle = 'manager') {
  // user.jobTitle is now incorrect
}
```

#### 👍 Good code
```js
// Check the user's job title
if (user.jobTitle === 'manager') {
  // do something...
}
```


### no-console (warn)
Disallow the use of `console`

#### Rationale
In JavaScript that is designed to be used in browsers or as middleware layers, it is considered a best practice to
avoid using methods on `console`. Such messages are considered to be for debugging purposes and therefore are not
suitable to ship to the client. In general, calls using `console` should be stripped or converted to logging
operations before being pushed to production. This rule is configured as a ***warning*** because command line tools will
require the use of `console` and in mixed development environments this is unavoidable in a codebase.

#### 👎 Bad code
```js
console.log('Info');
console.warn('Warning');
console.error('Error');
```


### no-constant-condition (error) [recommended]
Disallow constant expression in conditions in `if`, `for`, `while`, `do...while`, and ternary (e.g `?:`) statements

#### Rationale
Constant expressions as test conditions may be typos or a development trigger for a specific behavior. It is
difficult to determine the intention of the code author and the code can be simplified. Additionally, such code is
not ready for production and should generally be avoided.

#### 👎 Bad code
```js
if (false) {
  doSomethingUnfinished();
}

if (void x) {
  doSomethingUnfinished();
}

for (;-2;) {
  doSomethingForever();
}

while (typeof x) {
  doSomethingForever();
}

do {
  doSomethingForever();
} while (x = -1);

var result = 0 ? a : b;
```


### no-control-regex (warn)
Disallow control characters in regular expressions.

#### Rationale
Control characters are special, invisible characters in the ASCII range 0-31. These characters are rarely used in
JavaScript strings, so a regular expression containing these characters is most likely a mistake and generally lead to
difficult to read code. This is a warning, because there are times when this type of regular expression is still
necessary.

#### 👎 Bad code
```js
let pattern1 = /\x1f/;
let pattern2 = new RegExp('\x1f');
```

#### 👍 Good code
```js
let pattern1 = /\x20/;
let pattern2 = new RegExp('\x20');
```


### no-debugger (error) [recommended]
Disallow the use of debugger.

#### Rationale
The `debugger` statement is used to tell the executing JavaScript environment to stop execution and open the debugger at
the current point in the code. This is considered bad practice as it leads to code which is not production ready and
modern development and debugging tools are now available which renders such behaviors obsolete.

#### 👎 Bad code
```js
function isTruthy(x) {
  debugger;
  return Boolean(x);
}
```

#### 👍 Good code
```js
function isTruthy(x) {
  return Boolean(x); // set a breakpoint at this line
}
```


### no-dupe-args (error) [recommended]
Disallow duplicate arguments in function definitions. It does not apply to arrow functions or class methods, because the
JavaScript parser reports these as errors.

#### Rationale
If more than one parameter has the same name in a function definition, the last occurrence “shadows” the preceding
occurrences. A duplicated name might be a typing error. This can result in unexpected behaviors and code that is
difficult to maintain.

#### 👎 Bad code
```js
function foo(a, b, a) {
  console.log('value of the second a:', a);
}

var bar = function (a, b, a) {
  console.log('value of the second a:', a);
};
```

#### 👍 Good code
```js
function foo(a, b, c) {
  console.log(a, b, c);
}

let bar = function (a, b, c) {
  console.log(a, b, c);
};
```


### no-dupe-keys (error) [recommended]
Disallow duplicate keys in object literals.

#### Rationale
Multiple properties with the same key in object literals can cause unexpected behavior and code that is difficult to
maintain.

#### 👎 Bad code
```js
let foo = {
  bar: 'baz',
  bar: 'qux'
};

let foo = {
  'bar': 'baz',
  bar: 'qux'
};

let foo = {
  0x1: 'baz',
  1: 'qux'
};
```

#### 👍 Good code
```js
let foo = {
  bar: 'baz',
  quxx: 'qux'
};
```


### no-duplicate-case (error) [recommended]
Disallow duplicate case labels.

#### Rationale
If a `switch` statement has duplicate test expressions in `case` clauses, then it is likely that a programmer copied a
`case` clause but forgot to change the test expression. Additionally, the duplicated case will never be reached,
leading to possible unexpected behavior.

#### 👎 Bad code
```js
var a = 1,
  one = 1;

switch (a) {
  case 1:
    break;
  case 2:
    break;
  case 1:         // duplicate test expression
    break;
  default:
    break;
}
```


### no-empty (error)
Disallow empty block statements. This rule ignores block statements which contain a comment such as `catch` or `finally`
blocks within a `try` statement. This rule is configured to ignore empty `catch` blocks.

#### Rationale
Empty block statements, while not technically errors, usually occur due to refactoring that wasn’t completed. They can
cause confusion when reading code.

#### 👎 Bad code
```js
if (foo) {
}

while (foo) {
}

switch(foo) {
}

try {
  doSomething();
} catch(ex) {
  // Ignored
} finally {
}
```


### no-empty-character-class (error) [recommended]
Disallow empty character classes in regular expressions

#### Rationale
Because empty character classes in regular expressions do not match anything, they usually indicate typing mistakes.

#### 👎 Bad code
```js
let foo = /^abc[]/;
```

#### 👍 Good code
```js
let foo = /^abc[d-z]/;
let bar = /^[abc]/;
let baz = /^abc/;
```


### no-ex-assign (error) [recommended]
Disallow reassigning exceptions in `catch` clauses.

#### Rationale
If a `catch` clause in a `try` statement accidentally (or purposely) assigns another value to the exception parameter,
it becomes impossible to refer to the error from that point on. Since there is no arguments object to offer alternative
access to this data, such an assignment of the parameter is absolutely destructive.

#### 👎 Bad code
```js
try {
    // code
} catch (e) {
  e = 10;
}
```

#### 👍 Good code
```js
try {
  // code
} catch (e) {
  let foo = 10;
}
```


### no-extra-boolean-cast (error) [recommended]
Disallow unnecessary boolean casts.

#### Rationale
In contexts such as an `if` statement’s test where the result of the expression will already be coerced to a Boolean,
casting to a Boolean via double negation (`!!`) or a `Boolean` call is unnecessary and confusing.

#### 👎 Bad code
```js
if (!!foo) {
  // ...
}

if (Boolean(foo)) {
  // ...
}
```

#### 👍 Good code
```js
if (foo) {
  // ...
}
```


### no-extra-semi (error) [recommended]
Disallow unnecessary semicolons

#### Rationale
Typing mistakes and misunderstandings about where semicolons are required can lead to semicolons that are unnecessary.
While not technically an error, extra semicolons can cause confusion when reading code.

#### 👎 Bad code
```js
let x = 5;;

function foo() {
  // code
};
```

#### 👍 Good code
```js
let x = 5;

function foo() {
  // code
}
```


### no-func-assign (error) [recommended]
Disallow reassigning function declarations.

#### Rationale
JavaScript functions can be written as a Function Declaration `function foo() { ... }` or as a FunctionExpression
`let foo = function() { ... };`. While a JavaScript interpreter might tolerate it, overwriting/reassigning a function
written as a Function Declaration is often indicative of a mistake or issue, and is confusing to read.

#### 👎 Bad code
```js
function foo() {}
foo = bar;

function foo() {
  foo = bar;
}
```


### no-inner-declarations (error) [recommended]
Disallow variable or function declarations in nested blocks.

#### Rationale
In JavaScript, prior to ES6, a function declaration is only allowed in the first level of a program or the body of
another function, though parsers sometimes erroneously accept them elsewhere. This only applies to function
declarations; named or anonymous function expressions can occur anywhere an expression is permitted.

A variable declaration (`var`) is permitted anywhere a statement can go, even nested deeply inside other blocks. This is
often undesirable due to variable hoisting, and moving declarations to the root of the program or function body can
increase clarity. Note that block bindings (`let`, `const`) are not hoisted and therefore they are not affected by this
rule.

#### 👍👎 Pre-ES6 Example code
```js
// Good
function doSomething() { }

// Bad
if (test) {
  function doSomethingElse () { }
}

function anotherThing() {
  var fn;

  if (test) {
    // Good
    fn = function expression() { };

    // Bad
    function declaration() { }
  }
}
```

#### 👍👎 Variable Hoisting Example code
```js
// Good
var foo = 42;

// Good
if (foo) {
  let bar1;
}

// Bad
while (test) {
  var bar2;
}

function doSomething() {
  // Good
  var baz = true;

  // Bad
  if (baz) {
    var quux;
  }
}
```


### no-invalid-regexp (error) [recommended]
Disallow invalid regular expression strings in RegExp constructors.

#### Rationale
An invalid pattern in a regular expression literal is a `SyntaxError` when the code is parsed, but an invalid string in
`RegExp` constructors throws a `SyntaxError` only when the code is executed. This rule ensures that no invalid code
will be executed.

#### 👎 Bad code
```js
RegExp('[')

RegExp('.', 'z')

new RegExp('\\')
```

#### 👍 Good code
```js
RegExp('.')

new RegExp
```


### no-irregular-whitespace (error) [recommended]
Disallow irregular whitespace outside of strings and comments. This rule disallows the following characters:
```
\u000B - Line Tabulation (\v) - <VT>
\u000C - Form Feed (\f) - <FF>
\u00A0 - No-Break Space - <NBSP>
\u0085 - Next Line
\u1680 - Ogham Space Mark
\u180E - Mongolian Vowel Separator - <MVS>
\ufeff - Zero Width No-Break Space - <BOM>
\u2000 - En Quad
\u2001 - Em Quad
\u2002 - En Space - <ENSP>
\u2003 - Em Space - <EMSP>
\u2004 - Tree-Per-Em
\u2005 - Four-Per-Em
\u2006 - Six-Per-Em
\u2007 - Figure Space
\u2008 - Punctuation Space - <PUNCSP>
\u2009 - Thin Space
\u200A - Hair Space
\u200B - Zero Width Space - <ZWSP>
\u2028 - Line Separator
\u2029 - Paragraph Separator
\u202F - Narrow No-Break Space
\u205f - Medium Mathematical Space
\u3000 - Ideographic Space
```

#### Rationale
Invalid or irregular whitespace causes issues with ECMAScript 5 parsers and also makes code harder to debug in a similar
nature to mixed tabs and spaces.

Various whitespace characters can be inputted by programmers by mistake for example from copying or keyboard shortcuts.
Pressing Alt + Space on OS X adds in a non breaking space character for example.

Known issues these spaces cause:

  * Zero Width Space
      * Is NOT considered a separator for tokens and is often parsed as an Unexpected token ILLEGAL
      * Is NOT shown in modern browsers making code repository software expected to resolve the visualisation
  * Line Separator
      * Is NOT a valid character within JSON which would cause parse errors


### no-obj-calls (error) [recommended]
Disallow calling global object properties (`Math`, `JSON`, and `Reflect`) as functions.

#### Rationale
ECMAScript provides several global objects that are intended to be used as-is. Some of these objects look as if they
could be constructors due their capitalization (such as `Math`, `JSON`, and `Reflect`) but will throw an error if you
try to execute them as functions.

#### 👎 Bad code
```js
var math = Math();
var json = JSON();
var reflect = Reflect();
```

#### 👍 Good code
```js
function area(r) {
  return Math.PI * r * r;
}
var object = JSON.parse('{}');
var value = Reflect.get({ x: 1, y: 2 }, 'x');
```


### no-regex-spaces (error) [recommended]
Disallow multiple spaces in regular expressions

#### Rationale
Regular expressions can be very complex and difficult to understand, which is why it’s important to keep them as simple
as possible in order to avoid mistakes. One of the more error-prone things you can do with a regular expression is to
use more than one space.

#### 👎 Bad code
```js
var re = /foo       bar/; // How many spaces are intended to be matched here?
```

#### 👍 Good code
```js
var re = /foo {7}bar/;    // Clear indication on the number of spaces to match
```


### no-sparse-arrays (error) [recommended]
Disallow sparse arrays

#### Rationale
A sparse array contains empty slots, most frequently due to multiple commas being used in an array literal. For Example:
```
var items = [,,];
```
While the `items` array in this example has a `length` of 2, there are actually no values indices 0 and 1. The fact that
the array literal is valid with only commas inside, coupled with the length being set and actual item values not being
set, make sparse arrays confusing for many developers and prone to logic errors. Additionally, these are often an
indication that there is an unintended syntax error in the code.

#### 👎 Bad code
```js
var colors = [ 'red',, 'blue' ];    // Did the developer intend for this array to have length 3, or is it a typo?
```

#### 👍 Good code
```js
var colors = [ 'red', 'blue' ];
```


### no-unreachable (error) [recommended]
Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements

#### Rationale
Because the `return`, `throw`, `break`, and `continue` statements unconditionally exit a block of code, any statements
after them cannot be executed. Unreachable statements are usually a mistake.

#### 👎 Bad code
```js
function fn() {
  x = 1;
  return x;
  x = 3;      // this will never execute
}
```


### no-unsafe-finally (error) [recommended]
Disallow control flow statements in `finally` blocks

#### Rationale
JavaScript suspends the control flow statements of `try` and `catch` blocks until the execution of `finally` block
finishes. So, when `return`, `throw`, `break`, or `continue` are used in `finally`, control flow statements inside `try`
and `catch` are overwritten, which is considered as unexpected behavior.

#### 👎 Bad code
```js
let foo = function() {
  try {
    return 1;
  } catch(err) {
    return 2;
  } finally {
    return 3;
  }
};

let bar = function() {
  try {
    return 1;
  } catch(err) {
    return 2;
  } finally {
    throw new Error;
  }
}
```

#### 👍 Good code
```js
let foo = function() {
  try {
    return 1;
  } catch(err) {
    return 2;
  } finally {
    console.log('hola!');
  }
};
```


### no-unsafe-negation (error) [recommended]
Disallow negating the left operand of relational operators

#### Rationale
Just as developers might type `-a + b` when they mean `-(a + b)` for the negative of a sum, they might type
`!key in object` by mistake when they almost certainly mean `!(key in object)` to test that a key is not in an object.
`!obj instanceof Ctor` is similar. Such code can be confusing to read and may lead to unintended logic.

#### 👎 Bad code
```js
if (!key in object) {
  // operator precedence makes it equivalent to (!key) in object
  // and type conversion makes it equivalent to (key ? 'false' : 'true') in object
}

if (!obj instanceof Ctor) {
  // operator precedence makes it equivalent to (!obj) instanceof Ctor
  // and it equivalent to always false since boolean values are not objects.
}
```

#### 👍 Good code
```js
if (!(key in object)) {
  // key is not in object
}

if (!(obj instanceof Ctor)) {
  // obj is not an instance of Ctor
}
```


### use-isnan (error) [recommended]
Require calls to isNaN() when checking for NaN

#### Rationale
In JavaScript, `NaN` is a special value of the `Number` type. It’s used to represent any of the “not-a-number” values
represented by the double-precision 64-bit format as specified by the IEEE Standard for Binary Floating-Point Arithmetic.

Because `NaN` is unique in JavaScript by not being equal to anything, including itself, the results of comparisons to
`NaN` are confusing:

  * `NaN === NaN` or `NaN == NaN` evaluate to false
  * `NaN !== NaN` or `NaN != NaN` evaluate to true

Therefore, use `Number.isNaN()` or global `isNaN()` functions to test whether a value is `NaN` leads to consistent and
readable code.

#### 👎 Bad code
```js
if (foo == NaN) {
  // ...
}

if (foo != NaN) {
  // ...
}
```

#### 👍 Good code
```js
if (isNaN(foo)) {
  // ...
}

if (!isNaN(foo)) {
  // ...
}
```


### valid-typeof  (error) [recommended]
Enforce comparing `typeof` expressions against valid strings.

#### Rationale
For a vast majority of use cases, the result of the `typeof` operator is one of the following string literals:
`'undefined'`, `'object'`, `'boolean'`, `'number'`, `'string'`, `'function'`, and `'symbol'`. It is usually a typing
mistake to compare the result of a `typeof` operator to other string literals.

#### 👎 Bad code
```js
typeof foo === 'strnig'
typeof foo == 'undefimed'
typeof bar != 'nunber'
typeof bar !== 'fucntion'
```

#### 👍 Good code
```js
typeof foo === 'string'
typeof bar == 'undefined'
typeof foo === baz
typeof bar === typeof qux
```



## Best Practices
These rules enforce coding Best Practices.


### block-scoped-var (warn)
Treat `var` as Block Scoped and report a warning when it is used in a potentially inconsistent way.

#### Rationale
This rule aims to reduce the usage of variables outside of their binding context and emulate traditional block scope
from other languages. This is to help newcomers to the language avoid difficult bugs with variable hoisting.

#### 👎 Bad code
```js
function doIf() {
  if (true) {
    var build = true;   // Hoisted variable 'build' to outside block scope
  }
  console.log(build);   // This works because 'build' was hoisted, although this may not be intended
}

function doIfElse() {
  if (true) {
    var build = true;   // Hoisted variable 'build' to outside block scope
  } else {
    var build = false;  // Hoisted variable 'build' to outside block scope
  }
}

function doTryCatch() {
  try {
    var build = 1;  // Hoisted variable 'build' to outside block scope
  } catch (e) {
    var f = build;  // Hoisted variable 'f' to outside block scope
  }
}
```

#### 👍 Good code
```js
// This code is functionally identical but clearer in its intentions
function doIf() {
  var build;

  if (true) {
    build = true;
  }

  console.log(build);
}

function doIfElse() {
  var build;

  if (true) {
    build = true;
  } else {
    build = false;
  }
}

function doTryCatch() {
  var build;
  var f;

  try {
    build = 1;
  } catch (e) {
    f = build;
  }
}
```


### complexity (warn)
Limit Cyclomatic Complexity -- the number of paths through a block of source code. This is set to 15.

#### Rationale
This rule is aimed at reducing code complexity by capping the amount of cyclomatic complexity allowed in a program. As
such, it will warn when the cyclomatic complexity crosses the configured threshold.  High complexity is generally an
indication that a code block should be split into smaller function blocks; however, this is set as a warning with a
threshold of 15, as there are some unavoidable blocks, such as dense `switch` statements, where high complexity is
unavoidable.

#### 👎 Bad code (Complexity set to 2)
```js
/*eslint complexity: ['error', 2]*/

function a(x) {
  if (true) {
    return x;       // 1st Path
  } else if (false) {
    return x+1;     // 2nd Path
  } else {
    return 4;       // 3rd path
  }
}
```

#### 👍 Good code
```js
/*eslint complexity: ['error', 2]*/

function a(x) {
  if (true) {
    return x;
  } else {
    return 4;
  }
}
```


### consistent-return (warn)
Require `return` statements to consistently always or never specify values within a function block.

#### Rationale
Unlike statically-typed languages which enforce that a function returns a specified type of value, JavaScript allows
different code paths in a function to return different types of values.

A confusing aspect of JavaScript is that a function returns `undefined` if any of the following are true:

  * it does not execute a `return` statement before it exits
  * it executes `return` which does not specify a value explicitly
  * it executes `return undefined`
  * it executes `return void` followed by an expression (for example, a function call)
  * it executes `return` followed by any other expression which evaluates to `undefined`

If any code paths in a function return a value explicitly but some code path do not return a value explicitly, it might
be a typing mistake, especially in a large function.

#### 👎 Bad code
```js
function doSomething(condition) {
  if (condition) {
    return true;    // Value returned
  } else {
    return;         // No value returned
  }
}
```

#### 👍 Good code
```js
function doSomething(condition) {
  if (condition) {
    return true;        // Value returned
  } else {
    return undefined;   // Undefined value explicitly provided
  }
}

function doSomethingElse(condition) {
  if (condition) {
    return true;        // Value returned
  } else {
    return false;       // Value returned
  }
}
```


### curly (error)
Require following Curly Brace Conventions

#### Rationale
JavaScript allows the omission of curly braces when a block contains only one statement. However, it is considered by
many to be best practice to never omit curly braces around blocks, even when they are optional, because it can lead to
bugs and reduces code clarity.  All code blocks require curly braces.

#### 👎 Bad code
```js
if (foo) foo++;
```

#### 👍 Good code
```js
if (foo) {
    foo++;
}
```


### default-case (error)
Require Default Case in Switch Statements

#### Rationale
The thinking is that it’s better to always explicitly state what the `default` behavior should be, even when it is no
behavior, so that it’s clear as to whether or not the developer forgot to include the default behavior by mistake.
When the `default` case is empty, a comment is recommended.

#### 👎 Bad code
```js
switch (foo) {
  case 1:
    doSomething();
    break;

  case 2:
    doSomething();
    break;

  // No default
}
```

#### 👍 Good code
```js
switch (foo) {
  case 1:
    doSomething();
    break;

  case 2:
    doSomething();
    break;

  default:
    // Do nothing
    break;
}
```

### dot-location (error)
Enforce newline consistency before or after dot when a newline is used.

#### Rationale
JavaScript allows you to place newlines before or after a dot in a member expression. Consistency in placing a newline
before (property-side) or after (object-side) the dot can greatly increase readability.  New lines are not required,
but when they are included this rule is configured to enforce property-side dots.

#### 👎 Bad code
```js
var foo = object.
  property;
```

#### 👍 Good code
```js
var foo = object
  .property;
```


### dot-notation (error)
Require Dot Notation

#### Rationale
In JavaScript, one can access properties using the dot notation (`foo.bar`) or square-bracket notation (`foo['bar']`).
However, the dot notation is often preferred because it is easier to read, less verbose, and works better with
aggressive JavaScript minimizers.  This rule is aimed at maintaining code consistency and improving code readability by
encouraging use of the dot notation style whenever possible.

#### 👎 Bad code
```js
var x = foo['bar'];
```

#### 👍 Good code
```js
var x = foo.bar;
var y = foo[bar];    // Property name is a variable, square-bracket notation required
```


### eqeqeq (error)
Require `===` and `!==`

#### Rationale
Because of type coercion and its unintended side-effects, it is considered good practice to use the type-safe equality
operators `===` and `!==` instead of their regular counterparts `==` and `!=`.

The reason for this is that `==` and `!=` do type coercion which follows the rather obscure
[Abstract Equality Comparison Algorithm](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3). For instance, the
following statements are all considered `true`:

  * `[] == false`
  * `[] == ![]`
  * `3 == '03'`

If one of those occurs in an innocent-looking statement such as `a == b` the actual problem is very difficult to spot.

#### 👎 Bad code
```js
if (x == 42) { }

if ('' == text) { }

if (obj.getStuff() != undefined) { }
```


### guard-for-in (warn)
Require Guarding for-in

#### Rationale
Looping over objects with a `for...in` loop will include properties that are inherited through the prototype chain. This
behavior can lead to unexpected items in your for loop. This rule is aimed at preventing unexpected behavior that could
arise from using a `for...in` loop without filtering the results in the loop. As such, it will warn when for in loops do
not filter their results with an if statement.

#### 👎 Bad code
```js
for (key in foo) {
  doSomething(key);
}
```

#### 👍 Good code
```js
for (key in foo) {
  if (Object.prototype.hasOwnProperty.call(foo, key)) {
    doSomething(key);
  }
}
```


### no-alert (warn)
Disallow Use of Alert

#### Rationale
JavaScript’s `alert`, `confirm`, and `prompt` functions are widely considered to be obtrusive as UI elements and should
be replaced by a more appropriate custom UI implementation. Furthermore, `alert` is often used while debugging code,
which should be removed before deployment to production.  This rule is aimed at catching debugging code that should be
removed and replaced with less obtrusive, custom UIs.

#### 👎 Bad code
```js
alert('here!');
confirm('Are you sure?');
prompt('What\'s your name?', 'John Doe');
```


### no-caller (error)
Disallow Use of `caller` and `callee`.

#### Rationale
The use of `arguments.caller` and `arguments.callee` make several code optimizations impossible and are deprecated.
Further, their use is forbidden in ES5 `strict` mode.

#### 👎 Bad code
```js
function foo(n) {
  if (n <= 0) {
    return;
  }

  arguments.callee(n - 1);
}

[1,2,3,4,5].map(function(n) {
  return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
});
```

#### 👍 Good code
```js
function foo(n) {
  if (n <= 0) {
    return;
  }

  foo(n - 1);
}

[1,2,3,4,5].map(function factorial(n) {
  return !(n > 1) ? 1 : factorial(n - 1) * n;
});
```


### no-case-declarations (error) [recommended]
Disallow lexical declarations in case/default clauses

#### Rationale
This rule disallows lexical declarations (`let`, `const`, `function` and `class`) in `case`/`default` clauses. The
reason is that the lexical declaration are visible in the entire `switch` block but are only initialized when they are
assigned, which will only happen if the case where it is defined is reached. This rule aims to prevent access to
uninitialized lexical bindings as well as accessing hoisted functions across case clauses.

To ensure that the lexical declaration only applies to the current case, it is recommended to wrap your clauses in
blocks.

#### 👎 Bad code
```js
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {}
    break;
  default:
    class C {}
}
```

#### 👍 Good code
```js
// Declarations outside switch-statements are valid
const a = 0;

switch (foo) {
  // The following case clauses are wrapped into blocks using brackets
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {}
    break;
  }
  case 4:
    // Declarations using var without brackets are valid due to function-scope hoisting
    var z = 4;
    break;
  default: {
    class C {}
  }
}
```


### no-div-regex (warn)
Disallow Regexs That Look Like Division

#### Rationale
This is used to disambiguate the division operator to not confuse users.

#### 👎 Bad code
```js
return /=foo/;
```

#### 👍 Good code
```js
return /\=foo/;
```


### no-else-return (warn)
Disallow return before else

#### Rationale
If an `if` block contains a `return` statement, the `else` block becomes unnecessary. Its contents can be placed outside
of the block. This is aimed at code consistency and brevity.

#### 👎 Bad code
```js
function foo() {
  if (x) {
    return y;
  } else {
    // Any Code here is unnecessary
    doSomething();
  }
}
```

#### 👍 Good code
```js
function foo() {
  if (x) {
    return y;
  }
  // Else statement removed
  doSomething();
}
```


### no-empty-function (error)
Disallow empty functions

#### Rationale
Empty functions can reduce readability because readers need to guess whether it’s intentional or not. So writing a clear
comment for empty functions is a good practice. This rule will pass empty functions where there is a clear comment
indicating that the empty function is intended. This rule is also configured to ignore constructors and arrow functions.

#### 👎 Bad code
```js
function foo() {}

var foo = function() {};
// etc.
```

#### 👍 Good code
```js
function foo() {
  // Do nothing...
}

var foo = function() {
  // Do nothing...
};

// Empty Arror Function Okay
var foo = (() => {});

// Empty constructor Okay
class T {
  constructor() {}
}
```


### no-empty-pattern (error) [recommended]
Disallow empty destructuring patterns

#### Rationale
When using destructuring, it’s possible to create a pattern that has no effect. This happens when empty curly braces are
used to the right of an embedded object destructuring pattern. In many cases, an empty object pattern is a mistake where
the author intended to use a default value instead. This rule aims to flag any empty patterns in destructured objects
and arrays.

#### 👎 Bad code
```js
var {} = foo;
var [] = foo;
var {a: {}} = foo;
var {a: []} = foo;
function foo({}) {}
function foo([]) {}
function foo({a: {}}) {}
function foo({a: []}) {}
```

#### 👍 Good code
```js
var {a = {}} = foo;
var {a = []} = foo;
function foo({a = {}}) {}
function foo({a = []}) {}
```


### no-eval (warn)
Disallow `eval()`

#### Rationale
JavaScript’s eval() function is potentially dangerous and is often misused. Using `eval()` on untrusted code can open a
program up to several different injection attacks. The use of `eval()` in most contexts can be substituted for a better,
alternative approach to a problem. This rule is aimed at preventing potentially dangerous, unnecessary, and slow code by
disallowing the use of the `eval()` function.

#### 👎 Bad code
```js
var obj = { x: 'foo' },
  key = 'x',
  value = eval('obj.' + key);

(0, eval)('var a = 0');

var foo = eval;   // Attempting to alias 'eval' to 'foo'
foo('var a = 0');

// This `this` is the global object.
this.eval('var a = 0');
```

#### 👍 Good code
```js
var obj = { x: 'foo' },
  key = 'x',
  value = obj[key];

class A {
  foo() {
    // This is a user-defined method.
    this.eval('var a = 0');
  }

  eval() {
    // Does nothing...
  }
}
```


### no-extra-label (error)
Disallow Unnecessary Labels

#### Rationale
If a loop contains no nested loops or switches, labeling the loop is unnecessary.  You can achieve the same result by
removing the label and using `break` or `continue` without a label. Such labels are confusing because there is an
expectation that the label is used to jump further ahead or behind in the code.  This rule is aimed at the removal of
labels in general.

#### 👎 Bad code
```js
A: while (a) {
  break A;
}

B: for (let i = 0; i < 10; ++i) {
  break B;
}

C: switch (a) {
  case 0:
    break C;
}
```

#### 👍 Good code
```js
while (a) {
  break;
}

for (let i = 0; i < 10; ++i) {
  break;
}

switch (a) {
  case 0:
    break;
}
```


### no-fallthrough (error) [recommended]
Disallow Case Statement Fallthrough without additional comments.

#### Rationale
The switch statement in JavaScript is one of the more error-prone constructs of the language thanks in part to the
ability to “fall through” from one case to the next. This rule is aimed at eliminating unintentional fallthrough of one
case to the other. As such, it flags any fallthrough scenarios that are not marked by a comment. Flow control Statements
(`return`, `throw`, `break`) all prevent fallthrough and are not flagged.

#### 👎 Bad code
```js
switch(foo) {
  case 1:
    doSomething();    // Notice the lack of `break` statment
  case 2:
    doSomething();
}
```

#### 👍 Good code
```js
switch(foo) {
  case 1:
    doSomething();    
    // Intentional Fallthrough
  case 2:
    doSomething();
    break;
}
```


### no-floating-decimal (error)
Disallow Floating Decimals

#### Rationale
Float values in JavaScript contain a decimal point, and there is no requirement that the decimal point be preceded or
followed by a number. Although not a syntax error, this format for numbers can make it difficult to distinguish between
true decimal numbers and the dot operator. For this reason, it is recommended that you should always include a number
before and after a decimal point to make it clear the intent is to create a decimal number.  

#### 👎 Bad code
```js
var num = .5;
var num = 2.;
var num = -.7;
```

#### 👍 Good code
```js
var num = 0.5;
var num = 2.0;
var num = -0.7;
```


### no-global-assign (error) [recommended]
Disallow assignment to native objects or read-only global variables

#### Rationale
JavaScript environments contain a number of built-in global variables, such as `window` in browsers and `process` in
Node.js. In almost all cases, you don’t want to assign a value to these global variables as doing so could result in
losing access to important functionality. This rule disallows modifications to read-only global variables which are
configured based on the ESLint environment (`env`) -- `node`, `es6`, and `mocha`.

#### 👎 Bad code
```js
Object = null;
undefined = 1;
```


### no-implied-eval (error)
Disallow Implied `eval()`

#### Rationale
It’s considered a good practice to avoid using `eval()` in JavaScript. There are security and performance implications
involved with doing so, which is why many linters (including ESLint) recommend disallowing `eval()`. However, there are
some other ways to pass a string and have it interpreted as JavaScript code that have similar concerns.

Using `setTimeout()`, `setInterval()`, or `execScript()` (Internet Explorer only), which can accept a string of
JavaScript code as their first argument is considered an implied `eval()` because the string of JavaScript code is
passed to the interpreter.  It is recommended that a function always be passed as the first argument to these.

#### 👎 Bad code
```js
setTimeout('alert('Hi!');', 100);

setInterval('alert('Hi!');', 100);

execScript('alert('Hi!')');

window.setTimeout('count = 5', 10);

window.setInterval('foo = bar', 10);
```

#### 👍 Good code
```js
setTimeout(function() {
  alert('Hi!');
}, 100);

setInterval(function() {
  alert('Hi!');
}, 100);
```


### no-invalid-this (error)
Disallow this keywords outside of classes or class-like objects.

#### Rationale
Under the strict mode, `this` keywords outside of classes or class-like objects might be `undefined` and raise a
`TypeError`. This rule aims to flag usage of this keywords outside of classes or class-like objects.

#### 👎 Bad code
```js
'use strict';

this.a = 0;
baz(() => this);

(function() {
    this.a = 0;
    baz(() => this);
})();
```

#### 👍 Good code
```js
'use strict';

function Foo() {
    // OK, this is in a legacy style constructor.
    this.a = 0;
    baz(() => this);
}

class Foo {
    constructor() {
        // OK, this is in a constructor.
        this.a = 0;
        baz(() => this);
    }
}
```


### no-iterator (error)
Disallow Iterator

#### Rationale
The `__iterator__` property was a SpiderMonkey extension to JavaScript that could be used to create custom iterators
that are compatible with JavaScript’s `for...in` and `for...each` constructs. However, this property is now obsolete,
so it should not be used. Instead, [ES6 iterators and generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
should be used.

#### 👎 Bad code
```js
Foo.prototype.__iterator__ = function() {
    return new FooIterator(this);
};

foo.__iterator__ = function () {};

foo['__iterator__'] = function () {};
```

#### 👍 Good code
```js
// Additional exmaples -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
function Foo(array) {
  var nextIndex = 0;

  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {done: true};
    }
  };
}
```


### no-labels (error)
Disallow Labeled Statements

#### Rationale
Labeled statements in JavaScript are used in conjunction with break and continue to control flow around multiple loops.
While convenient in some cases, labels tend to be used only rarely and are frowned upon by some as a remedial form of
flow control that is more error prone and harder to understand. This rule aims to eliminate the use of labeled
statements in JavaScript. It will warn whenever a labeled statement is encountered and whenever `break` or `continue`
are used with a label.

#### 👎 Bad code
```js
label:
  while(true) {
    // ...
  }

label:
  while(true) {
    break label;
  }

label:
  while(true) {
    continue label;
  }

label:
  switch (a) {
    case 0:
      break label;
  }

label:
  {
    break label;
  }

label:
  if (a) {
    break label;
  }
```

#### 👍 Good code
```js
var f = {
  label: 'foo'
};

while (true) {
  break;
}

while (true) {
  continue;
}
```


### no-lone-blocks (error)
Disallow Unnecessary Nested Blocks

#### Rationale
In JavaScript, prior to ES6, standalone code blocks delimited by curly braces do not create a new scope and have no use.
In ES6, code blocks may create a new scope if a block-level binding (let and const), a class declaration or a function
declaration (in strict mode) are present. A block is not considered redundant in these cases. This rule aims to
eliminate unnecessary and potentially confusing blocks at the top level of a script or within other blocks.

#### 👎 Bad code
```js
{}

if (foo) {
  bar();
  {
    baz();
  }
}

function bar() {
  {
    baz();
  }
}
```

#### 👍 Good code
```js
if (foo) {
  if (bar) {
    baz();
  }
}

function bar() {
  baz();
}
```


### no-loop-func (warn)
Disallow function declarations within loops

#### Rationale
Writing functions within loops tends to result in errors due to the way the function creates a closure around the loop.
This warning is raised to highlight a piece of code that may not work as expected and to indicate a potential
misunderstanding of how the language works. Code may run without any problems, but may also behave unexpectedly.

#### 👎 Bad code
```js
for (var i=10; i; i--) {
  (function() { return i; })();
}

while(i) {
  var a = function() { return i; };
  a();
}
```

#### 👍 Good code
```js
var a = function() {};

for (var i=10; i; i--) {
    a();
}
```


### no-multi-spaces (error)
Disallow multiple spaces

#### Rationale
Multiple spaces in a row that are not used for indentation are typically mistakes. Inconsistent spacing can lead to
code which is difficult to read. This rule aims to disallow multiple whitespace around logical expressions, conditional
expressions, declarations, array elements, object properties, sequences and function parameters. This rule can be
used to automatically correct spacing with the `fix` option.

#### 👎 Bad code
```js
var a =  1;

if(foo   === 'bar') {}

a <<  b

var arr = [1,  2];

a ?  b: c
```

#### 👍 Good code
```js
var a = 1;

if(foo === 'bar') {}

a << b

var arr = [1, 2];

a ? b: c
```


### no-multi-str (error)
Disallow Multiline Strings

#### Rationale
It is considered bad practice to use multiline strings because it was originally an undocumented feature of JavaScript.

#### 👎 Bad code
```js
var x = 'Line 1 \
         Line 2';
```

#### 👍 Good code
```js
var x = 'Line 1\n' +
        'Line 2';
```


### no-new-func (warn)
Disallow Function Constructor

#### Rationale
It’s possible to create functions in JavaScript using the Function constructor; however, this is considered by many to
be a bad practice due to the difficulty in debugging and reading these types of functions. By passing a string to the
Function constructor, you are requiring the engine to parse that string much in the way it has to when you call the
`eval` function, also a bad practice.

#### 👎 Bad code
```js
var x = new Function('a', 'b', 'return a + b');
var x = Function('a', 'b', 'return a + b');
```

#### 👍 Good code
```js
var x = function (a, b) {
    return a + b;
};
```


### no-octal (error) [recommended]
Disallow Octal literals

#### Rationale
Octal literals are numerals that begin with a leading zero (e.g `071`). Because the leading zero which identifies an
octal literal has been a source of confusion and error in JavaScript code, they were deprecated in ES5.

#### 👎 Bad code
```js
var num = 071;
var result = 5 + 07;
```

#### 👍 Good code
```js
var num  = '071';
```


### no-octal-escape (error)
Disallow octal escape sequences in string literals

#### Rationale
As of the ES5 specification, octal escape sequences in string literals are deprecated and should not be used.

#### 👎 Bad code
```js
var foo = 'Copyright \251';
```

#### 👍 Good code
```js
var foo = 'Copyright \u00A9';   // unicode
```


### no-proto (error)
Disallow Use of `__proto__`

#### Rationale
The `__proto__` property has been deprecated as of ES3.1 and shouldn’t be used in the code.

#### 👎 Bad code
```js
var a = obj.__proto__;
```

#### 👍 Good code
```js
var a = Object.getPrototypeOf(obj);
```


### no-redeclare (error) [recommended]
Disallow Variable Redeclatarion

#### Rationale
In JavaScript, it’s possible to redeclare the same variable name using var. This can lead to confusion as to where the
variable is actually declared and initialized. This rule is aimed at eliminating variables that have multiple
declarations in the same scope which may lead to confusing code or unexpected behavior.

#### 👎 Bad code
```js
var a = 3;
var a = 10;
```

#### 👍 Good code
```js
var a = 3;
a = 10;
```


### no-return-assign (warn)
Disallow Assignment in `return` Statement

#### Rationale
One of the interesting, and sometimes confusing, aspects of JavaScript is that assignment can happen at almost any point.
Because of this, an errant equals sign can end up causing assignment when the true intent was to do a comparison.
This is especially true when using a `return` statement.  The assignment operator can lead to ambiguity of the code as
to whether the assignment was intended or if comparison was intended and the assignment is a typo.  Because of this, it
is considered a best practice to not use the assignment operator within a return statement and present a warning when
code is found that does so.

#### 👎 Bad code
```js
return foo = bar + 2;
```

#### 👍 Good code
```js
// Assignment Intended
foo = bar + 2;
return foo;

// Comparison Intended
return (foo === (bar + 2));
```


### no-script-url (warn)
Disallow Script URLs

#### Rationale
Using `javascript:` URLs is considered by some as a form of `eval`. Code passed in `javascript:` URLs has to be parsed
and evaluated by the browser in the same way that `eval` is processed.

#### 👎 Bad code
```js
  location.href = 'javascript:void(0)';
```


### no-self-assign (error) [recommended]
Disallow Self Assignment

#### Rationale
Self assignments have no effect and are probably an error due to incomplete refactoring.

#### 👎 Bad code
```js
foo = foo;
```


### no-self-compare (error)
Disallow Self Compare

#### Rationale
Comparing a variable against itself is usually an error, either due to a typo or a refactoring error. Further, it is
confusing to the reader and potentially introduce runtime errors. This error is raised to highlight a potentially
confusing and potentially pointless piece of code.

#### 👎 Bad code
```js
var x = 10;
if (x === x) {
  /// Do something...
}
```


### no-throw-literal (error)
Restrict what can be thrown as an exception

#### Rationale
It is considered good practice to only throw the `Error` object itself or an object using the `Error` object as base
objects for user-defined exceptions. The fundamental benefit of `Error` objects is that they automatically keep track
of where they were built and originated.

#### 👎 Bad code
```js
throw 'error';

throw 0;

throw undefined;

throw null;

var err = new Error();
throw 'an ' + err;
// err is recast to a string literal

var err = new Error();
throw `${err}`
```

#### 👍 Good code
```js
throw 'error';

throw 0;

throw undefined;

throw null;

var err = new Error();
throw 'an ' + err;
// err is recast to a string literal

var err = new Error();
throw `${err}`
```


### no-unmodified-loop-condition (warn)
Disallow unmodified conditions of loops

#### Rationale
Variables in a loop condition often are modified in the loop. If not, it’s possibly a mistake. This rule finds
references which are inside of loop conditions, then checks the variables of those references are modified in the loop.
This rule presents a warning when an artifact has been discovered.

#### 👎 Bad code
```js
while (node) {
  doSomething(node);
}
node = other;

for (var j = 0; j < items.length; ++i) {
  doSomething(items[j]);
}

while (node !== root) {
  doSomething(node);
}
```

#### 👍 Good code
```js
while (node) {
  doSomething(node);
  node = node.parent;
}

for (var j = 0; j < items.length; ++j) {
  doSomething(items[j]);
}

// OK, the result of this binary expression is changed in this loop.
while (node !== root) {
  doSomething(node);
  node = node.parent;
}

// OK, the result of this ternary expression is changed in this loop.
while (node ? A : B) {
  doSomething(node);
  node = node.parent;
}
```


### no-unused-expressions (warn)
Disallow Unused Expressions

#### Rationale
An unused expression which has no effect on the state of the program indicates a logic error. For example, `n + 1;` is
not a syntax error, but it might be a typing mistake where a programmer meant an assignment statement `n += 1;` instead.
This rule aims to eliminate unused expressions which have no effect on the state of the program. This rule does not
apply to function calls or constructor calls with the `new` operator, because they could have side effects on the state
of the program.

Note: One or more string expression statements (with or without semi-colons) will only be considered as unused if they
are not in the beginning of a script, module, or function (alone and uninterrupted by other statements). Otherwise, they
will be treated as part of a “directive prologue”, a section potentially usable by JavaScript engines. This includes
“strict mode” directives.

#### 👎 Bad code
```js
0

if(0) 0

{0}

f(0), {}

a && b()

a, b()

c = a, b;
```


### no-useless-call (error)
Disallow unnecessary `.call()` and `.apply()`

#### Rationale
Function invocations can be written by `Function.prototype.call()` and `Function.prototype.apply()`. But
`Function.prototype.call()` and `Function.prototype.apply()` are slower than the normal function invocation. This rule
is aimed to flag usage of `Function.prototype.call()` and `Function.prototype.apply()` that can be replaced with the
normal function invocation.

#### 👎 Bad code
```js
// These are same as `foo(1, 2, 3);`
foo.call(undefined, 1, 2, 3);
foo.apply(undefined, [1, 2, 3]);
foo.call(null, 1, 2, 3);
foo.apply(null, [1, 2, 3]);

// These are same as `obj.foo(1, 2, 3);`
obj.foo.call(obj, 1, 2, 3);
obj.foo.apply(obj, [1, 2, 3]);
```

#### 👍 Good code
```js
foo(1, 2, 3);
obj.foo(1, 2, 3);

// The `this` binding is different.
foo.call(obj, 1, 2, 3);
foo.apply(obj, [1, 2, 3]);
obj.foo.call(null, 1, 2, 3);
obj.foo.apply(null, [1, 2, 3]);
obj.foo.call(otherObj, 1, 2, 3);
obj.foo.apply(otherObj, [1, 2, 3]);

// The argument list is variadic.
foo.apply(undefined, args);
foo.apply(null, args);
obj.foo.apply(obj, args);
```


### no-useless-escape (error) [recommended]
Disallow unnecessary escape usage.

#### Rationale
Escaping non-special characters in strings, template literals, and regular expressions doesn’t have any effect and is
incorrect language usage. This rule flags escapes that can be removed without changing behavior.

#### 👎 Bad code
```js
"\'";
'\"';
"\#";
"\e";
`\"`;
`\"${foo}\"`;
`\#{foo}`;
/\!/;
/\@/;
```

#### 👍 Good code
```js
"\"";
'\'';
"\x12";
"\u00a9";
"\371";
"xs\u2111";
`\``;
`\${${foo}\}`;
`$\{${foo}\}`;
/\\/g;
/\t/g;
/\w\$\*\^\./;
```


### no-void (error)
Disallow use of the void operator.

#### Rationale
The `void` operator takes an operand and returns `undefined: void expression` will evaluate `expression` and return
`undefined`. It can be used to ignore any side effects `expression` may produce.  The common case of using `void`
operator is to get a “pure” undefined value as prior to ES5 the `undefined` variable was mutable.

However, as of ES6 `undefined` is no long mutable and the `void` operator is considered obtuse and difficult to read.

#### 👎 Bad code
```js
void foo

var foo = void bar();
```


### no-warning-comments (warn)
Disallow Warning Comments

#### Rationale
Developers often add comments to code which is not complete or needs review. Most likely to fix or review the code, and
then remove the comment, before the code is to be production ready. This rule is configured to provide a warning when
comments begin with the words `TODO`, `NOTE`, or `FIXME`.

#### 👎 Bad code
```js
// TODO: do something
// FIXME: this is not a good idea
// NOTE: Information
```


### require-await (warn)
Disallow `async` functions which have no `await` expression

#### Rationale
`async` functions which have no `await` expression may be the unintentional result of refactoring.  This rule warns whenever
`async` functions which have no `await` expression.

#### 👎 Bad code
```js
async function foo() {
  doSomething();
}

bar(async () => {
  doSomething();
});
```

#### 👍 Good code
```js
async function foo() {
  await doSomething();
}

bar(async () => {
  await doSomething();
});
```


### yoda (error)
Disallows Yoda conditionals, that is conditions where a literal value is on the left-had side of the comparison like
`('red' === color)`

#### Rationale
This rule aims to enforce consistent style of conditions which compare a variable to a literal value.

#### 👎 Bad code
```js
if ("red" === color) {
  // ...
}

if (true == flag) {
  // ...
}

if (5 > count) {
    // ...
}

if (-1 < str.indexOf(substr)) {
    // ...
}

if (0 <= x && x < 1) {
    // ...
}
```

#### 👍 Good code
```js
if (5 & value) {
    // ...
}

if (value === "red") {
    // ...
}
```



## Variables

## Node.js / CommonJS

### rule (error)
Stuff

#### Rationale

#### 👎 Bad code
```js
```

#### 👍 Good code
```js
```

## Formatting Rules

## ES6 Rules

## Table of Rules
| Rule | Level | Type | Rec. | Exceptions or Rule Values |
| ---- | ----- | ---- | ---- | ------------------------- |
| no-compare-neg-zero | error | Syntax | X |   |
| no-cond-assign | error | Syntax | X |   |
| no-console | warn | Syntax |   |   |
| no-constant-condition | error | Syntax | X |   |
| no-control-regex | warn | Syntax |   |   |
| no-debugger | error | Syntax | X |   |
| no-dupe-args | error | Syntax | X |   |
| no-dupe-keys | error | Syntax | X |   |
| no-duplicate-case | error | Syntax | X |   |
| no-empty | error | Syntax |   | `allowEmptyCatch: true` |
| no-empty-character-class | error | Syntax | X |   |
| no-ex-assign | error | Syntax | X |   |
| no-extra-boolean-cast | error | Syntax | X |   |
| no-extra-semi | error | Syntax | X |   |
| no-func-assign | error | Syntax | X |   |
| no-inner-declarations | error | Syntax | X |   |
| no-invalid-regexp | error | Syntax | X |   |
| no-irregular-whitespace | error | Syntax | X |   |
| no-obj-calls | error | Syntax | X |   |
| no-regex-spaces | error | Syntax | X |   |
| no-sparse-arrays | error | Syntax | X |   |
| no-unreachable | error | Syntax | X |   |
| no-unsafe-finally | error | Syntax | X |   |
| no-unsafe-negation | error | Syntax | X |   |
| use-isnan | error | Syntax | X |   |
| valid-typeof | error | Syntax | X |   |
| block-scoped-var | warn | Best Practice |   |   |
| complexity | warn | Best Practice |   | 15 |
| consistent-return | warn | Best Practice |   |   |
| curly | error | Best Practice |   |   |
| default-case | error | Best Practice |   |   |
| dot-location | error | Best Practice |   |   |
| dot-notation | error | Best Practice |   |   |
| eqeqeq | error | Best Practice |   |   |
| guard-for-in | warn | Best Practice |   |   |
| no-alert | warn | Best Practice |   |   |
| no-caller | error | Best Practice |   |   |
| no-case-declarations | error | Best Practice | X |   |
| no-div-regex | warn | Best Practice |   |   |
| no-else-return | warn | Best Practice |   |   |
| no-empty-function | error | Best Practice |   | `allow: ['constructors', 'arrowFunctions']`  |
| no-empty-pattern | error | Best Practice | X |   |
| no-eval | warn | Best Practice |   |   |
| no-extra-label | error | Best Practice |   |   |
| no-fallthrough | error | Best Practice | X |   |
| no-floating-decimal | error | Best Practice |   |   |
| no-global-assign | error | Best Practice | X |   |
| no-implied-eval | error | Best Practice |   |   |
| no-invalid-this | error | Best Practice |   |   |
| no-iterator | error | Best Practice |   |   |
| no-labels | error | Best Practice |   |   |
| no-lone-blocks | error | Best Practice |   |   |
| no-loop-func | warn | Best Practice |   |   |
| no-multi-spaces | error | Best Practice |   |   |
| no-multi-str | error | Best Practice |   |   |
| no-new-func | warn | Best Practice |   |   |
| no-octal | error | Best Practice | X |   |
| no-octal-escape | error | Best Practice |   |   |
| no-proto | error | Best Practice |   |   |
| no-redeclare | error | Best Practice | X |   |
| no-return-assign | warn | Best Practice |   |   |
| no-script-url | warn | Best Practice |   |   |
| no-self-assign | error | Best Practice | X |   |
| no-self-compare | error | Best Practice |   |   |
| no-throw-literal | error | Best Practice |   |   |
| no-unmodified-loop-condition | warn | Best Practice |   |   |
| no-unused-expressions | warn | Best Practice |   |   |
| no-unused-labels | error | Best Practice | X |   |
| no-useless-call | error | Best Practice |   |   |
| no-useless-escape | error | Best Practice | X |   |
| no-void | error | Best Practice |   |   |
| no-warning-comments | warn | Best Practice |   | `terms: ['todo','fixme','note'], location: 'start'`  |
| require-await | warn | Best Practice |   |   |
| yoda | error | Best Practice |   |   |   |
