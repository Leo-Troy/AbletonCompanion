<template>
    <span :class="{ 'state-not-selected': !is_selected, 'state-selected': is_selected, 'state': true }" :style="{ '--color': state.color }" @click="click">
        <span class="name">
            {{ state.name }}
        </span>
    </span>
</template>

<script>

    export default {
        name: 'StateParamComponent',
        components: {},
        props: { state: Object, filter_option: Object },
        data() {
            return {
                is_selected: true
            }
        },
        methods: {
            click() {
                this.is_selected = !this.is_selected
                if (this.is_selected) this.filter_option.project_states.push(this.state)
                else this.filter_option.project_states = this.filter_option.project_states.filter((state) => state.id != this.state.id)
            }
        }
    }

</script>

<style scoped>

    .state {
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
    
    .state-selected {
        background-color: var(--color);
        border: 1px solid var(--main-text-color);
        color: var(--main-text-color);
    }

    .state-not-selected {
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