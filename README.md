# commitlint-action

Lint commit messages by GitHub Actions.

# Usage

See [action.yml][action-yml].

## Use with Angular Commit Message Format

You can use [Angular Commit Message Format][angular-commit-message-format] (or other paradigm) to standardize your Git Commit.

You just need to provide `GITHUB_TOKEN` ([if you don't know what it is][github-token]) and a configuration scheme named `@commitlint/config-angular`.

**default: `@commitlint/config-conventional`**

```yml
- uses: Mogeko/commitlint-action@master
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    config: '@commitlint/config-angular'
```

[More configuration schemes...](#commit-message-format)

## Custom configuration file

You can customize the configuration file with `configFile`. You can also mix `config` and `configFile`.

Just enter the path of the configuration file (e.g. `./.commitlint.yml`).

Configuration can be picked up from `*.config.js`, `*.js`, `*.json`, or `*.yml` file.

**default: N/A**

```yml
- uses: Mogeko/commitlint-action@master
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    configFile: '.commitlint.yml'
```

## Strict mode

Action will fail even if **warnings** are detected when in strict mode.

**default: `true`**

```yml
- uses: Mogeko/commitlint-action@master
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    strict: false # default: true
```

## Verbose information

Whether commitlint output shoud be verbose when failing.

**default: `false`**

```yml
- uses: Mogeko/commitlint-action@master
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
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
          config: '@commitlint/config-conventional'
          configFile: '.commitlint.yml'
          strict: true
          verbose: false
```

## Input

Various inputs are defined in [`action.yml`][action-yml] to let you configure the labeler:

| Name         | Description                                                  | Default                           |
| ------------ | ------------------------------------------------------------ | --------------------------------- |
| `token`      | The `GITHUB_TOKEN` secret                                    | N/A                               |
| `config`     | Commitlint configuration scheme                              | `@commitlint/config-conventional` |
| `configFile` | Commitlint configuration file path                           | N/A                               |
| `strict`     | Action will fail even if warnings are detected when in strict mode | `true`                      |
| `verbose`    | Whether commitlint output shoud be verbose when failing      | `false`                           |

## Output

Whenever success or failure, Action will output the result of lint in JSON format.

#### `COMMITLINT_RESULT`

You can use `COMMITLINT_RESULT` in the context of workflow:

```yml
- name: Lint commit messages
  uses: Mogeko/commitlint-action@master
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
  id: commitlint
- name: Print result of lint
  run: echo "The result of lint is ${{ steps.commitlint.outputs.COMMITLINT_RESULT }}"
```

If it fails, `COMMITLINT_RESULT` will be like:

```json
{
  "valid": false,
  "errors": [
    {
      "level": 2,
      "valid": false,
      "name": "type-enum",
      "message": "type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]"
    }
  ],
  "warnings": [],
  "input": "foo: bar"
}
```

If successful, `COMMITLINT_RESULT` will be like:

```json
{
  "valid": true,
  "errors": [],
  "warnings": [],
  "input": "chore: message"
}
```

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


[action-yml]: https://github.com/Mogeko/commitlint-action/blob/dist/action.yml
[angular-commit-message-format]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format
[config-angular]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-angular
[config-conventional]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
[config-lerna-scopes]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-lerna-scopes
[config-patternplate]: https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-patternplate
[github-token]: https://docs.github.com/en/actions/reference/authentication-in-a-workflow
[license]: https://github.com/Mogeko/commitlint-action/blob/master/LICENSE
