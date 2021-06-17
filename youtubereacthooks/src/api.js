export const searchPokemon = async(pokemon)=>{
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        const response = await fetch(url);
        const data = await response.json()
        console.log('Pokeapi',data)
        return data;
    } catch (error) {
        
    }
};

//queryparam limit=cantidad de pokemones que queremos obtener
//queryparam offset=cantidad de pokemos al cual quremos empezar a buscar o desde donde queremos que inicie
export const getPokemons = async(limit=25, offset=0)=>{
    try {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        const response = await fetch(url);
        const data = await response.json()
        console.log('Pokeapi',data)
        return data;
    } catch (error) {
        
    }
}

export const getPokemonData = async(url)=>{
    try {
        //let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        const response = await fetch(url);
        const data = await response.json()
        console.log('getPokemonData',data)
        return data;
    } catch (error) {
        
    }
}