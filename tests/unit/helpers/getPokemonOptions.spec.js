import {getPokemons,getPokemonNames} from '@/helpers/getPokemonOptions'
import getPokemonOptions from '@/helpers/getPokemonOptions'

import {pokemons} from '../mocks/pokemons.mock'

describe('getPokemonOptions helper',()=>{
    //1. Aquí pruebo el método 'getPokemons', que simplemente me debe retornar el arreglo
    // lleno de números del 1 al 650
    test('Debe regresar un arreglo de números con 650 elementos',()=>{
        const pokemons=getPokemons()
        expect(pokemons.length).toBe(650)
        //Estas aserciones se hacen bajo el supuesto de que los números aún no se han mezclado.
        expect(pokemons[0]).toBe(1)
        expect(pokemons[500]).toBe(501)
        expect(pokemons[649]).toBe(650)
    })
    //2. Aquí evaluamos el método 'getPokemonNames' que recibe un arreglo con 4 números y  retorna
    // un arreglo con los nombres de los 4 pokemones correspondientes.
    test('Debe retornar un arreglo de 4 elementos con nombres de Pokemon',async()=>{
        const pokemons=await getPokemonNames([1,2,3,4])
        //Esta función 'toStrictEqual', tiene la capacidad de comparar el contenido de los Objetos'
        //También funciona si usas el método 'toEqual'.
        expect(pokemons).toStrictEqual(pokemons)
        
    })
    //3. Aquí evaluamos el método 'getPokemonOptions', que es el que se exporta por defecto
    // en nuestra aplicación. Este se encarga de recibir nuestro primer arreglo de 650 pokemons, de mezcarlo
    //y seleccionar 4 números, para pasárselo a 'getPokemonNames' y obtener el nombre de los
    //pokemones correspondientes, que al final son los retornados al ejecutar este método.
    test('getPokemonOptions debe retornar un arreglo de objetos,cuyos objetos deben tener el tipo de dato correcto en sus propiedades',async()=>{
        const pokemons=await getPokemonOptions()

        expect(pokemons.length).toBe(4)
        //Aquí voy a esperar que el arreglo de objetos que recibo del método, tenga en las propiedades de
        //cada objeto, los tipos de datos correctos.
        expect(pokemons).toEqual(
            [
                { 
                    name: expect.any(String), 
                    id: expect.any(Number) 
                },
                { 
                    name: expect.any(String),
                     id: expect.any(Number)
                },
                { 
                    name: expect.any(String),
                    id: expect.any(Number)
                },
                { 
                    name: expect.any(String),
                    id: expect.any(Number)
                }
            ]
        )
    })
})