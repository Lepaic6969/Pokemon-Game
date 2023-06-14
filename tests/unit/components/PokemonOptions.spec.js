import { shallowMount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions";
//Este es el arreglo de objetos con los pokemones
import { pokemons } from "../mocks/pokemons.mock";
describe("PokemonOptions Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons, //pokemons es el arreglo de objetos que importaste
      },
    });
  });

  //1. Que haga match con el snapshot pasándole como prop, el arreglo de objetos 
  //que traigo desde mi carpeta mocks
  test("Debe hacer match con el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  //2. Verificar que las opciones de respuesta sean las correctas
  test('Debe mostrar las 4 opciones de respuesta correctamente',()=>{
    //Deben exixtir 4 list items
    const liTags=wrapper.findAll('li')
    expect(liTags.length).toBe(4)
   // Cada list-item debe tener correctamente asignado el pokemon
    expect(liTags[0].text()).toBe('bulbasaur')
    expect(liTags[1].text()).toBe('ivysaur')
    expect(liTags[2].text()).toBe('venusaur')
    expect(liTags[3].text()).toBe('charmander')

  })
  //3. Se debe emitir correctamente el evento 'selection' con sus respectivos argumentos (pokemon.id)
  //al hacer click en los list-items.
  test('Se debe emitir "selection" al hacer click en los "<li></li>"',()=>{
    const [li1,li2,li3,li4]=wrapper.findAll('li')
    li1.trigger('click') //No necesito el await porque aquí no cambia el DOM
    li2.trigger('click')
    li3.trigger('click')
    li4.trigger('click')
    
    //Después de hacer el click debemos verificar si se ha emitido el evento en cuestión.
   
    expect(wrapper.emitted('selection').length).toBe(4) //estaría esperando que haya emitido 4 veces el evento, por los 4 clicks
    //Verifico que el valor que se emitió junto al evento, corresponda al id del pokemon
    expect(wrapper.emitted('selection')[0]).toStrictEqual([1])
    expect(wrapper.emitted('selection')[1]).toStrictEqual([2])
    expect(wrapper.emitted('selection')[2]).toStrictEqual([3])
    expect(wrapper.emitted('selection')[3]).toStrictEqual([4])
  })

})
