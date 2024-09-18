<template>
    <div class="project" :class="{ 'yellow-border': live_set == project.get_main_live_set() }">
        <div class="content-container">
            <div class="left-side">
                <div class="project-title-container">
                    <span class="project-title">
                        {{ live_set.get_name() }}
                    </span>
                    <span class="project-bpm">
                        {{ live_set.bpm }} bpm
                    </span>
                    <span class="project-bpm">
                        {{ live_set.duration }}
                    </span>
                    <span class="project-bpm">
                        {{ live_set.track_count }} tracks
                    </span>
                </div>
                <div class="live-set-properties">
                    Creation Date : {{ live_set.get_creation_date() }}
                </div>
                <div class="live-set-properties">
                    Last Modified Date : {{ live_set.get_last_modified().toLocaleString() }}
                </div>
                <div class="live-set-properties">
                    Size : {{ live_set.get_size() }}Mb
                </div>
                <!-- <div class="live-set-properties">
                    Using {{ live_set.get_sample_count() }} samples <span v-if="live_set.get_not_valid_sample_count() != 0" class="red">({{ live_set.get_not_valid_sample_count() }} not found)</span>
                </div>
                <div class="live-set-sample-properties">
                    Using {{ live_set.get_vst_count() }} plugins <span v-if="live_set.get_not_valid_vst_count() != 0" class="red">({{ live_set.get_not_valid_vst_count() }} not found)</span>
                </div> -->

                <div class="down">
                    <div class="down-header" @click="open_samples()">
                        <img v-if="!sample_open" src="../../assets/tri-right.png" class="triangle">
                        <img v-if="sample_open" src="../../assets/tri-down.png" class="triangle">
                        <span class="down-title">
                            Using {{ live_set.get_sample_count() }} samples <span v-if="live_set.get_not_valid_sample_count() != 0" class="red">({{ live_set.get_not_valid_sample_count() }} not found)</span>
                        </span>
                    </div>
                    <div class="down-content" v-show="sample_open">
                        <div v-for="sample in live_set.get_samples()" :class="{ 'sample': true, 'red': !sample.is_valid() }">
                            {{ sample.path }}
                        </div>
                    </div>
                </div>

                <div class="down">
                    <div class="down-header" @click="open_vsts()">
                        <img v-if="!vst_open" src="../../assets/tri-right.png" class="triangle">
                        <img v-if="vst_open" src="../../assets/tri-down.png" class="triangle">
                        <span class="down-title">
                            Using {{ live_set.get_vst_count() }} vsts <span v-if="live_set.get_not_valid_vst_count() != 0" class="red">({{ live_set.get_not_valid_vst_count() }} not found)</span>
                        </span>
                    </div>
                    <div class="down-content" v-show="vst_open">
                        <div v-for="vst in live_set.get_vsts()" :class="{ 'sample': true, 'red': !vst.is_valid() }">
                            {{ vst.path }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-side">
                <div class="open-button-container">
                    <div class="open-button" @click="open_on_ableton">
                        Open
                    </div>
                    <div v-if="live_set != project.get_main_live_set()" class="open-button" @click="set_master">
                        Set Master
                    </div>
                    <div v-if="live_set == project.get_main_live_set() && project.main_live_set_id != null" class="open-button" @click="unmaster">
                        Unmaster
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

    export default {
        name: 'LiveSetComponent',
        components: { TagComponent, AddTagComponent, AlbumComponent },
        props: { live_set: Object, project: Object },
        data() {
            return {
                sample_open: false, vst_open: false
            }
        },
        methods: {
            open_on_ableton() {
                this.live_set.open_on_ableton()
            },
            open_samples() {
                this.sample_open = !this.sample_open
            },
            open_vsts() {
                this.vst_open = !this.vst_open
            },
            set_master() {
                this.project.main_live_set_id = this.live_set.id
            },
            unmaster() {
                this.project.main_live_set_id = null
            },
        }
    }

</script>

<style scoped>

    .red {
        color: red;
    }

    .sample {
        font-size: var(--small-font-size);
        color: var(--secondary-text-color);
    }

    .down-content {
        margin-top: 10px;
    }

    .down {
        border: 1px solid var(--secondary-text-color);
        border-radius: 4px;
        margin-top: 10px;
        padding: 5px 5px;
    }

    .down-title {
        font-size: var(--small-font-size);
        margin-left: 10px;
    }
    
    .down-header:hover {
        color: var(--main-text-color);
    }
    
    .triangle {
        height: 10px;
        width: auto;
        margin-left: 10px;
    }
    
    .down-header {
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        cursor: pointer;
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
        margin-bottom: 5px;
    }

    .open-button:hover {
        color: var(--main-text-color);
        border: 1px solid var(--main-text-color);
    }

    .project {
        background-color: var(--dark-color);
        padding: 10px 30px;
        margin-bottom: 10px;
        border-radius: 6px;
        display: flex;
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
        flex: 10;
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
        /* margin-top: 20px; */
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
        margin-bottom: 20px;
    }

    .red {
        color: red
    }

</style>