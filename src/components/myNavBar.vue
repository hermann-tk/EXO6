<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">


  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start" id="navBar">
      <a v-on:click="accessToHomePage()" class="navbar-item">
        Exercice 06
      </a>

      <a id="navbarFavorites" v-on:click="accessToFavoris()" class="navbar-item">
        Pokemons favoris
      </a>

        
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          
          <button v-on:click="accessToLoginPage()" class='button is-light' id="btnLogin">Log in</button>
          <button v-on:click="LogOut()" class='button is-danger' id="btnLogOut">Deconnexion</button>
        </div>
      </div>
    </div>
</nav>
</template>

<script>
export default {
    name: "myNavBar",
    data() {
        return {
            token: ""
        }
    },
    methods: {
        //Dirige l;utilisateur vers l'accueil
        accessToHomePage() {
            this.$router.push({ path: '/' })
        },
        //Dirige l'utilisateur vers favoris si connecté
        accessToFavoris() {
            this.$router.push({ path: '/favorites' })
        },
        // Dirige l'utilisateur vers la page login
        accessToLoginPage() {
            this.$router.push({ path: '/connexion' })
            document.getElementById('btnLogin').style.visibility = "hidden"
            this.isLogged()
        },
        // Déconnecte l'utilisateur et redirige vers la page d'accueuil
        LogOut() {
            delete(this.$root.$data.token);
            sessionStorage.removeItem('token');
            console.log('Successfuly logged out')
            document.location.reload()
            this.accessToHomePage();
        },
        // Verifie si l'utilisateur est connecté
    },
    computed: {
        isLogged() {
            if(sessionStorage.token) {
                console.log("User is logged")
                return true
            } else {
                return false
            }
        }
    }
}
</script>