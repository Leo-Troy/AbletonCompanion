<template>
    <div class="app-container"  :style="{ '--bg': show_settings || show_license ? 'white' : '#7951A8' }" >
        <div :class="{ 'app': !show_settings}">
            <ListComponent :filter_option="filter_option" v-if="filter_option.current_view != 6 && filter_option.current_view != 7"/>
            <div class="real-project-container" v-if="show_all_projects">
                <!-- {{ update_message }} -->
                <ProjectFilterComponent :filter_option="filter_option" />
                    <ProjectComponent v-for="project in projects" :project="project" :filter_option="filter_option"></ProjectComponent>
            </div>
            <div class="album-container" v-if="show_all_albums">
                <AlbumList v-for="album in albums" :album="album" :filter_option="filter_option"  @force-update="force_update"></AlbumList>
            </div>
            <div class="project-container" v-if="show_one_project">
                <OneProjectComponent :project="filter_option.current_project"></OneProjectComponent>
            </div>
            <div class="settings-container" v-if="show_settings">
                <SettingsComponent @force-update="force_update"></SettingsComponent>
            </div>
            <div class="settings-container" v-if="show_credentials">
                <CredentialsComponent force-update="force_update"></CredentialsComponent >
            </div>
            <div class="license-container" v-if="show_license">
                <LicenseComponent :filter_option="filter_option" force-update="force_update" @force-update="force_update"></LicenseComponent >
            </div>
            <div class="license-container" v-if="show_end">
                <EndComponent></EndComponent >
            </div>
        </div>
    </div>
</template>

<script>

    import ProjectFilterComponent from "./components/project/ProjectFilterComponent.vue"
    import ProjectComponent from "./components/project/ProjectComponent.vue"
    import ListComponent from "./components/list/ListComponent.vue"
    import AlbumList from "./components/album/AlbumList.vue"
    import OneProjectComponent from "./components/project/OneProjectComponent.vue"
    import SettingsComponent from "./components/settings/SettingsComponent.vue"
    import CredentialsComponent from "./components/settings/CredentialsComponent.vue"
    import LicenseComponent from "./components/settings/LicenseComponent.vue"
    import EndComponent from "./components/settings/EndComponent.vue"

    import AbletonCompanionApp from "./app/main/AbletonCompanionApp"
    import ProjectController from "./app/controllers/ProjectController"
    import FilterOption from "./app/main/FilterOption"
    import AlbumController from "./app/controllers/AlbumController"
import Const from "./app/main/Const"

    AbletonCompanionApp.init()

    const { ipcRenderer } = require('electron');

    export default {
        name: 'App',
        components: { ProjectComponent, ListComponent, AlbumList, OneProjectComponent, SettingsComponent, CredentialsComponent, LicenseComponent, EndComponent, ProjectFilterComponent },
        data() {
            return {
                albums: AlbumController.albums,
                filter_option: new FilterOption,
                update_message: "No update message"
            }
        },
        created() {
            const currentYear = new Date().getFullYear();
/*            if (currentYear >= 2024) {
                this.filter_option.current_view = 7
                return
            }*/
            if (Const.license_accepted) {
                if (ProjectController.projects.length == 0) this.filter_option.current_view = 4
                else this.filter_option.current_view = 1
            } else {
                this.filter_option.current_view = 6
            }
        },
        mounted() {
            ipcRenderer.on('close', (event) => {
                AbletonCompanionApp.save()
            });
            ipcRenderer.on('update-message', (event, message) => {
                this.update_message = message
                this.$forceUpdate()
            });
        },
        computed: {
            force_update() {
                this.$forceUpdate()
            },
            show_all_projects() {
                return this.filter_option.current_view == FilterOption.View.ALL
            },
            show_all_albums() {
                return this.filter_option.current_view == FilterOption.View.ALBUMS
            },
            show_one_project() {
                return this.filter_option.current_view == FilterOption.View.PROJECT
            },
            show_settings() {
                return this.filter_option.current_view == 4
            },
            show_credentials() {
                return this.filter_option.current_view == 5
            },
            show_license() {
                return this.filter_option.current_view == 6
            },
            show_end() {
                return this.filter_option.current_view == 7
            },
            projects() {
                return ProjectController.filtered_projects(this.filter_option)
            }
        }
    }

</script>

<style>

    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");


    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: var(--font-family);
    }

    .app {
        padding: 20px 50px;
    }
    
    .project-container {
        width: calc(94vw-100px);
        margin-left: 6vw;
    }

    .real-project-container {
        width: calc(80vw-100px);
        margin-left: 20vw;
    }

    .album-container {
        width: calc(94vw-100px);
        margin-left: 6vw;
    }

    .settings-container {
        width: calc(94vw-100px);
        margin-left: 6vw;
    }

    .license-container {
        padding: 20px 50px;
        width: 100%;
    }

    .app-container {
        background-color: var(--bg);
        min-height: 100vh;
    }

</style>
