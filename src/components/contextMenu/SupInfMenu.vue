<template>
    <div class="menu" v-if="is_open" :style="{ '--top': top, '--left': left }" ref="menu">
        <div v-for="el in list" class="el" @click="click_on_tag(el)">
            <span class="name">
                {{ el }}
            </span>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'YesNoMenu',
        components: {},
        props: {  },
        data() {
            return {
                is_open: false, left: "0px", top: "0px", click_count: 0, list: [">=", "<="]
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
                if (this.$refs.menu.contains(event.target)) return
                this.click_count += 1
                if (this.click_count == 1) return

                document.removeEventListener('click', this.click);
                this.is_open = false
                this.click_count = 0
            },
            click_on_tag(el) {
                this.$emit("selected", el)
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

    .menu {
        position: absolute;
        top: var(--top);
        left: var(--left);
        color: black;
        font-size: var(--small-font-size);
        border: 1px solid black;
        border-bottom: none;
    }
    
    
    .el {
        background-color: var(--main-text-color);
        padding: 2px 10px;
        border-bottom: 1px solid black;
    }
    
    .el:hover {
        cursor: pointer;
        background-color: var(--secondary-text-color);
    }

</style>