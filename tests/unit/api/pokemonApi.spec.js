//Vamos a verificar que la instancia de axios esté creada correctamente.
import pokemonApi from "@/api/pokemonApi"
describe('pokemonApi',()=>{
    test('Axios debe estar correctamente configurado con el endpoint del api de pokemón',()=>{
        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon')
    })
})