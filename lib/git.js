import shell from "shelljs";

// utils
export const generateRemoteLinkSsh = (username, projectName) => {
  return `git@github.com:${username}/${projectName}.git`;
};

export const generateRemoteLinkHttps = (username, projectName) => {
  return `https://github.com/${username}/${projectName}.git`;
};

export const generateRemoteLink = (username, projectName, connectionType) => {
  if (connectionType === "https") {
    return generateRemoteLinkHttps(username, projectName);
  } else {
    return generateRemoteLinkSsh(username, projectName);
  }
};


export const addRemote = (name, remote) => {
  shell.exec(`git remote add ${name} ${remote}`);
};

export const removeRemote = (name) => {
  shell.exec(`git remote remove ${name}`);
};

export const addSubtree = (subtree) => {
  shell.exec(
    `git add ${subtree} && git commit -m "initial ${subtree} subtree commit"`
  );
};

export const addCommitPushMaster = (commitMsg) => {
  shell.exec(`git add .`, { silent: true });
  shell.exec(`git commit -m"${commitMsg}"`, {
    silent: true,
  });
  shell.exec(`git push origin master`, {
    silent: true,
  });
};

// used mainly for pushing to gh-pages branch
export const pushSubtreeToOrigin = (subtree, branch) => {
  if (branchDoesExistAtOrigin("gh-pages")) {
    console.log("gh-pages already exists at origin");
  }
  shell.exec(`git subtree push --prefix ${subtree} origin ${branch}`);
};

// Custom actions

export const createOrOverrideRemoteOrigin = (
  username,
  projectName,
  connectionType
) => {

  // check remotes for existing origin, remove if present
  if (hasRemoteOrigin()) {
    removeRemote("origin");
  }
  // create new remote origin connection
  const remote = generateRemoteLink(username, projectName, connectionType);
  addRemote("origin", remote);
  console.log(getRemotes());
};

// Viewers
const getRemotes = () => {
  const { stdout } = shell.exec("git remote -v", { silent: true });
  return stdout;
};

export const branchDoesExistAtOrigin = (branch) => {
  const { code } = shell.exec(
    `git ls-remote --exit-code origin "refs/heads/${branch}"`,
    {
      silent: true,
    }
  );
  return code === 0;
};

export const hasRemoteOrigin = () => {
  const output = getRemotes();
  const pattern = /^origin\s/m;
  return pattern.test(output);
};

export default {
  createOrOverrideRemoteOrigin,
  branchDoesExistAtOrigin,
  pushSubtreeToOrigin,
  addCommitPushMaster,
  getRemotes,
  hasRemoteOrigin,
};
