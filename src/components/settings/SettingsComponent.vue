<template>
    <div class="settings-container">
        <div class="header-container">
            <div :class="{ 'header' : true, 'header-selected': selected(0), 'header-hover': !selected(0) }" @click="select(0)">
                Ableton
            </div>
            <div :class="{ 'header' : true, 'header-selected': selected(1), 'header-hover': !selected(1) }" @click="select(1)">
                Albums
            </div>
            <div :class="{ 'header' : true, 'header-selected': selected(2), 'header-hover': !selected(2) }" @click="select(2)">
                Tags
            </div>
            <div :class="{ 'header' : true, 'header-selected': selected(3), 'header-hover': !selected(3) }" @click="select(3)">
                Project States
            </div>
        </div>
        <div class="settings-content">
            <SettingsAbletonComponent v-if="view_index == 0" />
            <SettingsAlbumComponent v-if="view_index == 1" />
            <SettingsTagComponent v-if="view_index == 2" />
            <SettingsProjectState v-if="view_index == 3" />
        </div>
    </div>
</template>

<script>

    import SettingsAbletonComponent from "./SettingsAbletonComponent.vue"
    import SettingsAlbumComponent from "./SettingsAlbumComponent.vue"
    import SettingsTagComponent from "./SettingsTagComponent.vue"
    import SettingsProjectState from "./SettingsProjectState.vue"

    export default {
        name: 'SettingsComponent',
        components: { SettingsAbletonComponent, SettingsAlbumComponent, SettingsTagComponent, SettingsProjectState },
        props: {},
        data() {
            return {
                view_index: 0
            }
        },
        created() {
        },
        methods: {
            select(index) {
                this.view_index = index
            } ,
            selected(index) {
                return index == this.view_index
            },
      
        }
    }

</script>

<style scoped>


    .ableton-path-label {
        order: 1; 
        margin-right: 10px;
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
        padding: 5px 10px;
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

    .settings-content {
        margin-left: 10vw;
        width: 100%;
    }

    .settings-container {
        margin: 0;
        display: flex;
    }

    .header-container {
        position: fixed;
        display: flex;
        width: 10vw;
        flex-direction: column;
        height: 100vh;
        border: 1px solid #444444;
        background-color: var(--dark-color);
    }
    
    .header {
        text-align: center;
        border-bottom: 1px solid #444444;
        padding: 5px 0px;
        font-size: var(--normal-font-size);
        color: var(--secondary-text-color);
        cursor: pointer;
    }

    .header-selected {
        color: white;
        background-color: var(--background-color);
    }

    .header-hover:hover {
        color: var(--main-text-color);
    }


</style>