<template>
    <div class="project-state-menu" v-if="is_open" :style="{ '--top': top, '--left': left }" ref="project_state_menu">
        <div v-for="project_state in project_states" class="project-state" @click="click_on_project_state(project_state)">
            <span class="color" :style="{ '--color': project_state.color }">
            </span>
            <span class="name">
                {{ project_state.name }}
            </span>
        </div>
    </div>
</template>

<script>
import ProjectStateController from '@/app/controllers/ProjectStateController';


    export default {
        name: 'ChangeProjectStateMenu',
        components: {},
        props: { project: Object },
        data() {
            return {
                is_open: false, left: "0px", top: "0px", click_count: 0, project_states: ProjectStateController.project_states
            }
        },
        methods: {
            open(event) {
                this.is_open = true;
                this.left = event.clientX + "px"
                this.top = (event.clientY + window.pageYOffset) + "px"
                document.addEventListener('click', this.click);
            },
            click(event) {
                if (event.target == null) return
                if (this.$refs.project_state_menu.contains(event.target)) return
                this.click_count += 1
                if (this.click_count == 1) return

                document.removeEventListener('click', this.click);
                this.is_open = false
                this.click_count = 0
            },
            click_on_project_state(project_state) {
                this.project.project_state_id = project_state.id
                this.$emit("force-update")
                document.removeEventListener('click', this.click);
                this.is_open = false
                this.click_count = 0
            }
        }
    }

</script>

<style scoped>

    .project-state-menu {
        position: absolute;
        top: var(--top);
        left: var(--left);
        color: black;
        font-size: var(--small-font-size);
        border: 1px solid black;
        border-bottom: none;
    }
    
    
    .project-state {
        background-color: var(--main-text-color);
        padding: 2px 10px;
        border-bottom: 1px solid black;
    }
    
    .project-state:hover {
        cursor: pointer;
        background-color: var(--secondary-text-color);
    }
    .color {
        background-color: var(--color);
        padding: 0px 6px;
        margin-right:  10px;
        border-radius: 50%;
    }

</style>