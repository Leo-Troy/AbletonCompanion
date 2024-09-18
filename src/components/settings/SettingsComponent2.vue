<template>
    <div class="settings-container">
        <div class="settings-name">
            Ableton Parameters:
        </div>
        <div class="settings-subname">
            Projects Folder Path:
        </div>
        <div class="file-input-container">
            <span type="text" class="settings-text-input">{{ ableton_folder }}</span>
            <input type="file" ref="folderInput"  webkitdirectory directory multiple style="display: none;" class="settings-text-input" @change="change_ableton_folder"/>
            <div @click="open_folder" class="button-explorer">Open Explorer</div>
        </div>
    </div>
    <div class="settings-container">
        <div class="settings-name">
            Albums:
        </div>
        <input type="file" accept="image/*" @change="handleImageSelection" ref="imageInput" style="display: none">
        <div v-for="album in albums" class="album-container">
            <img :src="album.image" class="album-img" v-if="album.image_is_valid()" @click="change_album_image(album)" />
            <img src="no-img.jpg" class="album-img" v-if="!album.image_is_valid()" @click="change_album_image(album)" />
            <div class="album-content">
                <div class="settings-subname">
                    Name:
                </div>
                <input type="text" class="settings-text-input" v-model="album.name" />
                <div class="settings-subname">
                    Description:
                </div>
                <input type="text" class="settings-text-input" v-model="album.description" />
            </div>
            <div class="album-close" @click="remove_album(album)">X</div>
        </div>
        <div class="add-button" @click="add_album">+ Add Album +</div>
    </div>
    <div class="settings-container">
        <div class="settings-name">
            Project State:
        </div>
        <div v-for="(project_state, index) in project_states" class="album-container">
            <span class="rect-color" :style="{ '--color': project_state.color }" @click="color_click_project_state($event, project_state)"></span>
            <input type="text" class="settings-text-input" v-model="project_state.name" />
            <div class="album-close" @click="remove_project_state(project_state)" v-if="index != 0">X</div>
        </div>
        <div class="add-button" @click="add_project_state">+ Add Project State +</div>
    </div>
    <div class="settings-container">
        <div class="settings-name">
            Tags:
        </div>
        <div v-for="tag in tags" class="album-container">
            <span class="rect-color" :style="{ '--color': tag.color }" @click="color_click_tag($event, tag)"></span>
            <input type="text" class="settings-text-input" v-model="tag.name" />
            <div class="album-close" @click="remove_tag(tag)" v-if="tags.length != 1">X</div>
        </div>
        <div class="add-button" @click="add_tag">+ Add Tag +</div>
    </div>
    <ChangeColorMenu ref="change_color_menu" @color-selected="color_selected" />
</template>

<script>
import Const from '@/app/main/Const';
import AlbumController from '@/app/controllers/AlbumController';
import AbletonCompanionApp from '@/app/main/AbletonCompanionApp';
import ProjectStateController from '@/app/controllers/ProjectStateController';

