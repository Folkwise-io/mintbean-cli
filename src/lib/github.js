// const CLI = require('clui');
// const Configstore = require('configstore');
// const Octokit = require('@octokit/rest');
// const Spinner = CLI.Spinner;
// const { createBasicAuth } = require("@octokit/auth-basic");
//
// const inquirer = require('./inquirer');
// const pkg = require('../package.json');
//
// const conf = new Configstore(pkg.name);
//
// module.exports = {
//   getInstance: () => {
//     return octokit;
//   },
//   getStoredGithubToken: () => {
//     return conf.get('github.token');
//   },
//
//   getPersonalAccesToken: async () => {
//     const credentials = await inquirer.askGithubCredentials();
//     const status = new Spinner('Authenticating you, please wait...');
//
//     status.start();
//
//     const auth = createBasicAuth({
//       username: credentials.username,
//       password: credentials.password,
//       async on2Fa() {
//         // TBD
//       },
//       token: {
//         scopes: ['user', 'public_repo', 'repo', 'repo:status'],
//         note: 'mintbean-cli, the command-line tool for easy deployment of Mintbean hackathon submissions'
//       }
//     });
//
//     try {
//       const res = await auth();
//
//       if(res.token) {
//         conf.set('github.token', res.token);
//         return res.token;
//       } else {
//         throw new Error("GitHub token was not found in the response");
//       }
//     } finally {
//       status.stop();
//     }
//   },
// };
