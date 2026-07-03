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
    source_file: $ => repeat($._node),

        _node: $ => choice(
            $.text,
            $.tag
        ),

        text: $ => /[^<@]+/,
        tag: $ => seq(
          '<',
          /[^>]+/,
          '>'
        )
        
  }
});
