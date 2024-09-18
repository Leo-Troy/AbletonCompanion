<template>
    <div class="content-container">
        <div class="content-header">
            <img src="../../assets/tag-forme-noire.png" class="content-header-image">
            Tag Parameters
        </div>
        <div class="tag-content-container">
            <div class="tag-content" v-for="(tag, index) in tags">
                <div class="tag-flex">
                    <span class="rect-color" :style="{ '--color': tag.color }" @click="color_click_tag($event, tag)"></span>

                    <div class="tag-inputs">
                        <input type="text" class="name" v-model="tag.name" placeholder="Tag Name"/>
                    </div>
                    <div class="close-button-container">
                        <img src="../../assets/cross.png" class="close-button" @click="remove_tag(tag)">
                    </div>
                </div>
                <div class="automation">
                    <div v-for="(automation, index) in tag.get_automations()">
                        <span class="auto" v-if="automation.type == 'VstIncludesAutomation'">
                            <span class="auto-el">{{ index == 0 ? "" : "and" }}</span>
                            <span class="auto-el">If</span>
                            <span class="auto-el">Vst List</span>
                            <span class="auto-change"  @click="open_yes_no($event, automation)">{{ automation.should ? "" : "not" }}</span>
                            <span class="auto-el">includes</span>
                            <span class="auto-change" @click="open_vst($event, automation)">{{ automation.get_vst() ? automation.get_vst().get_name() : "" }}</span>
                            <img src="../../assets/cross.png" class="close-button" @click="remove_automation(tag, automation)">
                        </span>
                        <span class="auto" v-if="automation.type == 'VstCountAutomation'">
                            <span class="auto-el">{{ index == 0 ? "" : "and" }}</span>
                            <span class="auto-el">If</span>
                            <span class="auto-el">Vst Count</span>
                            <span class="auto-change" @click="open_sup_inf($event, automation)">{{ automation.superior ? ">=" : "<=" }}</span>
                            <span class="auto-el">To</span>
                            <span class="auto-change" @click="open_int($event, automation)">{{ automation.count }}</span>
                            <img src="../../assets/cross.png" class="close-button" @click="remove_automation(tag, automation)">
                        </span>
                    </div>
                    <div class="add-condition" @click="open_automation($event, tag)">
                        Add Automation
                    </div>
                </div>
            </div>
        </div>
        <div class="tag-create"  @click="add_tag">
            Create New Tag
        </div>
        <ChangeColorMenu ref="change_color_menu" @color-selected="color_selected" />
        <YesNoMenu ref="yes_no_menu" @selected="yes_no_selected" />
        <VstMenu ref="vst_menu" @selected="vst_selected" />
        <AutomationMenu ref="automation_menu" @selected="automation_selected" />
        <SupInfMenu ref="sup_inf_menu" @selected="sup_inf_selected" />
        <IntMenu ref="int_menu" @selected="int_selected" />
    </div>
</template>

