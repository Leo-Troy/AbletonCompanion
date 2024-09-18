<template>
    <div class="list">
        <div class="logo-container">
            <img class="logo" src="../../assets/logo.png">
        </div>
        <div class="title">Ableton Companion</div>
        <div class="show show-top">
            <div :class="{ 'show-title': true, 'title-selected': filter_option.current_view == 1 }" @click="show_all">
                Show All
            </div>
            <div class="show-content" v-show="filter_option.current_view == 1">
                <div class="input-container">
                    <input type="text" class="input-text" v-model="filter_option.search_text" placeholder="Search By Name"/>
                    <span class="reset-input" @click="reset_input">X</span>
                </div>
                <div class="show-subtitle"> 
                    Sort by <i class="italic" @click="change_ascending">({{ get_italic }})</i>
                </div>
                <div class="show-subpart" @click="sort_by_creation_date">
                    <input type="checkbox" class="show-checkbox" v-model="filter_option.sort_creation_date"/>
                    <span class="text-box">Creation Date</span>
                </div>
                <div class="show-subpart" @click="sort_by_last_modified">
                    <input type="checkbox" class="show-checkbox" v-model="filter_option.sort_last_modified"/>
                    <span class="text-box">Last Modified Date</span>
                </div>
                <div class="show-subpart" @click="sort_by_bpm" >
                    <input type="checkbox" class="show-checkbox" v-model="filter_option.sort_bpm"/>
                    <span class="text-box">Bpm</span>
                </div>
                <div class="show-subpart" @click="sort_by_duration">
                    <input type="checkbox" class="show-checkbox" v-model="filter_option.sort_duration"/>
                    <span class="text-box">Duration</span>
                </div>
                <br />
                <div class="show-subtitle2">
                    Filter by
                </div>
                <div class="show-subpart" >
                    <span class="text-box">Bpm: {{ filter_option.min_bpm }} -> {{ filter_option.max_bpm }}</span>
                </div>
                <div class="slider-container">
                    <input type="range" class="pslider pslider1" :min="0" :max="200" v-model="filter_option.min_bpm" @input="min_bpm_change()"/>
                    <input type="range" class="pslider pslider2" :min="0" :max="200" v-model="filter_option.max_bpm" @input="max_bpm_change()" />
                </div>
                <br />
                <div class="show-subpart" >
                    <span class="text-box">Duration: {{ min_duration }} -> {{ max_duration }}</span>
                </div>
                <div class="slider-container">
                    <input type="range" class="pslider pslider1" :min="0" :max="600" v-model="filter_option.min_duration" @input="min_duration_change()"/>
                    <input type="range" class="pslider pslider2" :min="0" :max="600" v-model="filter_option.max_duration" @input="max_duration_change()" />
                </div>
                <br />
                <div class="show-subtitle2">
                    Filter by Tags
                </div>
                <div class="show-tags" >
                    <NoTagParamComponent :filter_option="filter_option" />
                    <TagParamComponent v-for="tag in tags" :tag="tag" :filter_option="filter_option" />
                </div>
                <br />
                <div class="show-subtitle2">
                    Filter by Project State
                </div>
                <div class="show-tags" >
                    <StateParamComponent v-for="state in states" :state="state" :filter_option="filter_option" />
                </div>
                <br />
            </div>
        </div>
        <div class="show" @click="show_albums">
            <div :class="{ 'show-title': true, 'title-selected': filter_option.current_view == 2 }">
                Show Albums
            </div>
        </div>
        <div class="show" @click="show_settings">
            <div :class="{ 'show-title': true, 'title-selected': filter_option.current_view == 4 }">
                Settings
            </div>
        </div>
        <div class="show" @click="show_credentials">
            <div :class="{ 'show-title': true, 'title-selected': filter_option.current_view == 5 }">
                Credentials
            </div>
        </div>
    </div>
</template>

