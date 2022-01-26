import { useQuery } from "react-query";

export default function AllPokemon(page) {
    return useQuery(['pokemons', page], () =>
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${page}&offset=${page}`).then((res) =>
        res.json()
        ), { keepPreviousData : true }
    );
}
