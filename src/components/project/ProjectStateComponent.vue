<template>
    <span class="project-state" :style="{ '--color': project.get_state().color }" @click="click($event)">
        <span class="name">
            {{ project.get_state().name }}
        </span>
    </span>
    <ChangeProjectStateMenu :project="project" ref="menu" @force-update="force_update"/>
</template>

<script>

    import ChangeProjectStateMenu from '../contextMenu/ChangeProjectStateMenu.vue';

    export default {
        name: 'ProjectStateComponent',
        components: { ChangeProjectStateMenu },
        props: { project: Object },
        data() {
            return {
            }
        },
        methods: {
            click(event) {
                this.$refs.menu.open(event)
            },
            force_update() {
                this.$forceUpdate()
            }
        }
    }

</script>

<style scoped>

    .project-state {
        background-color: var(--color);
        margin-left: 6px;
        padding: 1px 5px;
        border-radius: 6px;
        border: 1px solid var(--main-text-color);
        color: var(--main-text-color);
        font-size: var(--small-font-size);
        cursor: pointer;
    }
    
    .name {
        font-size: var(--small-font-size);
    }



</style>