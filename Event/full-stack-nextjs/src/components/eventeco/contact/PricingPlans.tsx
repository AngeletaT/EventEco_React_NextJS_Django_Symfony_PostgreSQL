"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/utils/PrimeReactComponents";
import ContactForm from "@/components/eventeco/contact/ContactForm";
import styles from "@/styles/eventeco/Contact.module.css";

const PricingPlans: React.FC = () => {
    const [selectedPlan, setSelectedPlan] = useState<string>("");
    const formRef = useRef<HTMLDivElement>(null);

    const handleSelectPlan = (plan: string) => {
        setSelectedPlan(plan);
    };

    useEffect(() => {
        if (selectedPlan && formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [selectedPlan]);

    return (
        <div className={`surface-0 ${styles.container}`}>
            <div className="text-900 font-bold text-6xl mb-4 text-center">¿Quieres que organicemos tu evento?</div>
            <div className="text-700 text-xl mb-6 text-center line-height-3">
                Únete a EventEco y haz que tu evento sea sostenible, atractivo y con impacto positivo para el planeta.
            </div>

            <div className="grid">
                {/* Plan Básico */}
                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: "6px", backgroundColor: "#dde5d7" }}>
                            <div className="text-900 font-medium text-xl mb-2">🌱 Básico</div>
                            <div className="text-600">Ideal para pequeños eventos sostenibles</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="font-bold text-2xl text-900">799€</span>
                                <span className="ml-2 font-medium text-600">por evento</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <ul className="list-none p-0 m-0 flex-grow-1">
                                <li className="flex align-items-center mb-3">🌿 Sello EventEco Certified</li>
                                <li className="flex align-items-center mb-3">📢 Soporte técnico y organizativo</li>
                                <li className="flex align-items-center mb-3">♻️ Reparto de vasos reutilizables</li>
                                <li className="flex align-items-center mb-3">📊 Informe de impacto ecológico del evento</li>
                            </ul>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                            <Button
                                label="Solicitar este plan"
                                className={`p-3 w-full  ${selectedPlan === "Básico" ? "p-button-warning" : "p-button-success"}`}
                                onClick={() => handleSelectPlan("Básico")}
                            />
                        </div>
                    </div>
                </div>

                {/* Plan Avanzado */}
                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: "6px", backgroundColor: "#dde5d7" }}>
                            <div className="text-900 font-medium text-xl mb-2">⚡ Avanzado</div>
                            <div className="text-600">Para eventos de tamaño medio con soluciones energéticas</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="font-bold text-2xl text-900">1.249€</span>
                                <span className="ml-2 font-medium text-600">por evento</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <ul className="list-none p-0 m-0 flex-grow-1">
                                <li className="mb-3">✅ Todo lo del plan Básico</li>
                                <li className="mb-3">🚌 Autobuses lanzadera (hasta 5 ciudades)</li>
                                <li className="mb-3">🌞 Escenario y puestos con placas solares</li>
                                <li className="mb-3">🎯 Asistencia integral antes y durante el evento</li>
                                <li className="mb-3">🎥 Producción de vídeo resumen del evento</li>
                            </ul>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button
                                label="Solicitar este plan"
                                className={`p-3 w-full  ${selectedPlan === "Avanzado" ? "p-button-warning" : "p-button-success"}`}
                                onClick={() => handleSelectPlan("Avanzado")}
                            />
                        </div>
                    </div>
                </div>

                {/* Plan Completo */}
                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 flex flex-column" style={{ borderRadius: "6px", backgroundColor: "#dde5d7" }}>
                            <div className="text-900 font-medium text-xl mb-2">🌍 Completo</div>
                            <div className="text-600">Para grandes eventos con despliegue ecológico total</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="font-bold text-2xl text-900">1.899€</span>
                                <span className="ml-2 font-medium text-600">por evento</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <ul className="list-none p-0 m-0 flex-grow-1">
                                <li className="mb-3">✅ Todo lo del plan Avanzado</li>
                                <li className="mb-3">🚌 Autobuses lanzadera (hasta 15 ciudades)</li>
                                <li className="mb-3">📦 Gestión de residuos y reciclaje especializado</li>
                                <li className="mb-3">🕺 Suelos cinéticos para generación energética</li>
                                <li className="mb-3">🏕️ Espacios chill-out ecológicos con decoración sostenible</li>
                                <li className="mb-3">📢 Campaña personalizada en medios</li>
                            </ul>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button
                                label="Solicitar este plan"
                                className={`p-3 w-full  ${selectedPlan === "Completo" ? "p-button-warning" : "p-button-success"}`}
                                onClick={() => handleSelectPlan("Completo")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {selectedPlan && (
                <div ref={formRef}>
                    <ContactForm selectedPlan={selectedPlan} />
                </div>
            )}
        </div>
    );
};

export default PricingPlans;
