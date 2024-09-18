<template>
    <div class="app">
        <div class="img-container"><img src="logo.png"></div>
        <div class="title">
            Thank You for Using Ableton Companion!
        </div>
        <div class="content">
            If you have any questions, feedback, or encounter any issues, please feel free to get in touch with me.<br>
            <span class="purple">leo.troy.pro@gmail.com</span><br><br>
        </div>
    
        <div class="title">
            Léo Troy
        </div>
    </div>
</template>

<script>

    export default {
        name: 'CredentialsComponent',
        components: {},
        props: {},
        data() {
            return {

            }
        }
    }

</script>

<style scoped>

    .img-container {
        text-align: center;
        padding: 50px 0px;
    }
    
    .app {
        background-color: var(--dark-color);
        text-align: center;
        padding-bottom: 100px;
    }

    img {
        height: 100px;
    }

    .title {
        color: var(--main-text-color);
        font-size: 20px;
    }

    .content {
        color: var(--secondary-text-color)
    }

    .purple {
        color: var(--background-color);
        font-weight: bold;
        font-size: 20px;
    }

</style>