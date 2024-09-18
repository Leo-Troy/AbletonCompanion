<template>
    <div class="project" :class="{ 'yellow-border': project.get_main_live_set().is_updated }">
        <AlbumComponent :project="project" />
        <div class="content-container">
            <div class="left-side">
                <div class="project-title-container">
                    <span class="project-title">
                        {{ project.get_name() }}
                    </span> 
                    <ProjectStateComponent :project="project"/>
                    <span class="project-bpm">
                        {{ bpm }} bpm
                    </span>
                    <span class="project-bpm">
                        {{ project.get_main_live_set().duration }}
                    </span>
                    <span class="project-bpm">
                        {{ project.get_main_live_set().track_count }} tracks
                    </span>
                </div>
                <div class="live-set-title">
                    {{ project.get_main_live_set().get_name() }}
                </div>
                <div class="live-set-properties">
                    Using {{ project.get_main_live_set().get_sample_count() }} samples <span v-if="project.get_main_live_set().get_not_valid_sample_count() != 0" class="red">({{ project.get_main_live_set().get_not_valid_sample_count() }} not found)</span>
                </div>
                <div class="live-set-sample-properties">
                    Using {{ project.get_main_live_set().get_vst_count() }} plugins <span v-if="project.get_main_live_set().get_not_valid_vst_count() != 0" class="red">({{ project.get_main_live_set().get_not_valid_vst_count() }} not found)</span>
                </div>
            </div>
            <div class="right-side">
                <div class="tags" ref="tags_html">
                    <TagComponent v-for="tag in project.get_tags()" :tag="tag" :project="project" @force-update="force_update"  />
                    <AddTagComponent :project="project" v-if="project.get_other_tags().length != 0" @force-update="force_update" ref="add_tag_html"/>
                </div>
                <div class="open-button-container">
                    <div class="open-button" @click="open_on_ableton">
                        Open
                    </div>
                    <div class="open-button" @click="show_details">
                        See Details
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import TagComponent from './TagComponent.vue';
    import AddTagComponent from './AddTagComponent.vue';
    import AlbumComponent from "./AlbumComponent.vue"
    import ProjectStateComponent from './ProjectStateComponent.vue';
    import ProjectFilterComponent from './ProjectFilterComponent.vue';

    import FilterOption from '@/app/main/FilterOption';

    export default {
        name: 'ProjectComponent',
        components: { TagComponent, AddTagComponent, AlbumComponent, ProjectStateComponent, ProjectFilterComponent },
        props: { project: Object, filter_option: Object },
        data() {
            return {
            }
        },
        computed: {
            bpm() {
                return this.project.get_main_live_set().bpm
            }
        },
        methods: {
            open_on_ableton() {
                this.project.get_main_live_set().open_on_ableton()
            },
            show_details() {
                this.filter_option.current_project = this.project
                this.filter_option.current_view = FilterOption.View.PROJECT
            },
            force_update() {
                // this.$refs.add_tag_html.force_menu_update()
                this.$forceUpdate()
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
    }
    
    .yellow-border {
        border: 3px solid var(--yellow)
    }

    .content-container {
        margin: 0;
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
        font-size: var(--normal-font-size);
        letter-spacing: 1px;
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
        color: var(--secondary-text-color);
        font-size: var(--small-font-size);
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