<template>
    <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TP1</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.2/css/bulma.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
</head>
<body>
<div class="container">
    <nav class="navbar" role="navigation" aria-label="main navigation">
    </nav>
    <div class="section">
        <div class="content">
            <div class="field">
                <label for="email" class="label">Email</label>
                <div class="control has-icons-left">
                    <input id="email" type="email" placeholder="e1234567@site.com" class="input"
                           autocomplete="email" required value="e1971009@site.com"/>
                    <span class="icon is-small is-left"><i class="fa fa-envelope"></i></span>
                </div>
            </div>
            <div class="field">
                <label for="password" class="label">Password</label>
                <div class="control has-icons-left">
                    <input id="password" type="password" placeholder="*******" class="input" autocomplete="password" 
                           required value="e1971009">
                    <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
                </div>
            </div>
            <div class="field">
                <label class="label"></label>
                <div class="control">
                    <button v-on:click="login()" id="connexion" class="button is-success">Connexion</button>
                    <button v-on:click="annuler()" id="annuler" class="button is-danger">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</div>
<footer class="footer">
    <div class="container">
        <div class="content has-text-centered">
            <p>e1971009</p>
        </div>
    </div>
</footer>
</body>
</html>

</template>

<script>
import { svrURL } from '@/constants';
export default {
    methods: { 
        async login() {
            let userEmail = document.getElementById('email').value
            let userPassword = document.getElementById('password').value
            const reponse = await fetch(`${svrURL}/auth/token`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                }),
            });
            const data = await reponse.json();
            if (reponse.status === 200) {
                const { token } = data;
                sessionStorage.setItem('token', token);
                this.$root.$data.token = `bearer ${token}`
                document.getElementById('btnLogin').style.visibility = "hidden"
                document.getElementById('btnLogOut').style.visibility = "visible"
                document.getElementById('navbarFavorites').style.visibility = "visible"
                this.$router.push({ path: '/favorites' })
            } else {
                alert('Nom d\'utilisateur ou mot de passe incorrect. Veuillez ressayer.');
                console.log(`Error ${reponse.status}` + ' Une erreur est survenue.');
            }
            console.log(userEmail, userPassword);
            return this.$root.$data.token
        },
        annuler() {this.$router.push({ path: '/' })}, 
    }
}
</script>