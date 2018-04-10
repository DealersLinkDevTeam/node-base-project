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
| yoda | error | Best Practice |   |   |
| no-delete-var | warn | Variables |   |   |
| no-shadow | warn | Variables |   |   |
| no-shadow-restricted-names | error | Variables |   |   |
| no-undef | error | Variables | X |   |
| no-undef-init | error | Variables |   |   |
| no-use-before-define | error | Variables |   |   |
| no-unused-vars | error | Variables | X |   |
| no-buffer-constructor | error | NodeJS |   |   |
| no-new-require | error | NodeJS |   |   |
| no-path-concat | error | NodeJS |   |   |
| array-bracket-newline | error | Formatting |   | `multiline: true` |
| array-bracket-spacing | warn | Formatting |   | `'never'` |
| block-spacing | error | Formatting |   | `'always'` |
| brace-style | error | Formatting |   | `'1tbs', { allowSingleLine: true }` |
| camelcase | error | Formatting |   | `properties: 'always'`|
| comma-spacing | error | Formatting |   | `before: false, after: true` |
| comma-style | error | Formatting |   | `'last'` |
| computed-property-spacing | error | Formatting |   | `'never'` |
| consistent-this | error | Formatting |   | `'self'` |
| eol-last | error | Formatting |   | `'always'` |
| func-call-spacing | error | Formatting |   | `'never'` |
| function-paren-newline | error | Formatting |   | `'multiline'` |
| id-length | error | Formatting |   | `min: 2, max: 40` |
| indent | error | Formatting |   | `2, { SwitchCase: 1 }` |
| jsx-quotes | error | Formatting |   | `'prefer-double'` |
| key-spacing | error | Formatting |   | `afterColon: true, beforeColon: false, mode: 'minimum'` |
| keyword-spacing | error | Formatting |   | `before: true, after: true` |
| linebreak-style | error | Formatting |   | `'unix'` |
| lines-around-comment | error | Formatting |   | `beforeBlockComment: true` |
| lines-between-class-members | error | Formatting |   | `'always'` |
| max-len | warn | Formatting |   | `code: 120` |
| new-cap | error | Formatting |   |  |
| new-parens | error | Formatting |   |  |
| newline-per-chained-call | error | Formatting |   | `ignoreChainWithDepth: 1` |
| no-array-constructor | error | Formatting |   |  |
| no-lonely-if | error | Formatting |   |  |
| no-mixed-spaces-and-tabs | error | Formatting | X |   |
| no-multi-assign | error | Formatting |   |  |
| no-multiple-empty-lines | error | Formatting |   | `max: 2, maxEOF: 1, maxBOF: 1` |
| no-new-object | error | Formatting |   |  |
| no-tabs | error | Formatting |   |  |
| no-unneeded-ternary | error | Formatting |   |  |
| no-whitespace-before-property | error | Formatting |   |  |
| object-curly-newline | error | Formatting |   | `multiline: true` |
| object-curly-spacing | error | Formatting |   | `'always'` |
| operator-assignment | warn | Formatting |   |   |
| operator-linebreak | error | Formatting |   | `'after', { overrides: { '?': 'none', ':': 'none' } }` |
| quote-props | error | Formatting |   | `'as-needed'` |
| quotes | error | Formatting |   | `'single'` |
| semi | error | Formatting |   |  |
| semi-spacing | error | Formatting |   | `before: false, after: true` |
| semi-style | error | Formatting |   | `'last'` |
| space-before-blocks | error | Formatting |   |  |
| space-before-function-paren | error | Formatting |   | `'never'` |
| space-in-parens | error | Formatting |   |  |
| space-infix-ops | error | Formatting |   |  |
| space-unary-ops | error | Formatting |   | `words: true, nonwords: false` |
| spaced-comment | warn | Formatting |   | `'always'` |
| switch-colon-spacing | error | Formatting |   | `after: true, before: false` |
| template-tag-spacing | error | Formatting |   |  |
| arrow-body-style | error | ES6 |   | `'always'` |
| arrow-parens | error | ES6 |   |   |  
| arrow-spacing | error | ES6 |   | `before: true, after: true` |
| constructor-super | error | ES6 | X |   |  
| generator-star-spacing | error | ES6 |   | `before: true, after: false` |
| no-class-assign | error | ES6 | X |   |  
| no-confusing-arrow | error | ES6 |   |   |  
| no-const-assign | error | ES6 | X |   |  
| no-dupe-class-members | error | ES6 | X |   |  
| no-new-symbol | error | ES6 | X |   |  
| no-this-before-super | error | ES6 | X |   |  
| no-var | warn | ES6 |   |   |  
| object-shorthand | error | ES6 |   | `'consistent'` |
| prefer-arrow-callback | error | ES6 |   |   |  
| prefer-const | warn | ES6 |   |   |  
| prefer-numeric-literals | warn | ES6 |   |   |  
| prefer-rest-params | warn | ES6 |   |   |  
| prefer-spread | warn | ES6 |   |   |  
| prefer-template | warn | ES6 |   |   |  
| require-yield | error | ES6 | X |   |  
| rest-spread-spacing | error | ES6 |   |   |  
| symbol-description | error | ES6 |   |   |  
| template-curly-spacing | error | ES6 |   |   |  
| yield-star-spacing | error | ES6 |   | `before: true, after: false` |
