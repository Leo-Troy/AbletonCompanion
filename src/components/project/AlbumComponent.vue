<template>
    <div class="album-container" @click="click($event)" :style="{ '--size': size }">
        <img src="../../assets/plus.png" class="album-add-img" v-if="project.get_album() == null" :style="{ '--size': size }">
        <span v-if="project.get_album() != null"> <img :src="project.get_album().image" class="album-img" :style="{ '--size': size }"></span>
    </div>
    <AddAlbumMenu :project="project" ref="menu" @force-update="force_update"/>
</template>

<script>

    import AddAlbumMenu from '../contextMenu/AddAlbumMenu.vue';

    export default {
        name: 'AlbumComponent',
        components: { AddAlbumMenu },
        props: { project: Object, size: "10%" },
        data() {
            return {
            }
        },
        methods: {
            click(event) {
                this.context_menu_open = true
                this.$refs.menu.open(event)
            },
            force_update() {
                this.$forceUpdate()
            }
        }
    }

</script>

<style scoped>

    .album-container {
        margin-right: 10px;
        margin-left: 0;
        width: var(--size);

    }

    .album-add-img {
        height: var(--size);
        width: var(--size);
        filter: brightness(0.53);
        cursor: pointer;
    }

    .album-img {
        height: var(--size);
        width: var(--size);
        cursor: pointer;
        border-radius: calc(var(--size) / 15);
    }

    .album-add-img:hover {
        filter: brightness(0.86)
    }

</style>