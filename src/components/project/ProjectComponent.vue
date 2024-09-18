<template>
    <div class="project">
        <AlbumComponent :project="project" size="40px" />
        <div class="project-content">
            <div class="top">
                <span class="project-title">
                    {{ project.get_name() }}
                </span>
                <!-- <span class="live-set-title">
                    {{ project.get_main_live_set().get_name() }}
                </span> -->
                <ProjectStateComponent :project="project"/>
                
                <div class="tags" ref="tags_html">
                    <TagComponent v-for="tag in project.get_tags()" :tag="tag" :project="project" @force-update="force_update"  />
                    <AddTagComponent :project="project" v-if="project.get_other_tags().length != 0" @force-update="force_update" ref="add_tag_html"/>
                </div>
            </div>
            <div>
                <span class="project-bpm">
                    {{ bpm }} bpm
                </span>
                <span class="project-bpm">
                    -
                </span>
                <span class="project-bpm">
                    {{ project.get_main_live_set().duration }}
                </span>
                <span class="project-bpm">
                    -
                </span>
                <span class="project-bpm">
                    {{ project.get_main_live_set().track_count }} tracks
                </span>
                <div class="open-button" @click="open_on_ableton">
                    Open
                </div>
                <div class="open-button" @click="show_details">
                    See Details
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

.open-button {
        background-color: transparent;
        float: right;
        text-align: center;
        width: 120px;
        font-size: var(--small-font-size);
        padding: 2px 0px;
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


.tags {
    float: right;
}
    .flex {
        display: flex;
        justify-content: space-between;
    }

    .top {
        /* display: flex; */
        margin-bottom: 0px;
        width: 100%;
    }

    .project-bpm {
        color: var(--secondary-text-color);
        font-size: var(--small-font-size);
        margin-right: 6px;
        /* border: 1px solid var(--main-text-color); */
        /* padding: 1px 4px; */
        border-radius: 6px;
    }

    .project-content {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        justify-content: space-between;
        width: 100%;
    }
    .project {
        background-color: var(--dark-color);
        margin-bottom: 10px;
        padding: 10px 20px;
        border-radius: 4px;
        font-size: var(--normal-font-size);
        color: var(--main-text-color);
        display: flex;
        /* align-items: center; */
    }

    .live-set-title {
        color: var(--secondary-text-color);
        font-size: var(--small-font-size);
        margin-left: 10px;
    }

    .project-title {
        color: var(--main-text-color);
        font-size: var(--big-font-size);
        margin-right: 10px;
    }

</style>