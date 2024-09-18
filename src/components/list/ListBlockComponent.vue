<template>
    <div :class="{ 'block': true, 'block-selected': selected }" @mouseenter="mouse_enter" @mouseleave="mouse_leave" @click="click">
        <img :src="'./' + icon + '.png'" :class="{ 'logo-block': true, 'logo-block-hover': is_hover, 'logo-block-selected': selected }" />
        <div :class="{ 'title-block': true, 'title-block-hover': is_hover, 'title-block-selected': selected }" >
            {{ name }}
        </div>
    </div>
</template>

<script>

    export default {
        name: 'ListComponent',
        components: { },
        props: { name: "", icon: "", filter_option: Object, view_index: -1 },
        data() {
            return { is_hover: false }
        },
        methods: {
            mouse_enter() {
                this.is_hover = true
            },
            mouse_leave() {
                this.is_hover = false
            },
            click() {
                this.filter_option.current_view = this.view_index
            }
        },
        computed: {
            selected() {
                return this.view_index == this.filter_option.current_view
            }
        }
    }

</script>

<style scoped>
    .list {
        position: fixed;
        top: 0;
        left: 0;
        width: 10vw;
        height: 100vh;
        background-color: var(--dark-color);
    }

    .block {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px 0px;
        border: 1px solid #444444;
        cursor: pointer;
    }

    .block-selected {
        background-color: var(--background-color);
    }

    .logo-block {
        margin-left: 35%;
        width: 30%;
        margin-bottom: 5px;
        filter: brightness(0.53);
    }

    .logo-block-hover {
        filter: brightness(0.86)
    }

    .logo-block-selected {
        filter: brightness(1)
    }

    .title-block {
        text-align: center;
        width: 100%;
        color: var(--secondary-text-color);
        font-size: var(--normal-font-size);
    }

    .title-block-hover {
        color: var(--main-text-color);
    }

    .title-block-selected {
        color: white;
    }
    
</style>