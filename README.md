[![npm version](https://badge.fury.io/js/mintbean-cli.svg)](https://badge.fury.io/js/mintbean-cli)

# mintbean-cli

Command line interface for easy creation and deployment of submissions for Mintbean hackathon challenges

## Install

`npm install -g mintbean-cli`

### Pre-requisites
You need to have `node`, `npm` and `git` installed on your machine. Assuming you have npm for downloading `mintbean-cli`:
```
**LINUX**
sudo apt install node git

**MAC**
brew install node
brew install git

```
For Windows, Google your way through installing these :)

## Usage
Run `mint` for list of commands

### Basic flow
After setting up your first-time config, creating a project and deploying is easy as:

```
mint new <my-project>
cd <my-project>
mint repo --connect --push
mint deploy
```

or for the cool kids:

```
mint n <my-project>
cd <my-project>
mint r -cp
mint d
```

Deployment defaults to GitHub pages, but you can define your own custom 'predeploy' and 'deploy' commands in `package.json`>"mintbean.scripts"

### First-time config
The first time you use `mintbean-cli` you will need to set up your Github credentials using `mint config`

```
mint config -g <github-username> -t <token>
```

The connection type defaults to SSH. You can specifcy HTTPS connection instead with -H flag (or switch back to SSH with -S).

```
mint config -g <github-username> -t <token> -H
```

View your config settings anytime with `mint config -v`.


## Roadmap

Aiming for at least these features (bold indicates Beta avail)

| cmd                              | description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`mint [-h\|--help`]**          | display help                                                                                      |
| **`mint -V\|--version`**         | display version                                                                                   |
| **`mint new\|n [project-name]`** | create new project from template that you select after running. If no project name given, name defaults to `mintbean-hackathon-challenge-YYYY-MM-DD` |
| **`mint init`**                  | Alias for 'git init'. RUN FROM PROJECT ROOT.                                          |
| **`mint repo\|r` [-c\|--connect]**         | Create new public GitHub repo. RUN FROM PROJECT ROOT. <br> options: (-c): also connect git remote origin to new repo|
| **`mint config [-v\|--view] [-g\|--github] [-t\|--token]`**               | Set up or view config (Github credentials etc.)     options: (-v) view current config, (-g) set github username, (-t) set github personal access token                                              |
| `mint deploy`                    | deploy project to github pages based on project type                                              |
| `mint share`                     | display remote repo link and github pages link                                                    |
| `mint login`                     | save user preferences, github/mintbean credentials                                                |

# Developers

## Testing

Currently, jest tests are limited to synchronous execution. Async execution is not supported because of how the CLI
depends on the current working directory to determine the target directory for the templated project.
