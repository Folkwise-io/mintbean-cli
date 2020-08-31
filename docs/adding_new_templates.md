# How to Add a template

## Getting Started

1. Fork the repository
2. Create a branch named Template[Name]
3. Add your Template to the templates folder
4. Open a pull request against the main branch

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
