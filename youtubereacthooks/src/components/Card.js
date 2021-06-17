import React, { useContext } from 'react';
import FavoriteContext from '../contexts/favoriteContext';

const Card = (props) =>{
    const {pokemon} = props;
    const {favoritePokemons,updateFavoritePokemons} = useContext(FavoriteContext);

    const redHeart = "🏀";
    const blackheart = "🏐";
    const heart = favoritePokemons.includes(pokemon.name) ? redHeart:blackheart; //Cambia color del corazon
    console.log("Cards",pokemon)
    //Funcion para llamar y quitar o agregar valor
    const clickHeart = (e)=>{
        e.preventDefault();//para que no exista efecto secundario en el booton
        updateFavoritePokemons(pokemon.name)
    }

    return (
        <div className="card">
            <div className="car-img-container">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="card-img"></img>
            </div>
            <div className="card-body">                
                <div className="card-top">
                    <h3>{pokemon.name}</h3>
                    <div># {pokemon.id}</div>
                </div>
                <div className="card-bottom">
                    <div className="card-type">
                        {pokemon.types.map((type,idx)=>{
                            return (
                                <div key={idx} className="card-type-text"> {type.type.name}</div>
                            )
                        })}
                    </div>
                    <button className="boton-favorito" onClick={clickHeart}>
                        <div className="favorito">{heart}</div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card; 