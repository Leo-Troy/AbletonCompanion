<template>
    <span class="tag" @click="click($event)" ref="add">
        +
    </span>
    <AddTagMenu :tags="project" :project="project" ref="menu" @force-update="force_update"/>
</template>

<script>

    import AddTagMenu from "../contextMenu/AddTagMenu.vue"

    export default {
        name: 'AddTagComponent',
        components: { AddTagMenu },
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
                this.$emit("force-update")
            },
            force_menu_update() {
                this.$refs.menu.force_update()
            }
        }
    }

</script>

<style scoped>
    .tag {
        font-size: var(--small-font-size);
        background-color: transparent;
        float: right;
        margin-left: 6px;
        padding: 1px 5px;
        border-radius: 6px;
        border: 1px dotted var(--secondary-text-color);
        color: var(--secondary-text-color)
    }

    .tag:hover {
        cursor: pointer;
        border: 1px dotted var(--main-text-color);
        color: var(--main-text-color)
    }

</style>