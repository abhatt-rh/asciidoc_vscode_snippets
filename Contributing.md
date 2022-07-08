# How to perform a release

- Ensure that you have rights to create a tag on https://github.com/abhatt-rh/asciidoc_vscode_snippets
- Check that the version in `package.json` is increased compared to already published version on [Microsoft VS Code Marketplace](https://marketplace.visualstudio.com/vscode). If not the case, the increase can be done by calling `npm version --no-git-tag-version patch`.
- Create a tag and push it
- A GitHub Action workflow should be automatically triggered and push the build
- Increase the version number of the extension. It can be done by calling `npm version --no-git-tag-version patch`; then pushing the changes to the repository.
