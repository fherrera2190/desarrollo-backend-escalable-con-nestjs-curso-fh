export const pokemonsIds = [1, 2, 6, 3, 40, 50];

//pokemonsIds.push('No deberia agregarse'); //Error pero se agrega igual por que al final todo es js

//export const pokemon = {
// id: 1,
// name: "Bulbasaur",
//};

// OBJETOS e Interfaces
interface Pokemon {
  id: number;
  name: string;
  age?: number;
}

export const bulbasaur: Pokemon = {
  id: 1,
  name: "Bulbasaur",
};
export const charmander: Pokemon = {
  id: 4,
  name: "Charmander",
  age: 35,
};

console.log(bulbasaur);


export const pokemons:Pokemon[] =[];
//pokemons.push(1,'string',charmander) // [object, object, object] falta el stringify

pokemons.push(bulbasaur, charmander);
console.log(pokemons)