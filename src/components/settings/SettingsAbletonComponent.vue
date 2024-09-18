<template>
    <div class="content-container">
        <div class="content-header">
            <img src="../../assets/Ableton_Live_logo.png" class="content-header-image">
            Ableton Live Parameters
        </div>
        <div class="content-content">
            <div class="ableton-path-label">
                Ableton Project Path:
            </div>
            <div class="ableton-path-value">
                {{ ableton_folder }}
                <input type="file" ref="folderInput"  webkitdirectory directory multiple style="display: none;" class="settings-text-input" @change="change_ableton_folder"/>
            </div>
            <div class="explorer-button" @click="open_folder">
                Open With Explorer
            </div>
        </div>
    </div>
</template>

<script>
import AbletonCompanionApp from '@/app/main/AbletonCompanionApp';
import Const from '@/app/main/Const';



    export default {
        name: 'SettingsAbletonComponent',
        components: { },
        props: {},
        data() {
            return {
                ableton_folder: Const.project_path,
            }
        },
        created() {
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
        }
    }

</script>

<style scoped>


    .ableton-path-label {
        order: 1; 
        margin-right: 10px;
        background-color: var(--dark-color);
        padding: 5px 10px;
        color: var(--main-text-color)
    }

    .ableton-path-value {
        flex: 1;
        order: 2; 
        
    }
    .explorer-button {
        order: 3;
        background-color: var(--secondary-text-color);
        font-size: var(--small-font-size);
        color: var(--main-text-color);
        padding: 2px 30px;
        border-radius: 2px;
        cursor: pointer;
        margin-right: 10px;
    }

    .explorer-button:hover {
        background-color: var(--dark-color);
    }

    .explorer-button:active  {
        background-color: var(--background-color);
    }

    .content-container {
        padding: 20px 50px;
        width: 100%
    }

    .content-content {
        border: 1px solid #DDDDDD;
        width: 100%;
        margin-top: 20px;
        font-size: var(--normal-font-size);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .content-header {
        display: flex;
        align-items: center;
        font-size: var(--big-font-size);
    }


    .content-header-image {
        height: 40px;
        margin-right: 30px;
        margin-left: 30px;
    }


</style>