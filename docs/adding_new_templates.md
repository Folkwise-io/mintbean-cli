# How to Add a Project Template

## Getting Started

1. If you have mint installed globaly `npm uninstall -g mintbean-cli`
2. Fork the repository
3. `git clone <fork>`
4. Link it to your global packages `npm link`
5. Create a branch with a descriptive name of the template `git checkout -b temp/[template-name]`
6. Apply your changes
7. Open a pull request against the main branch

#### Every template requires the following

* Files related to the project
  * HTML
  * CSS
  * JS
  * configs
  * etc
* JavaScript module bundler like Webpack or Parcel
* README
  * Title
  * Description
  * Instructions
  * About
* Package.json (Look at PhaserJS for example)
  * Must be EJS Templatable
  * Scripts
    * Build
      * Creates publish directory/static assests (/dist or /build)
    * Start
      * Spins up a dev server must work on creation
  * Dependencies and DevDependencies
* Content
  * Some sort of welcome message for the project
