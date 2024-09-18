# Ableton Companion

![Alt Text](.src/assets/screenshots/ableton-project-manager-v0-53izk3qzzxvb1.jpg)
![Alt Text](.src/assets/screenshots/ableton-project-manager-v0-721rt4qzzxvb1.jpg)
![Alt Text](.src/assets/screenshots/ableton-project-manager-v0-bnpy55qzzxvb1.jpg)
![Alt Text](.src/assets/screenshots/ableton-project-manager-v0-kyvd36qzzxvb1.jpg)
![Alt Text](.src/assets/screenshots/ableton-project-manager-v0-vh8iyspzzxvb1.jpg)


**Ableton Companion** is a utility application built using Electron, Vue 3, and TypeScript, designed to simplify the management of Ableton Live project files.

With this app, you can easily browse and organize your projects, open them directly from the application, and access project information that is not typically available in Ableton. It also includes powerful filtering and sorting options to help you find important projects quickly, as well as features to group projects into albums for better organization.

## Key Features:
- **Project Browser**: Displays all your Ableton projects in an intuitive, user-friendly interface.
- **Filtering & Sorting**: Use multiple filters and sorting options to quickly locate the projects you need.
- **Album Creation**: Organize projects by grouping them into albums.
- **Project Details**: Retrieve hidden project metadata and information.
- **Quick Access**: Open Ableton projects directly from the application.
- **Mark Important Projects**: Highlight key projects for easy access.

## Technologies Used:
- **Electron**: For cross-platform desktop application development.
- **Vue 3**: Frontend framework for building the user interface.
- **TypeScript**: Ensures type safety and scalability.


## Project setup
Install Vue3 then
```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Compiles and minifies for production
Set the version of node to 16.0.0
```
nvm install 16.0.0
nvm use 16.0.0
```
Build for windows
```
npm run electron:build:win
```
Build for mac
```
npm run electron:build:mac
```
