import axios, { AxiosResponse } from "axios";
import { Move, PokeapiResponse } from "../interfaces/pokeapi-response.interface";

export class Pokemon {
  constructor(
    public readonly id: number,
    public name: string
  ) //public imageUrl: string No tiene sentido
  {}

  get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  }

  scream():void {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak():void {
    console.log(`${this.name}, ${this.name}!`);
  }

  async getMoves(): Promise<Move[]> {
    // const moves: number = 10;
    const {data} =await axios.get<PokeapiResponse>("https://pokeapi.co/api/v2/pokemon/4");
    console.log(data.moves);
    return data.moves;
  }
}

export const charmander = new Pokemon(4, "Charmander");
console.log(charmander.imageUrl);
charmander.getMoves();
