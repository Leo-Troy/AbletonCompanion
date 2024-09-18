<template>
    <div class="album-menu" v-if="is_open" :style="{ '--top': top, '--left': left }" ref="album_menu">
        <div class="album" @click="click_no_album()">
            <img class="img" src="../../assets/cross.png" />
            <span class="name">No Album</span>
        </div>
        <div v-for="album in albums" class="album" @click="click_on_album(album)">
            <img class="img" :src="album.image" />
            <span class="name">
                {{ album.name }}
            </span>
        </div>
    </div>
</template>

<script>

    import AlbumController from '@/app/controllers/AlbumController';

    export default {
        name: 'AddAlbumMenu',
        components: {},
        props: { project: Object },
        data() {
            return {
                is_open: false, left: "0px", top: "0px", click_count: 0, albums: AlbumController.albums
            }
        },
        methods: {
            open(event) {
                this.is_open = true;
                this.left = event.clientX + "px"
                this.top = (event.clientY + window.pageYOffset) + "px"
                document.addEventListener('click', this.click);
            },
            click(event) {
                if (event.target == null) return
                if (this.$refs.album_menu.contains(event.target)) return
                this.click_count += 1
                if (this.click_count == 1) return

                document.removeEventListener('click', this.click);
                this.is_open = false
                this.click_count = 0
            },
            click_on_album(album) {
                this.project.album_id = album.id
                this.$emit("force-update")
                document.removeEventListener('click', this.click);
                this.is_open = false
                this.click_count = 0
            },
            click_no_album() {
                this.project.album_id = null
                this.$emit("force-update")
                document.removeEventListener('click', this.click);
                this.is_open = false
                this.click_count = 0
            }
        }
    }

</script>

<style scoped>

    .album-menu {
        position: absolute;
        top: var(--top);
        left: var(--left);
        color: black;
        font-size: var(--small-font-size);
        border: 1px solid black;
        border-bottom: none;
    }
    
    
    .album {
        background-color: var(--main-text-color);
        border-bottom: 1px solid black;
        display: flex;
        align-items: center;
    }
    
    .name {
        margin-right: 10px;
        margin-left: 10px;
    }
    
    .album:hover {
        cursor: pointer;
        background-color: var(--secondary-text-color);
    }
    .img {
        /* background-color: var(--color); */
        height: 20px;
        width: auto;
    }

</style>