[![npm version](https://badge.fury.io/js/mintbean-cli.svg)](https://badge.fury.io/js/mintbean-cli)
### status: Not quite ready :)
CLI currently templates `vanilla-js` and `react-gh-pages`, with bug that image files don't copy over. In new projects still need to manually run
```
git init
/* create remote repo */
/* react */
yarn install
yarn deploy
```
working on automating this, no worries!

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
For Windows, Google your way through installing :)

## Usage

Run `mint` for list of commands

### Create new app

`mint n <my-app>`, then select template from list.
Current templates:
- vanilla-js
- react-gh-pages

## Roadmap

Aiming for at least these features (bold indicates Beta avail)

| cmd                              | description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`mint [-h\|--help`]**          | display help                                                                                      |
| **`mint -V\|--version`**         | display version                                                                                   |
| **`mint new\|n [project-name]`** | create new project from template that you select after running. If no project name given, name defaults to `mintbean-hackathon-challenge-YYYY-MM-DD` |
| **`mint init`**                  | Alias for 'git init'. RUN FROM PROJECT ROOT.                                          |
| **`mint repo\|r` [-c|--connect]**         | Create new public GitHub repo. RUN FROM PROJECT ROOT. <br> options: (-c): also connect git remote origin to new repo|
| **`mint config [-v\|--view] [-g\|--github] [-t\|--token]`**               | Set up or view config (Github credentials etc.)     options: (-v) view current config, (-g) set github username, (-t) set github personal access token                                              |
| `mint deploy`                    | deploy project to github pages based on project type                                              |
| `mint share`                     | display remote repo link and github pages link                                                    |
| `mint login`                     | save user preferences, github/mintbean credentials                                                |

# Developers

## Testing

Currently, jest tests are limited to synchronous execution. Async execution is not supported because of how the CLI
depends on the current working directory to determine the target directory for the templated project.
