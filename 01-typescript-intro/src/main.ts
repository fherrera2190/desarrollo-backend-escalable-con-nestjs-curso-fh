//import {age, name} from './bases/01-types.ts'
//import { pokemonsIds,bulbasaur, pokemons } from './bases/02-objects'
//import { charmander } from "./bases/03-classes";
//import { charmander } from "./bases/04-injection";
// import { charmander } from "./bases/05-decorators";
//import { charmander } from "./bases/06-decorators2";
import "./bases/test";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<h1>Hello ${"charmander.name"}</h1>
`;
