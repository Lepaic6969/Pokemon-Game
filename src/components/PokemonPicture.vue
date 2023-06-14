<template>
    <div class="pokemon-container">
        <!-- Esta es la silueta en negro -->
        <img
          :src="imgSrc"
          class="hidden-pokemon"
          alt="pokemon"
          v-if="!showPokemon">
        <!-- Este es el pokemón a color -->
       <img
          v-else
          :src="imgSrc"
          class="fade-in"
          alt="pokemon">
          
    </div>
</template>

<script>
export default {
    props:{
        pokemonId:{
            type:Number,
            required:true
        },
        showPokemon:{
            type:Boolean,
            required:true
        }
    },
    computed:{
        imgSrc(){
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
        }
    }
}
</script>

<style scoped>
 .pokemon-container {
    height: 200px;
    display: flex;
    justify-content: center;
}
img {
    height: 200px;
    position: absolute;
    /* right: 32%; */
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
.hidden-pokemon {
    filter: brightness(0);
}
</style>