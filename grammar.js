/**
 * @file Tree-sitter grammar for ASP.NET Razor (.cshtml)
 * @author k-hayashi <sitinl@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "razor",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
