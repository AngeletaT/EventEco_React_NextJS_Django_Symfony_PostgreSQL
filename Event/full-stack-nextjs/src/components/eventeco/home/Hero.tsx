"use client";

import React from "react";
import { Button } from "@/utils/PrimeReactComponents";

const Hero: React.FC = () => {
    return (
        <div
            className="grid grid-nogutter surface-0 text-800"
            style={{
                background:
                    "linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%)",
                clipPath: "ellipse(150% 87% at 93% 13%)",
            }}
        >
            <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                <section>
                    <span className="block text-6xl font-bold mb-1">
                        Donde la música y<div className="text-6xl text-green-500 font-bold">la sostenibilidad</div> se encuentran
                    </span>
                    <p className="mt-0 mb-4 text-700 line-height-3">
                        Música, deporte, cultura y mucho más. EventEco es un lugar donde puedes disfrutar de eventos de música, deporte, cultura y
                        mucho más, mientras ayudas a cuidar el planeta.
                    </p>

                    <Button label="Explorar Eventos" className="p-button-success" onClick={() => (window.location.href = "/eventeco/shop")} />
                </section>
            </div>
            <div className="col-12 md:col-6 overflow-hidden">
                <video className="md:ml-auto block md:h-full" style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }} autoPlay loop muted>
                    <source src="\assets\e_video\heroVideo.mp4" type="video/mp4" />
                    Tu navegador no soporta el video de fondo.
                </video>
            </div>
        </div>
    );
};

export default Hero;
