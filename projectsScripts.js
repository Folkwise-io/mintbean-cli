const ghPages = {
  "phaser-gh-pages": {
    start: "parcel src/index.html",
    build: "parcel build src/index.html --public-url '.'",
    predeploy: "npm run build",
    deploy: "gh-pages -d dist",
  },
};

module.exports = {
  ghPages,
};
