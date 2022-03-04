import React from "react";

const Tour = (props) => {
  const days = Math.floor(+props.duration/24);
  const hours = +props.duration - days * 24;
  return (
      <div className="tour-item__info">
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        {props.duration ?  
          <><p>Тривалість туру - {days ? `${days} дн.`: null} {hours ? `${hours} год.`: null}</p></>
        : <p>Тривалість туру - 0 дн.</p>}
        <p><b>{props.price} грн</b></p>
        <p>Проводяться з <em>{new Date(props.dateStart).toLocaleDateString()}</em> по  
          <em> {new Date(props.dateEnd).toLocaleDateString()}</em>
        </p>
      </div>
      
  )
}

export default Tour;