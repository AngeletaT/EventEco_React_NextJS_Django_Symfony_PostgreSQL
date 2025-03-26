// Ruta: /components/legal/OrganizerTermsModalContent.tsx

import React from "react";

const OrganizerTermsModalContent = () => {
    return (
        <div>
            <h2>Términos y Condiciones para Organizadores</h2>
            <p>Última actualización: Marzo 2025</p>

            <h3>1. Objeto del Contrato</h3>
            <p>
                El presente contrato regula la relación entre EventEco (plataforma de organización de eventos sostenibles) y los organizadores que
                utilizan sus servicios para publicar, gestionar y promocionar eventos a través de la plataforma web.
            </p>

            <h3>2. Planes de Contratación</h3>
            <p>
                El organizador puede seleccionar uno de los tres planes de colaboración disponibles, cada uno con características, tarifas y
                funcionalidades específicas. La contratación de un plan implica la aceptación expresa de sus condiciones, publicadas en la sección
                correspondiente de la plataforma.
            </p>

            <h3>3. Remuneración y Gestión de Entradas</h3>
            <p>
                EventEco recibirá una comisión por gastos de gestión por cada entrada vendida a través de la plataforma, cuyo porcentaje será
                especificado en el contrato individual del plan. El organizador recibirá el importe restante mediante transferencia bancaria, previa
                deducción de impuestos o tasas si corresponde.
            </p>

            <h3>4. Obligaciones del Organizador</h3>
            <ul>
                <li>Garantizar que el evento cumple con la legislación vigente y cuenta con las licencias necesarias.</li>
                <li>Proporcionar información veraz y actualizada del evento.</li>
                <li>Implementar, en la medida de lo posible, prácticas sostenibles (transporte compartido, reducción de residuos, etc.).</li>
                <li>No promover actividades ilícitas ni eventos fuera de la plataforma sin autorización expresa.</li>
            </ul>

            <h3>5. Obligaciones de EventEco</h3>
            <ul>
                <li>Brindar acceso a herramientas digitales para la gestión integral del evento.</li>
                <li>Promocionar el evento en sus canales según lo incluido en el plan contratado.</li>
                <li>Garantizar el soporte técnico para incidencias relacionadas con la plataforma.</li>
            </ul>

            <h3>6. Uso de Marca y Contenidos</h3>
            <p>
                El organizador autoriza a EventEco a utilizar logotipos, imágenes y nombres relacionados con el evento para su promoción dentro y
                fuera de la plataforma, respetando siempre los derechos de propiedad intelectual.
            </p>

            <h3>7. Duración del Contrato y Cancelación</h3>
            <p>
                Este contrato entra en vigor desde la contratación de un plan por parte del organizador y se mantendrá activo mientras el evento esté
                publicado. En caso de cancelación, el organizador deberá informar con un mínimo de 15 días naturales de antelación. Si existen
                entradas ya vendidas, se aplicarán condiciones específicas de reembolso y responsabilidad compartida.
            </p>

            <h3>8. Responsabilidad</h3>
            <p>
                EventEco actúa como intermediario digital, por lo que no se hace responsable de la ejecución del evento físico ni de posibles
                incidencias en su desarrollo. El organizador asume toda responsabilidad legal, administrativa o civil derivada de su actividad.
            </p>

            <h3>9. Resolución de Conflictos</h3>
            <p>
                Las partes se comprometen a intentar resolver cualquier desacuerdo mediante negociación amistosa o mediación. En caso de conflicto
                legal, se someterán a los Juzgados y Tribunales de la ciudad de Valencia, España.
            </p>

            <h3>10. Aceptación</h3>
            <p>
                La contratación de cualquiera de los planes implica la aceptación expresa de los presentes términos y condiciones, los cuales
                permanecerán accesibles desde el perfil del organizador en todo momento.
            </p>
        </div>
    );
};

export default OrganizerTermsModalContent;
