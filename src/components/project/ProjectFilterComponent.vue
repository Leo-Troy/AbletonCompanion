<template>
    <div class="tab">
        <div class="input-container">
            <input type="text" class="input-text" v-model="filter_option.search_text" placeholder="Search By Name"/>
            <img class="img" src="../../assets/cross.png" @click="reset_input" />
        </div>
        <div class="header" :class="{ 'border-bottom': !sort_visible }" @click="set_sort_visible">
            Sorting Options
        </div>
        <div class="content" v-show="sort_visible" :class="{ 'border-bottom': sort_visible }">
            <div class="one-button" @click="change_italic">
                <i>{{ get_italic }}</i>
            </div>
            <div class="checkbox-button" @click="sort_by_creation_date">
                <input type="checkbox" class="checkbox"  v-model="filter_option.sort_creation_date">
                By Creation Date
            </div>
            <div class="checkbox-button" @click="sort_by_last_modified">
                <input type="checkbox" class="checkbox"  v-model="filter_option.sort_last_modified">
                By Modified Date
            </div>
            <div class="checkbox-button" @click="sort_by_bpm">
                <input type="checkbox" class="checkbox"  v-model="filter_option.sort_bpm">
                By Bpm
            </div>
            <div class="checkbox-button" @click="sort_by_duration">
                <input type="checkbox" class="checkbox"  v-model="filter_option.sort_duration">
                By Duration
            </div>
        </div>
        <div class="header" :class="{ 'border-bottom': !filter_visible }" @click="set_filter_visible">
            Filtering Options
        </div>
        <div class="content" v-show="filter_visible" :class="{ 'border-bottom': filter_visible }">
            <div class="one-label">
                By Bpm: {{ filter_option.min_bpm }} -> {{ filter_option.max_bpm }}
            </div>
            <div class="slider-container">
                <input type="range" class="pslider pslider1" :min="0" :max="200" v-model="filter_option.min_bpm" @input="min_bpm_change()"/>
                <input type="range" class="pslider pslider2" :min="0" :max="200" v-model="filter_option.max_bpm" @input="max_bpm_change()" />
            </div>
            <div class="one-label">
                By Duration: {{ min_duration }} -> {{ max_duration }}
            </div>
            <div class="slider-container">
                <input type="range" class="pslider pslider1" :min="0" :max="600" v-model="filter_option.min_duration" @input="min_duration_change()"/>
                <input type="range" class="pslider pslider2" :min="0" :max="600" v-model="filter_option.max_duration" @input="max_duration_change()" />
            </div>
            <div class="one-label">
                By Project State
            </div>
            <div class="show-tags" >
                <StateParamComponent v-for="state in states" :state="state" :filter_option="filter_option" />
            </div>
            <div class="one-label">
                By Tag
            </div>
            <div class="show-tags" >
                <NoTagParamComponent :filter_option="filter_option" />
                <TagParamComponent v-for="tag in tags" :tag="tag" :filter_option="filter_option" />
            </div>
        </div>
    </div>
</template>
 
<script>

    import ProjectStateController from '@/app/controllers/ProjectStateController'
    import TagController from '@/app/controllers/TagController'
    import StateParamComponent from '../list/StateParamComponent.vue'
    import TagParamComponent from '../list/TagParamComponent.vue'
    import NoTagParamComponent from '../list/NoTagParamComponent.vue'


    export default {
        name: 'ProjectFilterComponent',
        components: { StateParamComponent, TagParamComponent, NoTagParamComponent },
        props: { filter_option: null },
        data() {
            return {
                sort_visible: true, filter_visible: true,
                tags: TagController.tags,
                states: ProjectStateController.project_states
            }
        },
        methods: {
            set_sort_visible() {
                this.sort_visible = !this.sort_visible
            },
            set_filter_visible() {
                this.filter_visible = !this.filter_visible
            },
            sort_by_creation_date() {
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
            change_italic() {
                this.filter_option.ascending = !this.filter_option.ascending
            },
            min_duration_change() {
                if (parseInt(this.filter_option.min_duration) >= parseInt(this.filter_option.max_duration)) this.filter_option.min_duration = parseInt(this.filter_option.max_duration) - 1
            },
            max_duration_change() {
                if (parseInt(this.filter_option.max_duration) <= parseInt(this.filter_option.min_duration)) this.filter_option.max_duration = parseInt(this.filter_option.min_duration) + 1
            },
            min_bpm_change() {
                if (parseInt(this.filter_option.min_bpm) >= parseInt(this.filter_option.max_bpm)) this.filter_option.min_bpm = parseInt(this.filter_option.max_bpm) - 1
            },
            max_bpm_change() {
                if (parseInt(this.filter_option.max_bpm) <= parseInt(this.filter_option.min_bpm)) this.filter_option.max_bpm = parseInt(this.filter_option.min_bpm) + 1
            },
            reset_input() {
                this.filter_option.search_text = ""
            }
        },
        computed: {
            get_italic() {
                return this.filter_option.ascending ? "Ascending": "Descending"
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
        }
    }

</script>

<style scoped>

    .img {
        width: 16px;
        cursor: pointer;
    }
.input-container {
        display: flex;
        align-items: center;
        padding: 3px 4px;
        margin-top: 20px;
        margin-bottom: 10px;
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
        width: 100%;
        margin-right: 5px;
        background-color: white;
        border: 1px solid var(--secondary-text-color);
        border-radius: 4px;
        padding: 2px 5px;
        color: var(--secondary-text-color);
        font-size: var(--small-font-size);
    }

    .show-tags {
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
    }

    .content {
        padding-bottom: 8px;
        margin-bottom: 8px;
    }

    .tab {
        width: 14vw;
        padding: 0px 1vw;
        background-color: var(--dark-color);
        position: fixed;
        height: 100vh;
        left: 6vw;
        top: 0;
        display: flex;
        flex-direction: column;
        border: 1px solid #444444;
    }

    .border-bottom {
        border-bottom: 1px solid #444444;
    }

    .header {
        text-align: center;
        padding: 5px 0px;
        font-size: var(--normal-font-size);
        color: var(--secondary-text-color);
        cursor: pointer;
    }

    .header:hover {
        color: var(--main-text-color);
    }

    .one-button {
        text-align: center;
        padding: 2px 0px;
        font-size: var(--small-font-size);
        color: var(--secondary-text-color);
        cursor: pointer;
    }

    .one-label {
        padding: 2px 0px;
        font-size: var(--small-font-size);
        color: var(--secondary-text-color);
        margin-left: 5px;

    }

    .checkbox-button {
        padding: 2px 0px;
        font-size: var(--small-font-size);
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
    }

    .checkbox {
        width: 10px;
        height: 10px;
        margin-right: 5px;
        margin-left: 2px;
    }

    
    .pslider {
        position: absolute;
        appearance: none;
        background-color: transparent;
        outline: none;
        pointer-events: none;
        width: 90%;
        padding: 0px 2px;
    }

    .pslider::-webkit-slider-thumb {
        -webkit-appearance: none;
        pointer-events: auto;
        background-color: var(--background-color);
        height: 0.4em;
        width: 0.4em;
        border-radius: 50%;
        margin-top: -2px;
    }

    .pslider::-webkit-slider-runnable-track {
        -webkit-appearance: none;
    }

    .pslider1::-webkit-slider-runnable-track {
        height: 0.1em;
        width: 100%;
        background-color: #888888;
    }

    .slider-container {
        margin-top: 3px;
        margin-bottom: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>