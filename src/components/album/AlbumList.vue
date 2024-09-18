<template>
    <div class="album">
        <div class="album-header">
            <span><img :src="album.image" class="album-img"></span>
            <div class="title-container">
                <span class="album-label">ALBUM</span>
                <span class="album-title">{{ album.name }}</span>
                <span class="album-description">{{ album.description }}</span>
                <span class="album-description">
                    {{ album.get_all_projects().length }} songs, {{ album.get_duration() }}
                </span>
            </div>
        </div>
        <div class="album-content">
            <div class="project-container">
                <div class="project-label">TITLE</div>
                <div class="project-label">DURATION</div>
                <div class="project-label">STATUS</div>
                <div class="project-label"></div>
                <div class="project-label"></div>
            </div>
            <div class="project-container" v-for="(project, index) in album.get_all_projects()">
                <div :class="{'project': true, 'bottom': index == album.get_all_projects().length - 1 }">{{ project.get_name() }}</div>
                <div :class="{'project': true, 'bottom': index == album.get_all_projects().length - 1 }">{{ project.get_main_live_set().duration }}</div>
                <div :class="{'project': true, 'bottom': index == album.get_all_projects().length - 1 }">{{ project.get_state().name }}</div>
                <div :class="{'project': true, 'bottom': index == album.get_all_projects().length - 1 }">
                    <div class="project-button" @click="show_details(project)">Show Details</div>
                </div>
                <div :class="{'project': true, 'bottom': index == album.get_all_projects().length - 1 }">
                    <div class="project-button"  @click="open_on_ableton(project)">Open</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import FilterOption from '@/app/main/FilterOption'

    export default {
        name: 'AlbumList',
        components: {},
        props: { album: Object, filter_option: Object },
        data() {
            return {

            }
        },
        methods: {
            open_on_ableton(project) {
                project.get_main_live_set().open_on_ableton()
            },
            show_details(project) {
                this.filter_option.current_project = project
                this.filter_option.current_view = FilterOption.View.PROJECT
            }
        }
    }

</script>

<style scoped>

    .project-button {
        border: 1px solid var(--secondary-text-color);
        text-align: center;
        border-radius: 4px;
        color: var(--secondary-text-color);
        cursor: pointer;
    }

    .project-button:hover {
        border: 1px solid var(--main-text-color);
        color: var(--main-text-color);
    }

    .title-container {
        display: flex;
        flex-direction: column;
    }

    .album {
        background-color: var(--dark-color);
        margin-bottom: 10px;
        border-radius: 6px;
        padding: 5px 0px;
    }

    .album-header {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        padding: 5px 30px;
        padding-left: 10px;
        background-color: var(--dark-color);
        display: flex;
        align-items: center;
        width: 100%;
    }

    .album-img {
        height: 80px;
        width: auto;
    }

    .album-title {
        color: var(--main-text-color);
        font-size: var(--big-font-size);
        margin-left: 20px;
        font-weight: bold;
        letter-spacing: 1px;
        margin-bottom: 5px;
    }

    .album-description {
        color: var(--secondary-text-color);
        font-size: var(--small-font-size);
        margin-left: 20px;
        margin-bottom: 5px;
    }

    .album-label {
        color: var(--main-text-color);
        font-size: var(--small-font-size);
        margin-left: 20px;
        font-weight: bold;
        letter-spacing: 1px;
    }
    .project-container {
        display: flex;
        margin-left: 10px;
    }

    .project {
        font-size: var(--small-font-size);
        color: var(--main-text-color);
        padding: 5px 20px;
        width: calc(100% - 10px);
        border-top: 1px solid #555555
    }

    .project-label {
        font-size: var(--small-font-size);
        color: var(--secondary-text-color);
        padding: 5px 20px;
        width: calc(100% - 10px);
        letter-spacing: 1px;
    }

    .bottom {
        border-bottom: 1px solid #555555
    }

    .album-prop {
        color: var(--main-text-color);
        font-size: var(--small-font-size);
        margin-left: 6px;
        border: 1px solid var(--main-text-color);
        padding: 1px 4px;
        border-radius: 6px;
    }

</style>