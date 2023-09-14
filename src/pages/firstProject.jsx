import React from "react";



function HeroProject (date, name, description, type){


    return(
        <>
        <section>
        <div className="absolute inset-0 bg-center opacity-80 transform transition-transform bg-cover  hover:scale-105 duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImage})` }}></div>

        <div className="w-full">
            <div className="">
                <img src={} alt="imagen volver" />
                <p>Volver</p>
            </div>
            <div>
                <p>{date}</p>
                <h3>{name}</h3>
                <p>{description}</p>
                <p>{type}</p>
            </div>
            <div>
                <button><a href="">Ver Proyecto</a></button>
                <img src={} alt="imagen para dezplazarse hacia abajo" />
            </div>
        </div>
        </section>
        </>
    )
}