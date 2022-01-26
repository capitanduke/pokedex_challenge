import { useQuery } from "react-query";

export default function UsePokemon(pokemon) {
  return useQuery(["pokemon", pokemon.name], () =>
    fetch(pokemon.url).then((res) => res.json())
  );
}
