<template>
    <span :class="{ 'tag-not-selected': !is_selected, 'tag-selected': is_selected, 'tag': true }" :style="{ '--color': 'black' }" @click="click">
        <span class="name">
            No Tag
        </span>
    </span>
</template>

<script>

    export default {
        name: 'TagParamComponent',
        components: {},
        props: { filter_option: Object },
        data() {
            return {
                is_selected: true
            }
        },
        methods: {
            click() {
                this.is_selected = !this.is_selected
                this.filter_option.no_tags = this.is_selected
            }
        }
    }

</script>

<style scoped>

    .tag {
        /* flex: 0 0 100%; */
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        margin-left: 6px;
        padding: 1px 5px;
        border-radius: 6px;
        color: var(--main-text-color);
        font-size: var(--small-font-size);
        display: inline;
        margin-bottom: 5px;
        cursor: pointer;
    }
    
    .tag-selected {
        background-color: var(--color);
        border: 1px solid var(--main-text-color);
        color: var(--main-text-color);
    }

    .tag-not-selected {
        background-color: transparent;
        border: 1px solid var(--color);
        color: var(--color);
    }
    
    .name {
        font-size: var(--small-font-size);
        flex: 1;
        white-space: nowrap;
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