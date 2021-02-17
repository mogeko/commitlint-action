# commitlint-action

Lint commit messages by GitHub Actions.

# Usage

See [action.yml][action-yml].

## Use with Angular Commit Message Format

You can use [Angular Commit Message Format][angular-commit-message-format] (or other paradigm) to standardize your Git Commit.

You just need to provide `GITHUB_TOKEN` ([if you don't know what it is][github-token]) and a configuration scheme named `@commitlint/config-angular`.

```yml
- uses: Mogeko/commitlint-action@master
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    config: '@commitlint/config-angular'
```

[More configuration schemes...](#commit-message-format)

## Strict mode

Action will fail even if **warnings** are detected when in strict mode.

**default: `true`**

```yml
- uses: Mogeko/commitlint-action@master
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    config: '@commitlint/config-angular'
    strict: false # default: true
```

## Verbose information

Whether commitlint output shoud be verbose when failing.

**default: `false`**

```yml
- uses: Mogeko/commitlint-action@master
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    config: '@commitlint/config-angular'
    verbose: true # default: false
```

## Examples

A complete workflow example:

```yml
name: Lint Commit Messages
on: [push, pull_request]

jobs:
  commitlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: Mogeko/commitlint-action@master
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          config: '@commitlint/config-angular'
          strict: true
          verbose: false
```

## Input

Various inputs are defined in [`action.yml`][action-yml] to let you configure the labeler:

| Name      | Description                                                        | Default |
| --------- | ------------------------------------------------------------------ | ------- |
| `token`   | The `GITHUB_TOKEN` secret                                          | N/A     |
| `config`  | Commitlint configuration scheme                                    | N/A     |
| `strict`  | Action will fail even if warnings are detected when in strict mode | `true`  |
| `verbose` | Whether commitlint output shoud be verbose when failing            | `false` |

## Commit Message Format

The configuration schemes currently available for `config` are:

| Configurations                                         | Value                             |
| ------------------------------------------------------ | --------------------------------- |
| [@commitlint/config-angular][config-angular]           | `@commitlint/config-angular`      |
| [@commitlint/config-conventional][config-conventional] | `@commitlint/config-conventional` |
| [@commitlint/config-lerna-scopes][config-lerna-scopes] | `@commitlint/config-lerna-scopes` |
| [@commitlint/config-patternplate][config-patternplate] | `@commitlint/config-patternplate` |

# License

The scripts and documentation in this project are released under the [MIT License][license].


[action-yml]: https://github.com/Mogeko/commitlint-action/blob/master/action.yml
[angular-commit-message-format]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format
[config-angular]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-angular
[config-conventional]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
[config-lerna-scopes]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-lerna-scopes
[config-patternplate]: https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-patternplate
[github-token]: https://docs.github.com/en/actions/reference/authentication-in-a-workflow
[license]: https://github.com/Mogeko/commitlint-action/blob/master/LICENSE
