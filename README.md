[![npm version](https://badge.fury.io/js/mintbean-cli.svg)](https://badge.fury.io/js/mintbean-cli)

# mintbean-cli

A command line interface for easy creation and deployment of submissions for Mintbean hackathon challenges

## Install

`npm install -g mintbean-cli`

### Pre-requisites
You need to have `node` and `git` installed on your machine. If you don't:

**LINUX**  `sudo apt install node git`

**MAC**  `brew install node`  `brew install git`

**WINDOWS** Google it :)

## Usage
Run `mint` for list of commands

### Creating and deploying projects
If it is your first time using `mintbean-cli`, first connect to GitHub with config (see below).

#### Suggested flow for new projects

```shell
mint new <my-project>
cd <my-project>
mint repo --connect --push
mint deploy
```

or for the cool kids:

```shell
mint n <my-project>
cd <my-project>
mint r -cp
mint d
```
### Config
The first time you use `mintbean-cli` you need to hook it up to your GitHub. Don't have a GitHub account? [Make one!](https://github.com/join)

`mint config -g <github-username> -t <token>`

Create a new GitHub personal access token [here](https://github.com/settings/tokens). Be sure to assign this token full scope of 'repo' and 'user'. You can reset your token anytime and update your `mint` config.

> Advanced: the connection type defaults to SSH. You can specify HTTPS connection instead with -H flag (or switch back to SSH with -S).

`mint config -g <github-username> -t <token> -H`

View your config settings anytime with `mint config -v`.

### Development
`mint develop` or `mint dev`

Starts a local development server to display your code's output (look for `localhost` link). Changes to your code automatically updates when you save. 

### Deployment
If you haven't yet, create a remote repo: `mint repo -cp`

Then just run `mint deploy` anytime and every time you want to update your deployment.

Deployment defaults to GitHub pages, but you can define your own custom 'predeploy' and 'deploy' commands in `package.json`> "scripts" if you prefer some other building/hosting platform.

Be patient on first deploy to GitHub pages - it can take up to a minute or two before the page is ready :)

## Templates
These start templates are currently available. They all come ready-to-deploy to GitHub pages.

### react-gh-pages
Basic Create React App template.

### vanilla-js
Basic vanilla JavaScript template that allows you to preview your project on a local server (`mint dev`)

### vue-gh-pages
Basic Vue CLI template.

## WARNINGS
1. Pick a unique project name that won't conflict with your existing GitHub repos
2. `mint` commands will break if you change your project name... sorry. 

## Commands
In general, **run all commands at the project root!**. Commands you can run anywhere: `mint [-h|-V]`, `mint config` or `mint new`

| cmd                              | description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
|`mint [-h\|--help`]          | display help             |
| `mint -V\|--version`         | display mintbean-cli version             |
| `mint new\|n [project-name]` | create new project from template that you select after running. If no project name given, name defaults to `mintbean-hackathon-challenge-YYYY-MM-DD` |
| `mint repo\|r` <br> [-c\|--connect]<br>  [-p\|--push]         | Create new public GitHub repo. <br> options: <br>(-c): (recommended) also connect git remote origin to new repo <br> (-p): (recommended) also do initial git add/commit/push of master to remote origin |
| `mint config` <br>  [-v\|--view] <br>  [-g\|--github] <br>  [-t\|--token]       | Set up or view config (Github credentials etc.)   <br>   options: <br> (-v) view current config<br>(-g) set github username <br>(-t) set [github personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)              |
| `mint develop\|dev`                    | Launches local development server so you can see your project. <br> Excutes "develop" script in package.json>mintbean>scripts     |
| `mint deploy\|d`                    | Deploy project (default: GitHub Pages). <br> Excutes "deploy" script in package.json>mintbean>scripts     |
| `mint init`              | Alias for 'git init'.                      |
| `mint connect\|c`              | Add or override remote origin with github preferences in config (won't usually need to run this as it is built into -c flag in `mint repo -c`)        |


# Developers

## Testing
Testing is not yet set up for developers. Coming soon.

## New templates
Have a project starter template idea? Submit it [here](https://github.com/clairefro/mintbean-cli/issues/new?assignees=&labels=template&template=template-proposal.md&title=Template+proposal%3A+)

## Bugs
Report them [here](https://github.com/clairefro/mintbean-cli/issues/new?assignees=&labels=&template=bug_report.md&title=)
