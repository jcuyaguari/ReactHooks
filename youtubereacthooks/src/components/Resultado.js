import React from 'react';
import Card from './Card';
import Paginacion from './Paginacion';

const Resultado = (props)=>{
    console.log("PROPS->",props)
    const{pokemons,pagina,setPage,total,loading} = props;

    const lastPage = () =>{
        const nextPage = Math.max(pagina-1,0)
        setPage(nextPage)
    }

    const nextPage = () =>{
        const nextPage = Math.min(pagina+1,total)
        setPage(nextPage)
    }

    return(
        <div>
            <div className="header">
                <h2>POKEMON</h2>
                <Paginacion page={pagina+1} totalPaginas={total} onLeftClick={lastPage} onRightClick={nextPage}/>
            </div>
            {loading ? <div>CARGANDO POKEMONES ✈🚀</div>:
            <div className="resultado-grid">
                {pokemons.map((pokemon,idx)=>{
                    return(
                        <Card pokemon={pokemon} key={pokemon.name}></Card>
                        //<div key={idx}>*{idx+1}: {pokemon.name}</div>
                    )
                })}
            </div>
            }
        </div>
    )
}

export default Resultado;