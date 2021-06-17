import React,{useState,useEffect} from 'react'

function Funcion() {
    const [datos,setDatos] = useState([])

    useEffect(()=>{//https://pokeapi.co/api/v2/pokemon/ditto
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response=>response.json())
            .then(res=>{
                console.log('Funcion->',res);
                setDatos(res);
            })
            .catch(error=>console.error("Erro->",error));
    })

    return (
        <div>
            <ul>
                {datos.map(d =>(
                    <h5 key={d.id}> - {d.id} - {d.title}</h5>
                ))}
            </ul>
        </div>
    )
}

export default Funcion