import ChangeColorMenu from '../contextMenu/ChangeColorMenu.vue';
import TagController from '@/app/controllers/TagController';


    export default {
        name: 'SettingsComponent',
        components: { ChangeColorMenu },
        props: {},
        data() {
            return {
                ableton_folder: Const.project_path,
                albums: AlbumController.albums,
                current_album: null,
                project_states: ProjectStateController.project_states,
                tags: TagController.tags,
                current_project_state: null,
                current_tag: null,
            }
        },
        created() {
            this.ableton_folder = Const.project_path
            if (this.ableton_folder == 0) this.ableton_folder = ""
        },
        methods: {
            change_ableton_folder(event) {
                if (event.target.files.length == 0) return
                const folderPath = event.target.files[0].path;
                const new_folder = folderPath.split('\\')
                const new_relative = event.target.files[0].webkitRelativePath.split('/')
                for (let i = new_folder.length - 1; i >= 0; i--) {
                    if (new_folder[i] == new_relative[0]) break
                    new_folder.pop()
                }
                Const.set_project_path(new_folder.join("\\"))
                this.ableton_folder = Const.project_path
                AbletonCompanionApp.save()
                AbletonCompanionApp.init()
                this.$emit("force-update")
            },
            open_folder() {
                this.$refs.folderInput.click();
            },
            add_album() {
                AlbumController.create_empty("")
                this.$forceUpdate()
            },
            change_album_image(album) {
                this.current_album = album
                this.$refs.imageInput.click();
            },
            handleImageSelection(event) {
                if (event.target.files.length > 0) {
                    const file = event.target.files[0];
                    this.current_album.image = file.path
                }
                this.$forceUpdate()
            }, 
            remove_album(album) {
                AlbumController.remove_album(album)
                this.albums = AlbumController.albums
                this.$forceUpdate()
            },
            color_click_project_state(event, project_state) {
                this.current_project_state = project_state
                this.current_tag = null
                this.$refs.change_color_menu.open(event)
            },
            color_click_tag(event, tag) {
                this.current_tag = tag
                this.current_project_state = null
                this.$refs.change_color_menu.open(event)
            },
            color_selected(color) {
                if (this.current_project_state != null) {
                    this.current_project_state.color = color
                    this.current_project_state = null
                }
                if (this.current_tag != null) {
                    this.current_tag.color = color
                    this.current_tag = null
                }
                this.$forceUpdate()
            },
            add_project_state() {
                ProjectStateController.create_empty()
                this.$forceUpdate()
            },
            remove_project_state(project_state) {
                ProjectStateController.remove_project_state(project_state)
                this.project_states = ProjectStateController.project_states
                this.$forceUpdate()
            },
            add_tag() {
                TagController.create_empty()
                this.$forceUpdate()
            },
            remove_tag(tag) {
                TagController.remove_tag(tag)
                this.tags = TagController.tags
                this.$forceUpdate()
            },
        }
    }

</script>

<style scoped>


    .rect-color {
        background-color: var(--color);
        padding:  9px 9px;
        border: 1px solid white;
        margin-right: 10px;
    }
    .album-close {
        margin-left: 30px;
        background-color: red;
        color: white;
        font-size: var(--small-font-size);
        padding: 3px 5px;
        border-radius: 5px;
        cursor: pointer;
    }
    .add-button {
        border: 1px dotted var(--dark-color);
        text-align: center;
        margin-top: 5px;
        border-radius: 4px;
        color: var(--dark-color);
        cursor: pointer;
    }

    .add-button:hover {
        border: 1px dotted black;
        color: black
    }

    .album-content {
        width: 100%
    }

    .album-container {
        margin: 0;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        width: 100%;
    }

    .album-img {
        cursor: pointer;
        height: 60px;
        width: 60px;
        margin-right: 30px;
    }

    .button-explorer {
        color: white;
        background-color: blue;
        width: 150px;
        margin-left: 10px;
        padding: 2px 10px;
        text-align: center;
        border: 1px solid white;
        font-size: var(--small-font-size);
        border-radius: 4px;
        cursor: pointer;
    }

    .file-input-container {
        display: flex;
        align-items: center;
    }

    .settings-container {
        font-size: var(--normal-font-size);
        color: var(--dark-color);
        border: 1px solid var(--dark-color);
        border-radius: 5px;
        margin: 0;
        margin-bottom: 10px;
        padding: 10px 30px;
    }

    .settings-name {
        margin-bottom: 10px;
    }

    .settings-subname {
        font-size: var(--small-font-size);
        margin-bottom: 2px;
    }

    .settings-text-input {
        width: 100%;
        border: 1px solid var(--dark-color);
        font-size: var(--small-font-size);
        padding-left: 10px;
        border-radius: 4px;
        background-color: transparent;
        height: 16px
    }

</style>