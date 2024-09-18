<template>
    <div class="tag-menu" v-if="is_open" :style="{ '--top': top, '--left': left }" ref="tag_menu">
        <div v-for="tag in project.get_other_tags()" class="tag" @click="click_on_tag(tag)">
            <span class="color" :style="{ '--color': tag.color }">
            </span>
            <span class="name">
                {{ tag.name }}
            </span>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'AddTagMenu',
        components: {},
        props: { project: Object },
        data() {
            return {
                is_open: false, left: "0px", top: "0px", click_count: 0
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
                if (this.$refs.tag_menu.contains(event.target)) return
                this.click_count += 1
                if (this.click_count == 1) return

                document.removeEventListener('click', this.click);
                this.is_open = false
                this.click_count = 0
            },
            click_on_tag(tag) {
                this.project.tags_id.push(tag.id)
                this.$emit("force-update")
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

    .tag-menu {
        position: absolute;
        top: var(--top);
        left: var(--left);
        color: black;
        font-size: var(--small-font-size);
        border: 1px solid black;
        border-bottom: none;
    }
    
    
    .tag {
        background-color: var(--main-text-color);
        padding: 2px 10px;
        border-bottom: 1px solid black;
    }
    
    .tag:hover {
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