<template>
    <div class="color-menu" v-if="is_open" :style="{ '--top': top, '--left': left }" ref="color_menu">
        <span v-for="color in colors" @click="click_on_color(color)" class="color" :style="{ '--color': color }">
        </span>
    </div>
</template>

<script>
import ColorController from '@/app/controllers/ColorController';


    export default {
        name: 'ChangeColorMenu',
        components: {},
        props: { },
        data() {
            return {
                is_open: false, left: "0px", top: "0px", click_count: 0, colors: ColorController.colors
            }
        },
        methods: {
            open(event) {
                this.is_open = true;
                this.left = event.clientX + "px"
                this.top = (event.clientY + window.pageYOffset) + "px"
                document.addEventListener('click', this.click);
                this.$forceUpdate()
            },
            click(event) {
                if (event.target == null) return
                if (this.$refs.color_menu.contains(event.target)) return
                this.click_count += 1
                if (this.click_count == 1) return

                document.removeEventListener('click', this.click);
                this.is_open = false
                this.click_count = 0
            },
            click_on_color(color) {
                this.$emit("color-selected", color)
                document.removeEventListener('click', this.click);
                this.is_open = false
                this.click_count = 0
            },
            force_update() {
                this.$forceUpdate()
            }
        }
    }

</script>

<style scoped>

    .color-menu {
        position: absolute;
        top: var(--top);
        left: var(--left);
        color: black;
        font-size: var(--small-font-size);
        border: 1px solid black;
        background-color: white;
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* Three columns of equal width */
        grid-template-rows: repeat(3, 1fr)
    }
    
    .color {
        background-color: var(--color);
        padding: 9px 9px;
        margin:  3px;
        border-radius: 50%;
        cursor: pointer;
    }

</style>