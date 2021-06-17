import React from 'react';

const Paginacion = (props)=>{
    console.log("PAGINACIOn",props)
    const{onLeftClick,onRightClick,page,totalPaginas} = props;
    return(
        <div className="paginacion">
            <button className="btn-paginacion" onClick={onLeftClick}><div className="icon">⬅</div></button>
            <div> {page} de {totalPaginas} páginas</div>
            <button className="btn-paginacion" onClick={onRightClick}><div className="icon">➡</div></button>
        </div>
    )
}

export default Paginacion;