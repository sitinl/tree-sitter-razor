#测试
tree-sitter generate
接着测试：

echo "Hello Razor" > test.cshtml

tree-sitter parse test.cshtml

你应该看到类似：

(source_file
  (text))

echo "hello <div>world</div>" > test.cshtml
tree-sitter parse test.cshtml
