import PokemonPicture from '@/components/PokemonPicture'
import { shallowMount } from '@vue/test-utils'

describe('PokemonPicture Component',()=>{
    test('Debe hacer match con el snapshot',()=>{
        const wrapper=shallowMount(PokemonPicture,{
            props:{
                pokemonId:1,
                showPokemon:false
            }
        })
        expect(wrapper.html()).toMatchSnapshot();
    })
    test('Debe mostrar la imagen oculta (La imagen con filtro negro) y el pokemón 100',()=>{
        const wrapper=shallowMount(PokemonPicture,{
            props:{
                pokemonId:100,
                showPokemon:false
            }
        })
        const [img1,img2]=wrapper.findAll('img') //Sólo va a existir una imagen, porque se muestra la una o la otra en un v-else, nunca las 2.
        //En esta aserción digo que sólo va a existir una imagen a la vez
        expect(img1.exists()).toBe(true)
        expect(img2).toBe(undefined)
        //Ahora debo comprobar que la imagen que existe, debe tener la clase 'hidden-pokemon', debido a 
        //que esta clase es la que pone el filtro negro.
        expect(img1.classes('hidden-pokemon')).toBe(true)
        //Ahora debo verificar que el atributo 'src' de la imagen que existe, debe corresponder al pokemón 100.
        expect(img1.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')

    })
    test('Debe mostrar el pokemón a color, si showPokemon:true',()=>{
        const wrapper=shallowMount(PokemonPicture,{
            props:{
                pokemonId:100,
                showPokemon:true
            }
        })
        const [img1,img2]=wrapper.findAll('img') 
        expect(img1.exists()).toBe(true)
        expect(img2).toBe(undefined)
        
        //La imagen que existe, NO debe tener la clase 'hidden-pokemon', debido a que esta imagen
        //debe estar a color.
        expect(img1.classes('hidden-pokemon')).toBe(false)
        expect(img1.classes('fade-in')).toBe(true) //También debe tener la clase 'fade-in'
    })
})