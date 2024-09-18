<template>
    <span class="tag" :style="{ '--color': tag.color }" @mouseenter="show_close()" @mouseleave="hide_close()">
        <span class="name">
            {{ tag.name }}
        </span>
        <span class="close" v-show="close_visible" @click="close">X</span>
    </span>
</template>

<script>

    export default {
        name: 'TagComponent',
        components: {},
        props: { tag: Object, project: Object },
        data() {
            return {
                close_visible: false
            }
        },
        methods: {
            show_close() {
                this.close_visible = true
            },
            hide_close() {
                this.close_visible = false
            },
            close() {
                this.project.tags_id = this.project.tags_id.filter((tag_id) => tag_id != this.tag.id)
                this.$emit("force-update")
            }
        }
    }

</script>

<style scoped>

    .tag {
        background-color: var(--color);
        float: right;
        margin-left: 6px;
        padding: 1px 5px;
        border-radius: 6px;
        border: 1px solid var(--main-text-color);
        color: var(--main-text-color);
        font-size: var(--small-font-size);
    }
    
    .name {
        font-size: var(--small-font-size);
    }

    .close {
        font-size: var(--very-small-font-size);
        background-color: red;
        text-align: center;
        padding: 0px 3px;
        border-radius: 40%;
        margin-left: 5px;
        border: 1px solid var(--main-text-color);
        cursor: pointer;
    }

</style>