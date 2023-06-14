import PokemonPage from '@/pages/PokemonPage'
import { shallowMount,mount } from '@vue/test-utils'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage Component',()=>{
    let wrapper
    beforeEach(()=>{
        wrapper=shallowMount(PokemonPage)
    })

    //Es este ejemplo, NO vale la pena hacer match con el snapshot, porque con la estructura 
    //que está propuesto el template(v-if/v-else) sólo veríamos un 'h1' con un 'Espere por favor...'

    //1. Vamos a comprobar que en el mounted el componente si mande a llamar el método 'mixPokemonArray'.
    test('Debe llamar en método "mixPokemonArray" al montarse el componente',()=>{
        // const mixPokemonArraySpy=jest.spyOn(wrapper.vm,'mixPokemonArray') //No funcionó para el mounted
        const mixPokemonArraySpy=jest.spyOn(PokemonPage.methods,'mixPokemonArray')
        wrapper=shallowMount(PokemonPage) //Volvemos a montar el componente, porque es precisamente ahí donde se manda a llamar el método.
        expect(mixPokemonArraySpy).toHaveBeenCalled()
    })
    //2. Snapshots con data y stubs
    //Recordemos que el snapshot tradicional por como está el template del componente, NO nos sirve
    // Debido a que gracias a los v-if, sólo se renderizaría un 'h1'.
    //La idea es ahora hacer el snapshop con la data que me permita tomar la fotografía de todo el template.
    test('Debe hacer match con el snapshot cuando cargan los pokemons',()=>{
        //Así como mandaba las props, también puedo mandar la data.
        //Se usa el mount en lugar del shallowMount para que haga el montaje de los componentes
        //internos de 'PokemonPage', recordemos que este componente tiene otros componentes dentro.
        const wrapper=shallowMount(PokemonPage,{
            data(){
                return{
                    pokemonArr:pokemons,
                    pokemon:pokemons[0], //Este es el Pokemon correcto
                    showPokemon:false,
                    showAnswer:false,
                    message:''
                }
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })
    //3. Pruebas de que los componentes que tiene 'PokemonPage' existan.
    test('Debe mostrar los componentes de "PokemonPicture" y "PokemonOptions"',()=>{
        const wrapper=shallowMount(PokemonPage,{
            data(){
                return{
                    pokemonArr:pokemons,
                    pokemon:pokemons[3], //Este es el Pokemon correcto
                    showPokemon:false,
                    showAnswer:false,
                    message:''
                }
            }
        })
        const picture=wrapper.find('pokemon-picture-stub')
        const options=wrapper.find('pokemon-options-stub')
        expect(picture.exists()).toBe(true)
        expect(options.exists()).toBe(true)
        //PokemonPicture debe tener un atributo pokemonid==='4' (Charmander)
        expect(picture.attributes('pokemonid')).toBe('4')
        //PokemonOptions debe tener un atributo pokemons->toBe(true)
        expect(options.attributes('pokemons')).toBeTruthy() 
    })

    //4. Pruebas sobre el checkAnswer -> Accediendo desde Jest a las variables reactivas del componente.
    test('Pruebas checkAnswer',async ()=>{
        const wrapper=shallowMount(PokemonPage,{
            data(){
                return{
                    pokemonArr:pokemons,
                    pokemon:pokemons[3],
                    //Estas son las variables reactivas que se alterarían al mandarse a llamar este método.
                    showPokemon:false,
                    showAnswer:false,
                    message:''
                }
            }
        })
        //Mando a llamar directamente el método.
        await wrapper.vm.checkAnswer(4) //Le paso el id del pokemon "que adivina el usuario"
        expect(wrapper.find('h2').exists()).toBe(true)
        
        //Ahora voy a checkear las propiedades reactivas de forma directa.
        expect(wrapper.vm.showPokemon).toBe(true)
        expect(wrapper.vm.showAnswer).toBe(true)
        expect(wrapper.vm.message).toBe(`Correcto ${pokemons[3].name}`)


        await wrapper.vm.checkAnswer(1)
        expect(wrapper.vm.message).toBe(`Oops era ${pokemons[3].name}`)

    })
})