<template>
    <div class="content-container">
        <div class="content-header">
            <img src="../../assets/album-de-musique.png" class="content-header-image">
            Album Parameters
        </div>
        <input type="file" accept="image/*" @change="handleImageSelection" ref="imageInput" style="display: none">
        <div class="album-content-container">
            <div class="album-content" v-for="album in albums">
                <div class="album-flex">
                    <img :src="album.image" class="album-img" v-if="album.image_is_valid()" @click="change_album_image(album)" />
                    <img src="no-img.jpg" class="album-img" v-if="!album.image_is_valid()" @click="change_album_image(album)" />
                    <div class="album-inputs">
                        <input type="text" class="name" v-model="album.name" placeholder="Album Name"/>
                        <textarea class="name description" v-model="album.description" rows="2" placeholder="Album Description"></textarea>
                    </div>
                    <div class="close-button-container">
                        <img src="../../assets/cross.png" class="close-button" @click="remove_album(album)">
                    </div>
                </div>
            </div>
        </div>
        <div class="album-create"  @click="add_album">
            Create New Album
        </div>
    </div>
</template>

<script>
import AlbumController from '@/app/controllers/AlbumController';

    export default {
        name: 'SettingsAbletonComponent',
        components: { },
        props: {},
        data() {
            return {
                albums: AlbumController.albums
            }
        },
        created() {
        },
        methods: {
            change_album_image(album) {
                this.current_album = album
                this.$refs.imageInput.click();
            },
            handleImageSelection(event) {
                if (event.target.files.length > 0) {
                    const file = event.target.files[0];
                    this.current_album.image = file.path
           
                }
                this.$forceUpdate()
            }, 
            add_album() {
                AlbumController.create_empty("")
                this.$forceUpdate()
            },
            remove_album(album) {
                AlbumController.remove_album(album)
                this.albums = AlbumController.albums
                this.$forceUpdate()
            },
        }
    }

</script>

<style scoped>

    .close-button {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .close-button-container {
        transform: translate(0px, -24px);
        margin-left: 10px;
    }

    .album-create {
        margin-top: 20px;
        text-align: center;
        font-size: var(--normal-font-size);
        border: 1px dotted #333333;
        border-radius: 3px;
        padding: 5px 0px;
        color: #333333;
        cursor: pointer;
    }

    .album-create:hover {
        color: black;
        border: 1px dotted black;
    }

    .album-create:active {
        color: white;
        border: 1px solid white;
        background-color: var(--background-color);
    }

    .description {
        margin-top: 10px;
        resize: none;
    }
    .name {
        width: 100%;
        padding: 4px 20px;
        font-size: var(--small-font-size);
        background-color: #DDDDDD;
        border: 1px solid white;
    }

    .album-inputs {
        width: 100%;
        margin-left: 30px;
    }

    .album-flex {
        width: 100%;
        display: flex;
        align-items: center;
    }

    .album-img {
        height: 80px;
        width: 80px;
        cursor: pointer;
    }

    .content-container {
        padding: 20px 50px;
        width: 100%
    }

    .album-content-container {
        /* border: 1px solid var(--dark-color); */
        border-bottom: none;
        margin-top: 20px;
        border-top: 1px solid #DDDDDD;

    }

    .album-content {
        width: 100%;
        font-size: var(--normal-font-size);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #DDDDDD;
        padding: 10px 20px;
    }

    .content-header {
        display: flex;
        align-items: center;
        font-size: var(--big-font-size);
        margin-bottom: 10px;
    }


    .content-header-image {
        height: 40px;
        margin-right: 30px;
        margin-left: 30px;
        filter: brightness(0)
    }


</style>