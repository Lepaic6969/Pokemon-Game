import pokemonApi from "@/api/pokemonApi"
import { Promise } from "core-js"
export const getPokemons=()=>{
    //Creo un arreglo con 650 posiciones vacías.
    const pokemonArr=Array.from(Array(650))
    //Aquí lleno el arreglo vacío con números que van del 1 al 650.
    return pokemonArr.map((_,index)=>index+1)
}
export const getPokemonNames=async([a,b,c,d])=>{ //Recibe un arreglo con 4 números enviados al azar.
    //Armo mi arreglo de promesas.
    const promiseArr=[
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
    ]
    const [p1,p2,p3,p4]=await Promise.all(promiseArr); //Desestructuro cada una de las respuestas.
    //Ahora debo regresar un arreglo con la información de los 4 pokemones
    return [
        {name:p1.data.name,id:p1.data.id},
        {name:p2.data.name,id:p2.data.id},
        {name:p3.data.name,id:p3.data.id},
        {name:p4.data.name,id:p4.data.id}
    ]
}

const getPokemonOptions=async()=>{
    //Aquí recibo el arreglo y lo mezclo para agregarle el componente aleatorio.
    const mixedPokemons=getPokemons().sort(()=>Math.random()-0.5);
    const pokemonNames=await getPokemonNames(mixedPokemons.splice(0,4))
    return pokemonNames
}
export default getPokemonOptions