<script>

    import TagController from "@/app/controllers/TagController"
    import FilterOption from "../../app/main/FilterOption"
    import TagParamComponent from "./TagParamComponent.vue"
    import NoTagParamComponent from "./NoTagParamComponent.vue"
    import StateParamComponent from "./StateParamComponent.vue"
    import ProjectStateController from "@/app/controllers/ProjectStateController"

    export default {
        name: 'ListComponent',
        components: { TagParamComponent, NoTagParamComponent, StateParamComponent },
        props: { filter_option: Object },
        data() {
            return {
                tags: TagController.tags,
                states: ProjectStateController.project_states
            }
        },
        computed: {
            get_italic() {
                return this.filter_option.ascending ? "ascending": "descending"
            },
            min_duration() {
                const nice_string = (n) => {
                    return n >= 10 ? n.toString() : "0" + n.toString()
                }
                const minute = parseInt(this.filter_option.min_duration / 60)
                const seconds = this.filter_option.min_duration % 60
                return nice_string(minute) + ":" + nice_string(seconds)
            },
            max_duration() {
                const nice_string = (n) => {
                    return n >= 10 ? n.toString() : "0" + n.toString()
                }
                const minute = parseInt(this.filter_option.max_duration / 60)
                const seconds = this.filter_option.max_duration % 60
                return nice_string(minute) + ":" + nice_string(seconds)
            }
        },
        methods: {
            min_bpm_change() {
                if (parseInt(this.filter_option.min_bpm) >= parseInt(this.filter_option.max_bpm)) this.filter_option.min_bpm = parseInt(this.filter_option.max_bpm) - 1
            },
            max_bpm_change() {
                if (parseInt(this.filter_option.max_bpm) <= parseInt(this.filter_option.min_bpm)) this.filter_option.max_bpm = parseInt(this.filter_option.min_bpm) + 1
            },
            min_duration_change() {
                if (parseInt(this.filter_option.min_duration) >= parseInt(this.filter_option.max_duration)) this.filter_option.min_duration = parseInt(this.filter_option.max_duration) - 1
            },
            max_duration_change() {
                if (parseInt(this.filter_option.max_duration) <= parseInt(this.filter_option.min_duration)) this.filter_option.max_duration = parseInt(this.filter_option.min_duration) + 1
            },
            change_ascending() {
                this.filter_option.ascending = !this.filter_option.ascending
            },
            show_albums() {
                this.filter_option.current_view = FilterOption.View.ALBUMS
                this.$forceUpdate()
            },
            show_all() {
                this.filter_option.current_view = FilterOption.View.ALL
                this.tags = TagController.tags
                this.states = ProjectStateController.project_states
                this.$forceUpdate()
                this.$emit("force-update")
            },
            show_settings() {
                this.filter_option.current_view = 4
            },
            show_credentials() {
                this.filter_option.current_view = 5
            },
            sort_by_creation_date(event) {
                this.filter_option.sort_by_creation_date()
            },
            sort_by_last_modified() {
                this.filter_option.sort_by_last_modified()
            },
            sort_by_bpm() {
                this.filter_option.sort_by_bpm()
            },
            sort_by_duration() {
                this.filter_option.sort_by_duration()
            }, 
            reset_input() {
                this.filter_option.search_text = ""
            }
        }
    }

    /*
        Sort: creation date, last modified, bpm, duration
    */

</script>

<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap");

    .input-container {
        display: flex;
        margin-bottom: 10px;
        align-items: center;
    }

    .reset-input {
        
        padding: 3px 6px;
        margin-left: 5px;
        border-radius: 3px;
        background-color: transparent;
        border: 1px solid var(--secondary-text-color);
        color: var(--main-text-color);
        cursor: pointer;
    }

    .reset-input:hover {
        background-color: red;
        color: white;
        border: 1px solid white;
    }
    .input-text {
        width: 85%;
        background-color: transparent;
        border: 1px solid var(--secondary-text-color);
        border-radius: 4px;
        padding: 2px 10px;
        color: var(--main-text-color);
    }

    .title-selected {
        color: var(--background-color)
    }

    .slider {
        position: absolute;
        appearance: none;
        background-color: transparent;
        outline: none;
        pointer-events: none;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        pointer-events: auto;
        background-color: #fcc25a;
        height: 0.8em;
        width: 0.8em;
        border-radius: 50%;
        margin-top: -4px;
    }

    .slider::-webkit-slider-runnable-track {
        -webkit-appearance: none;
    }

    #slider1::-webkit-slider-runnable-track {
        height: 0.2em;
        width: 100%;
        background-color: #888888;
    }

    .pslider {
        position: absolute;
        appearance: none;
        background-color: transparent;
        outline: none;
        pointer-events: none;
        width: 100%;
        padding: 0px 15px;
    }

    .pslider::-webkit-slider-thumb {
        -webkit-appearance: none;
        pointer-events: auto;
        background-color: var(--background-color);
        height: 0.8em;
        width: 0.8em;
        border-radius: 50%;
        margin-top: -4px;
    }

    .pslider::-webkit-slider-runnable-track {
        -webkit-appearance: none;
    }

    .pslider1::-webkit-slider-runnable-track {
        height: 0.2em;
        width: 100%;
        background-color: #888888;
    }

    .slider-container {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .show-checkbox {
        width: 12px;
        height: 12px;
        appearance: none;
        border: 1px solid var(--secondary-text-color);
        border-radius: 4px;
        background-color: transparent;
        cursor: pointer;
        pointer-events: none;
    }

    .show-checkbox:checked {
        background-color: var(--background-color); /* Change the background color when checked */
        border-color: var(--background-color); /* Change the border color when checked */
    }
    .show-content {
        font-size: var(--small-font-size);
        margin-top: 5px;
    }

    .show-subtitle {
        margin-bottom: 3px;
    }

    .show-subtitle2 {
        margin-top: 5px;
        margin-bottom: 3px;
    }

    .text-box {
        margin-left: 5px;
    }

    .show-subpart {
        display: flex;
        align-items: center;
    }

    .show-tags {
        display: flex;
        flex-wrap: wrap;
    }

    .list {
        position: fixed;
        top: 0;
        left: 0;
        width: 10vw;
        height: 100vh;
        background-color: var(--dark-color);
    }

    .logo-container {
        width: 100%;
        display: flex;
        justify-content: center
    }

    .logo {
        margin-top: 10px;
        width: 75%;
    }

    .title {
        font-family: 'Rock Salt', cursive;
        text-align: center;
        font-size: 14px;
        color: var(--background-color);
        margin-bottom: 15px;
    }

    .show {
        border-bottom: 1px solid var(--secondary-text-color);
        color: var(--secondary-text-color);
        padding: 4px 10px;
        font-size: var(--normal-font-size);
        cursor: pointer;
    }

    .show-top {
        border-top: 1px solid var(--secondary-text-color);
    }

    .show-title {
        font-weight: bold;
    }

    .show-title:hover {
        color: var(--main-text-color);
    }



</style>

