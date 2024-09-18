<template>
    <div class="project" :class="{ 'yellow-border': live_set.is_updated }">
        <AlbumComponent :project="project"  @force-update=""/>
        <div class="content-container">
            <div class="left-side">
                <div class="project-title-container">
                        <div class="project-title">
                            {{ project.get_name() }}
                        </div>
                        <div  class="state">
                            <ProjectStateComponent :project="project"  @force-update=""/>
                        </div>
                </div>
            </div>
            <div class="right-side">
                <div class="tags">
                    <TagComponent v-for="tag in project.get_tags()" :tag="tag" :project="project" @force-update=""/>
                    <AddTagComponent :project="project" v-if="project.get_other_tags().length != 0"  @force-update=""/>
                </div>
            </div>
        </div>
    </div>
    <LiveSetComponent v-for="live_set in project.get_live_sets_first_main()" :live_set="live_set" :project="project" />
</template>

<script>

    import TagComponent from './TagComponent.vue';
    import AddTagComponent from './AddTagComponent.vue';
    import AlbumComponent from "./AlbumComponent.vue"
    import LiveSetComponent from './LiveSetComponent.vue';
    import ProjectStateComponent from './ProjectStateComponent.vue';

    export default {
        name: 'OneProjectComponent',
        components: { TagComponent, AddTagComponent, AlbumComponent, LiveSetComponent, ProjectStateComponent },
        props: { project: Object },
        data() {
            return {
                live_set: this.project.get_main_live_set()
            }
        },
        methods: {
            open_on_ableton() {
                this.live_set.open_on_ableton()
            }
        }
    }

</script>

<style scoped>

    .open-button-container {
        margin-top: 37px;
    }
    
    .open-button {
        background-color: transparent;
        float: right;
        text-align: center;
        width: 120px;
        font-size: var(--small-font-size);
        padding: 3px 0px;
        border: 1px solid var(--secondary-text-color);
        color: var(--secondary-text-color);
        border-radius: 4px;
        cursor: pointer;
        margin-left: 12px;
    }

    .open-button:hover {
        color: var(--main-text-color);
        border: 1px solid var(--main-text-color);
    }

    .project {
        background-color: var(--dark-color);
        padding: 10px 30px;
        padding-left: 10px;
        margin-bottom: 10px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
    }
    
    .yellow-border {
        border: 3px solid var(--yellow)
    }

    .content-container {
        display: flex;
        width: 100%;
    }

    .left-side {
        flex: 60;
    }

    .right-side {
        display: flex;
        flex-direction: column;
        flex: 40;
    }

    .project-title {
        color: var(--main-text-color);
        font-size: var(--big-font-size);
        letter-spacing: 1px;
        margin-top: 28px;
        margin-left: 30px;
    }

    .state {
        margin-top: 28px;
    }

    .project-bpm {
        color: var(--main-text-color);
        font-size: var(--small-font-size);
        margin-left: 6px;
        border: 1px solid var(--main-text-color);
        padding: 1px 4px;
        border-radius: 6px;
    }

    .live-set-title {
        color: var(--main-text-color);
        font-size: var(--normal-font-size);
    }

    .live-set-properties {
        margin-top: 20px;
        color: var(--secondary-text-color);
        font-size: var(--small-font-size);
    }

    .live-set-sample-properties {
        color: var(--secondary-text-color);
        font-size: var(--small-font-size);
    }


    .project-title-container {
        display: flex;
        align-items: center;
    }

    .red {
        color: red
    }

</style>