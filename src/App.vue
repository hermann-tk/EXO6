<template>
    <div>
        <div class="section">
            <h1 class="title is-1 has-text-centered">Exercice 06</h1>
        </div>
        <Route exact path="/" component={myNavBar} />
        <div>
            <myNavBar/>
            <router-view />
        </div>
    </div>
</template>

<script>
import myNavBar from './components/myNavBar.vue'
export default {
    name: 'App',
    data() {
        return {};
    },
    mounted() {
        this.isLogged()
    },
    components: {
        myNavBar
    },
    methods: {
        isLogged() {
            if(sessionStorage.token) {
                console.log("User is logged")
                document.getElementById('btnLogOut').style.visibility = "visible"
                document.getElementById('btnLogin').style.visibility = "hidden"
            } else {
                console.log("user is not logged in")
                document.getElementById('btnLogOut').style.visibility = "hidden"
                document.getElementById('btnLogOut').style.visibility = "hidden"
                document.getElementById('navbarFavorites').style.visibility = "hidden"
            }
        }
    }
};
</script>

<style>
</style>
