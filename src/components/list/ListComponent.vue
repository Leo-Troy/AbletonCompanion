<template>
    <div class="list">
        <ListBlockComponent :filter_option="filter_option" :view_index="1" name="List" icon="note-de-musique" />
        <ListBlockComponent :filter_option="filter_option" :view_index="2" name="Albums" icon="album-de-musique" />
        <ListBlockComponent :filter_option="filter_option" :view_index="4" name="Settings" icon="parametres" />
        <ListBlockComponent :filter_option="filter_option" :view_index="5" name="Credentials" icon="coeur" />
    </div>
</template>

<script>

    import ListBlockComponent from './ListBlockComponent.vue'

    export default {
        name: 'ListComponent',
        components: { ListBlockComponent },
        props: { filter_option: Object },
        data() {
            return { album_hover: false }
        },
        methods: {
            mouse_enter() {
                this.album_hover = true
            },
            mouse_leave() {
                this.album_hover = false
            }
        }
    }

</script>

<style scoped>
    .list {
        position: fixed;
        top: 0;
        left: 0;
        width: 6vw;
        height: 100vh;
        background-color: var(--dark-color);
    }
    
</style>