<script>
import TagController from '@/app/controllers/TagController';
import AutomationController from '@/app/controllers/AutomationController';
import ChangeColorMenu from "../contextMenu/ChangeColorMenu.vue"
import YesNoMenu from '../contextMenu/YesNoMenu.vue';
import VstMenu from '../contextMenu/VstMenu.vue';
import SupInfMenu from '../contextMenu/SupInfMenu.vue';
import IntMenu from '../contextMenu/IntMenu.vue';
import AutomationMenu from '../contextMenu/AutomationMenu.vue';
import VstController from '@/app/controllers/VstController';
import ProjectController from '@/app/controllers/ProjectController';

    export default {
        name: 'SettingsTagComponent',
        components: { ChangeColorMenu, YesNoMenu, VstMenu, AutomationMenu, SupInfMenu, IntMenu },
        props: {},
        data() {
            return {
                tags: TagController.tags,
                current_tag: null,
                tag_hover: [],
                current_automation: null
            }
        },
        created() {
        },
        computed: {

        },
        methods: {
            remove_automation(tag, automation) {
                tag.remove_automation(automation)
            },
            open_automation(event, tag) {
                this.current_tag = tag
                this.$refs.automation_menu.open(event)
                
            },
            automation_selected(el) {
                const automation = AutomationController.create(el)
                this.current_tag.automation_ids.push(automation.id)
                this.current_tag = null
                this.$forceUpdate()
            },
            color_click_tag(event, tag) {
                this.current_tag = tag
                this.$refs.change_color_menu.open(event)
            },
            color_selected(color) {
                this.current_tag.color = color
                this.$forceUpdate()
            },
            add_tag() {
                TagController.create_empty()
                this.$forceUpdate()
            },
            remove_tag(tag) {
                TagController.remove_tag(tag)
                this.tags = TagController.tags
                this.$forceUpdate()
            },
            open_yes_no(event, automation) {
                this.current_automation = automation
                this.$refs.yes_no_menu.open(event)
            },
            yes_no_selected(el) {
                this.current_automation.should = el == "yes"
                this.current_automation = null
                this.$forceUpdate()
                ProjectController.automaticaly_set_tags()
            },
            open_vst(event, automation) {
                this.current_automation = automation
                this.$refs.vst_menu.open(event)
            },
            vst_selected(el) {
                this.current_automation.vst_id = el
                this.current_automation = null
                this.$forceUpdate()
                ProjectController.automaticaly_set_tags()
            },
            open_sup_inf(event, automation) {
                this.current_automation = automation
                this.$refs.sup_inf_menu.open(event)
            },
            sup_inf_selected(el) {
                this.current_automation.superior = el == ">="
                this.current_automation = null
                this.$forceUpdate()
                ProjectController.automaticaly_set_tags()
            },
            open_int(event, automation) {
                this.current_automation = automation
                this.$refs.int_menu.open(event)
            },
            int_selected(el) {
                this.current_automation.count = el
                this.current_automation = null
                this.$forceUpdate()
                ProjectController.automaticaly_set_tags()
            },
        }
    }

</script>

<style scoped>

    .auto-change {
        border: 1px solid var(--secondary-text-color);
        cursor: pointer;
        flex: 2
    }

    .auto {
        display: flex;
        width: 100%;
        font-size: var(--small-font-size);
        text-align: center;
        margin-bottom: 2px;
    }

    .auto-el {
        flex: 1
    }

    .automation {
        margin-top: 10px;
    }

    .add-condition {
        border: 1px solid var(--secondary-text-color);
        color: var(--secondary-text-color);
        font-size: var(--small-font-size);
        padding: 2px 0px;
        text-align: center;
        cursor: pointer;
        width: 120px;
        margin-top: 10px;
    }

    .rect-color {
        background-color: var(--color);
        padding:  9px 9px;
        border: 1px solid white;
        cursor: pointer;
    }
   
    .close-button {
        width: 16px;
        height: 16px;
        cursor: pointer;
        margin-left: 10px;
    }



    .tag-create {
        margin-top: 20px;
        text-align: center;
        font-size: var(--normal-font-size);
        border: 1px dotted #333333;
        border-radius: 3px;
        padding: 5px 0px;
        color: #333333;
        cursor: pointer;
    }

    .tag-create:hover {
        color: black;
        border: 1px dotted black;
    }

    .tag-create:active {
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

    .tag-inputs {
        width: 100%;
        margin-left: 30px;
    }

    .tag-flex {
        width: 100%;
        display: flex;
        align-items: center;
    }

    .content-container {
        padding: 20px 50px;
        width: 100%
    }

    .tag-content-container {
        /* border: 1px solid var(--dark-color); */
        border-bottom: none;
        margin-top: 20px;
        border-top: 1px solid #DDDDDD;

    }

    .tag-content {
        width: 100%;
        font-size: var(--normal-font-size);
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