<template>
    <div class="content-container">
        <div class="content-header">
            <img src="../../assets/avance-rapide.png" class="content-header-image">
            Project State Parameters
        </div>
        <div class="state-content-container">
            <draggable v-model="states" handle=".point">
                <template  #item="{element:state}">
                    <div class="state-content">
                        <div class="state-flex">
                            <img src="../../assets/points.png" class="point">
                            <span class="rect-color" :style="{ '--color': state.color }" @click="color_click_state($event, state)"></span>
        
                            <div class="state-inputs">
                                <input type="text" class="name" v-model="state.name" placeholder="Project State Name"/>
                            </div>
                            <div class="close-button-container">
                                <img src="../../assets/cross.png" class="close-button" @click="remove_state(state)">
                            </div>
                        </div>
                    </div>
                </template>
            </draggable>
        </div>
        <div class="state-create"  @click="add_state">
            Create New Project State
        </div>
        <ChangeColorMenu ref="change_color_menu" @color-selected="color_selected" />
    </div>
</template>

<script>
import ProjectStateController from '@/app/controllers/ProjectStateController';
import ChangeColorMenu from "../contextMenu/ChangeColorMenu.vue"

import draggable from 'vuedraggable';

    export default {
        name: 'SettingsProjectStateComponent',
        components: { ChangeColorMenu, draggable },
        props: {},
        data() {
            return {
                states: ProjectStateController.project_states,
                current_state: null
            }
        },
        created() {
        },
        methods: {
            color_click_state(event, state) {
                this.current_state = state
                this.$refs.change_color_menu.open(event)
            },
            color_selected(color) {
                this.current_state.color = color
                this.$forceUpdate()
            },
            add_state() {
                ProjectStateController.create_empty()
                this.$forceUpdate()
            },
            remove_state(state) {
                ProjectStateController.remove_project_state(state)
                this.states = ProjectStateController.project_states
                this.$forceUpdate()
            },
        }
    }

</script>

<style scoped>

    .point {
        width: 12px;
        margin-right: 20px;
        cursor: move;
    }

    .rect-color {
        background-color: var(--color);
        padding:  9px 9px;
        border: 1px solid white;
        cursor: pointer;
    }
   
    .close-button {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .close-button-container {
        margin-left: 20px;
    }

    .state-create {
        margin-top: 20px;
        text-align: center;
        font-size: var(--normal-font-size);
        border: 1px dotted #333333;
        border-radius: 3px;
        padding: 5px 0px;
        color: #333333;
        cursor: pointer;
    }

    .state-create:hover {
        color: black;
        border: 1px dotted black;
    }

    .state-create:active {
        color: white;
        border: 1px solid white;
        background-color: var(--background-color);
    }
    .name {
        width: 100%;
        padding: 4px 20px;
        font-size: var(--small-font-size);
        background-color: #DDDDDD;
        border: 1px solid white;
    }

    .state-inputs {
        width: 100%;
        margin-left: 30px;
    }

    .state-flex {
        width: 100%;
        display: flex;
        align-items: center;
    }

    .content-container {
        padding: 20px 50px;
        width: 100%
    }

    .state-content-container {
        /* border: 1px solid var(--dark-color); */
        border-bottom: none;
        margin-top: 20px;
        border-top: 1px solid #DDDDDD;

    }

    .state-content {
        width: 100%;
        font-size: var(--normal-font-size);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #DDDDDD;
        padding: 10px 20px;
    }

    .content-header {
        display: flex;
        align-items: center;
        font-size: var(--big-font-size);
        margin-bottom: 10px;
    }


    .content-header-image {
        height: 40px;
        margin-right: 30px;
        margin-left: 30px;
        filter: brightness(0)
    }


</style>