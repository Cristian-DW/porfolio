import React from "react";



function HeroProject ({date, name, description, type, imageUrl, alt} ){


    return(
        <>
        <section>
        <div className=""
        style={{ backgroundImage: `url(${backgroundImage})` }}></div>

        <div className="w-full">
            <div className="">
                <img src={imageUrl} alt="imagen volver" />
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
                <img width='16px' height='16px'
        src={imageUrl}
        alt={alt}
        className="" />
            </div>
        </div>
        </section>
        </>
    )
}

export default HeroProject;