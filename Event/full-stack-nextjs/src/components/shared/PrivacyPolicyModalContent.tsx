// Ruta: /components/legal/PrivacyPolicyModalContent.tsx

import React from "react";

const PrivacyPolicyModalContent = () => {
    return (
        <div>
            <h2>Política de Privacidad</h2>
            <p>Última actualización: Marzo 2025</p>

            <h3>1. Responsable del Tratamiento</h3>
            <p>
                En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo (RGPD), te informamos que los datos personales que proporciones
                serán tratados por EventEco, titular de la plataforma de gestión y organización de eventos sostenibles, con domicilio social en
                [DIRECCIÓN FISCAL] y correo electrónico de contacto: contacto@eventeco.es.
            </p>

            <h3>2. Finalidad del Tratamiento</h3>
            <p>
                Recogemos tus datos personales con las siguientes finalidades:
                <ul>
                    <li>Gestionar el registro y la autenticación de usuarios.</li>
                    <li>Procesar la compra de entradas y servicios relacionados.</li>
                    <li>Ofrecer soporte técnico y atención al cliente.</li>
                    <li>Enviar comunicaciones sobre eventos y actividades relevantes.</li>
                    <li>Garantizar el cumplimiento de nuestros compromisos en materia de sostenibilidad y trazabilidad.</li>
                </ul>
            </p>

            <h3>3. Tipos de Datos Recogidos</h3>
            <p>
                Los datos que recogemos incluyen:
                <ul>
                    <li>Datos identificativos (nombre, apellidos, DNI/NIE si aplica).</li>
                    <li>Datos de contacto (correo electrónico, teléfono).</li>
                    <li>Datos de pago (no almacenamos tarjetas, solo tokens de pasarela).</li>
                    <li>Preferencias y hábitos de navegación en la plataforma.</li>
                </ul>
            </p>

            <h3>4. Base Legal del Tratamiento</h3>
            <p>
                La legitimación del tratamiento se basa en el consentimiento del usuario, el cumplimiento de obligaciones legales y la ejecución de un
                contrato (compra de entradas o servicios).
            </p>

            <h3>5. Cesión de Datos a Terceros</h3>
            <p>
                No se cederán tus datos a terceros salvo obligación legal o si es necesario para la prestación de servicios (por ejemplo, procesadores
                de pago, proveedores tecnológicos o entidades organizadoras del evento). En todo caso, EventEco garantiza que dichos terceros cumplen
                con las medidas legales y técnicas necesarias para proteger tus datos.
            </p>

            <h3>6. Seguridad de los Datos</h3>
            <p>
                EventEco adopta medidas técnicas y organizativas adecuadas para garantizar la seguridad, confidencialidad e integridad de los datos
                personales frente a accesos no autorizados o cualquier forma de tratamiento ilícito.
            </p>

            <h3>7. Derechos de los Usuarios</h3>
            <p>
                Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de los datos
                mediante solicitud a contacto@eventeco.es, indicando el derecho que deseas ejercer y adjuntando copia de tu documento de identidad.
            </p>

            <h3>8. Conservación de los Datos</h3>
            <p>
                Tus datos se conservarán mientras exista una relación contractual y durante los plazos exigidos por ley. Si no hay relación
                contractual, serán conservados solo con fines estadísticos o analíticos durante un máximo de 12 meses.
            </p>

            <h3>9. Cookies y Navegación</h3>
            <p>
                Utilizamos cookies técnicas y analíticas para mejorar la experiencia del usuario. Puedes consultar nuestra política específica de
                cookies en el apartado correspondiente de la web.
            </p>

            <h3>10. Modificaciones de la Política</h3>
            <p>
                Nos reservamos el derecho a modificar esta política en cualquier momento. Cualquier cambio será publicado en esta misma página con
                fecha de actualización.
            </p>
        </div>
    );
};

export default PrivacyPolicyModalContent;
