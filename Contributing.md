# How to provide more snippets

All snippets are stored in `snippets/asciidoc-vscode.code-snippets` file.

VS Code Snippets are written in JSON. Each snippet is defined under a snippet `name` and has a `scope`, `prefix`, `body`, and `description`. If `scope` is left empty or omitted, the snippet gets applied to all languages. The `prefix` is what is used to trigger the snippet and the body will be expanded and inserted.

When adding a new snippet, the readme section [List of snippets included](README.md#list-of-snippets-included) needs to be updated.

More documentation on the syntax to use is available on [official VS Code documentation](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_snippet-syntax).

# How to perform a release

- Ensure that you have rights to create a tag on https://github.com/abhatt-rh/asciidoc_vscode_snippets
- Check that the version in `package.json` is increased compared to already published version on [Microsoft VS Code Marketplace](https://marketplace.visualstudio.com/vscode). If not the case, the increase can be done by calling `npm version --no-git-tag-version patch`.
- Create a tag and push it
- A GitHub Action workflow should be automatically triggered and push the build
- Increase the version number of the extension. It can be done by calling `npm version --no-git-tag-version patch`; then pushing the changes to the repository.
