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
                $.element,
                $.text,
            ),

        element: $ =>
            seq(
                $.start_tag,
                repeat($._node),
                $.end_tag,
            ),

        start_tag: $ =>
            seq(
                "<",
                $.tag_name,
                ">",
            ),

        end_tag: $ =>
            seq(
                "</",
                $.tag_name,
                ">",
            ),

        tag_name: $ =>
            /[A-Za-z][A-Za-z0-9-]*/,

        text: $ =>
            /[^<@]+/,
    }
});
