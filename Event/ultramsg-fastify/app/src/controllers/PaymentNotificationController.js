import axiosInstance from '../utils/axiosInstance.js';

const sendPaymentNotification = async (request, reply) => {
  const { phone } = request.body;

  if (!phone) {
    return reply.status(400).send({ error: 'Phone is required' });
  }

  try {
    // Construir el payload con el mensaje personalizado
    const payload = {
      to: phone,
      body: ` 🎉 *EventEco* 🎉\n¡Gracias por confiar en nosotros para vivir experiencias! 🙌
      \nTu pago ha sido procesado con éxito. 🛡️
      \nHemos enviado un correo electrónico con los detalles de tu transacción y las entradas para el evento.
      \nSi tienes alguna pregunta, no dudes en contactarnos.
      \n📧 Email: soporte@eventeco.com
      \n🎊 ¡Esperamos verte en pronto! 🎊`
    };

    const response = await axiosInstance.post('/messages/chat', payload);

    // Validar que el mensaje se haya enviado correctamente
    if (response.data.sent !== 'true') {
      throw new Error(`Failed to send notification: ${response.data.message || 'Unknown error'}`);
    }

    reply.status(200).send({ message: 'Payment notification sent successfully', result: response.data });
  } catch (error) {
    reply.status(500).send({ error: 'Failed to send payment notification', details: error.message });
  }
};

export default { sendPaymentNotification };