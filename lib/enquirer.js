const {prompt, Input} = require('enquirer');

const githubUsernamePrompt = {
  name: 'username',
  type: 'input',
  message: 'GitHub username',
  validate: function(value) {
    if (value.length) {
      return true;
    } else {
      return 'Invalid username, try again.';
    }
  }
};

module.exports = {
  askGithubUsername: async () => {
    return await prompt(githubUsernamePrompt)
  }
};
