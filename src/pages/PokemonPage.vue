<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else >
    <h1>¿Quién es este Pokemón?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
    <!-- <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer($event)"/> En el $event vienen los parámetros, si sólo es un parámetro sobra -->
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer"/>
    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="resetGame">Nuevo Juego</button>
    </template> 
  </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'
import getPokemonOptions from '@/helpers/getPokemonOptions.js'


export default {
  components:{
    PokemonOptions,
    PokemonPicture
  },
  data(){
    return {
      pokemonArr:[],
      pokemon:null, //Este es el Pokemon correcto
      showPokemon:false,
      //Estas son variables para mostrar la respuesta
      showAnswer:false,
      message:''
    }
  },
  methods:{
    async mixPokemonArray(){
      this.pokemonArr=await getPokemonOptions()
      //Asigno el pokemón correcto
      const random=Math.floor(Math.random()*4)
      this.pokemon=this.pokemonArr[random]
      
    },
    checkAnswer(pokemonId){ //este es el id del pokemón que la persona seleccionó.
      this.showAnswer=true
      this.showPokemon=true
      if(pokemonId===this.pokemon.id){
        this.message=`Correcto ${this.pokemon.name}`
      }else{
        this.message=`Oops era ${this.pokemon.name}`
      }
    },
    resetGame(){
      this.showPokemon=false
      this.showAnswer=false
      this.pokemonArr=[]
      this.pokemon=null
      this.mixPokemonArray()
      
    }
  },
  mounted(){
    this.mixPokemonArray()
  }
}
</script>

<style >

</style>
