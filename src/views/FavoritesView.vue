<template v-on:click="getToken()">
    <div class="section">
        <div class="row columns is-multiline is-mobile">
            <div v-for="p in pokemonsFiltres"
                 v-bind:key="p.pokemonId"
                 class="column is-3-desktop is-4-tablet is-6-mobile">
                <div class="card has-text-black" v-bind:style="{backgroundColor: p.color}">
                    <div class="card-image">
                        <figure class="image is-square">
                            <img v-bind:alt="p.name" v-bind:src="p.imgURL">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <p class="title is-3 has-text-centered" style="color:black">
                                {{ p.name }}
                            </p>
                            <div class="mb-0">
                                <span class="has-text-weight-bold">Species: </span>
                                <span>{{ p.species.name }}</span>
                            </div>
                            <div class="mb-0">
                                <span class="has-text-weight-bold">Habitat: </span>
                                <span>{{ p.habitat.name }}</span>
                            </div>
                            <div class="mb-0">
                                <span class="has-text-weight-bold">PokeTypes: </span>
                                <span>{{ p.poketypes.map((e) => e.name).join(', ') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
window.onload = function() {
    if(!window.location.hash) {
        //window.location.reload();
    }
}

import { svrURL } from '@/constants';
export default {
    mounted() {
        this.getFavoris()
    },
    data() {
        return {
            pokemons: [],
            poketypes: [],
            habitats: [],
            species: [],
            filtrePoketype: '',
            filtreSpecies: '',
            filtreHabitat: '',
        };
    },
    methods: {
        async getFavoris() {
            //console.log(sessionStorage.token)
            const reponse = await fetch(`${svrURL}/favorites`, {
                method: 'GET',
                headers: { authorization: `bearer ${sessionStorage.token}` },
            });

            if (reponse.status === 200) {
                this.pokemons = await reponse.json();
                //console.log(this.pokemons)
            } else {
                this.$router.push({ path: '/connexion' })
            }
        }
    },
    computed: {
        pokemonsFiltres() {
            let pokemonsFiltres = this.pokemons;
            if (this.filtreHabitat !== '') {
                pokemonsFiltres = pokemonsFiltres.filter(
                    (p) => p.habitat.habitatId === parseInt(this.filtreHabitat, 10),
                );
            }
            if (this.filtrePoketype !== '') {
                pokemonsFiltres = pokemonsFiltres.filter(
                    (p) => p.poketypes.filter(
                        (ty) => ty.poketypeId === parseInt(this.filtrePoketype, 10),
                    ).length > 0,
                );
            }
            if (this.filtreSpecies !== '') {
                pokemonsFiltres = pokemonsFiltres.filter(
                    (p) => p.species.speciesId === parseInt(this.filtreSpecies, 10),
                );
            }
            return pokemonsFiltres;
        },
    }
}
</script>