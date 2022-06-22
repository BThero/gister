oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bombard
$ bombard COMMAND
running command...
$ bombard (--version)
bombard/0.0.0 darwin-arm64 node-v16.14.0
$ bombard --help [COMMAND]
USAGE
  $ bombard COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bombard hello PERSON`](#bombard-hello-person)
* [`bombard hello world`](#bombard-hello-world)
* [`bombard help [COMMAND]`](#bombard-help-command)
* [`bombard plugins`](#bombard-plugins)
* [`bombard plugins:install PLUGIN...`](#bombard-pluginsinstall-plugin)
* [`bombard plugins:inspect PLUGIN...`](#bombard-pluginsinspect-plugin)
* [`bombard plugins:install PLUGIN...`](#bombard-pluginsinstall-plugin-1)
* [`bombard plugins:link PLUGIN`](#bombard-pluginslink-plugin)
* [`bombard plugins:uninstall PLUGIN...`](#bombard-pluginsuninstall-plugin)
* [`bombard plugins:uninstall PLUGIN...`](#bombard-pluginsuninstall-plugin-1)
* [`bombard plugins:uninstall PLUGIN...`](#bombard-pluginsuninstall-plugin-2)
* [`bombard plugins update`](#bombard-plugins-update)

## `bombard hello PERSON`

Say hello

```
USAGE
  $ bombard hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/bthero/baibolov-temirlan-hs/blob/v0.0.0/dist/commands/hello/index.ts)_

## `bombard hello world`

Say hello world

```
USAGE
  $ bombard hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `bombard help [COMMAND]`

Display help for bombard.

```
USAGE
  $ bombard help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for bombard.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `bombard plugins`

List installed plugins.

```
USAGE
  $ bombard plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ bombard plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `bombard plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ bombard plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ bombard plugins add

EXAMPLES
  $ bombard plugins:install myplugin 

  $ bombard plugins:install https://github.com/someuser/someplugin

  $ bombard plugins:install someuser/someplugin
```

## `bombard plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ bombard plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ bombard plugins:inspect myplugin
```

## `bombard plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ bombard plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ bombard plugins add

EXAMPLES
  $ bombard plugins:install myplugin 

  $ bombard plugins:install https://github.com/someuser/someplugin

  $ bombard plugins:install someuser/someplugin
```

## `bombard plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ bombard plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ bombard plugins:link myplugin
```

## `bombard plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bombard plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bombard plugins unlink
  $ bombard plugins remove
```

## `bombard plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bombard plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bombard plugins unlink
  $ bombard plugins remove
```

## `bombard plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ bombard plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ bombard plugins unlink
  $ bombard plugins remove
```

## `bombard plugins update`

Update installed plugins.

```
USAGE
  $ bombard plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
