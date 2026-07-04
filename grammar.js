/**
 * @file Tree-sitter grammar for ASP.NET Razor (.cshtml)
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
    name: "razor",

    rules: {

        source_file: $ =>
            repeat($._node),

        _node: $ =>
            choice(
                $.razor_model_directive,
                $.razor_expression,
                $.html_element,
                $.html_text,
            ),

        html_element: $ =>
            seq(
                $.html_start_tag,
                repeat($._node),
                $.html_end_tag,
            ),

        html_start_tag: $ =>
            seq(
                "<",
                $.tag_name,
                repeat($.attribute),
                ">",
            ),

        html_end_tag: $ =>
            seq(
                "</",
                $.tag_name,
                ">",
            ),

        tag_name: $ =>
            /[A-Za-z][A-Za-z0-9-]*/,

       attribute: $ =>
         seq(
             $.attribute_name,
             "=",
             $.attribute_value,
         ),
    
        attribute_name: $ =>
            /[A-Za-z_:][-A-Za-z0-9_:.]*/,
        
        attribute_value: $ =>
            choice(
                seq('"', /[^"]*/, '"'),
                seq("'", /[^']*/, "'"),
            ),

        html_text: $ =>
          token(
            /[^<@.]+/
          ),

        razor_model_directive: $ =>
          seq(
              "@model",
              /\s+/,
              $.type_name,
          ),

        type_name: $ =>
          /[A-Za-z_][A-Za-z0-9_.<>]*/,

        identifier: _ =>
          /[A-Za-z_][A-Za-z0-9_]*/,
        
        razor_expression: $ =>
          seq(
            "@",
            $.expression
          ),


        member_access: $ =>
          prec.left(
              seq(
                  choice(
                      $.identifier,
                      $.member_access
                  ),
                  ".",
                  $.identifier
              )
          ),

        parenthesized_expression: $ =>
          seq(
              "(",
              $.expression, 
              ")"
          ),
        
        expression: $ =>
          choice(
              $.member_access,
              $.identifier,
              $.parenthesized_expression,
          ),
    } 
});
