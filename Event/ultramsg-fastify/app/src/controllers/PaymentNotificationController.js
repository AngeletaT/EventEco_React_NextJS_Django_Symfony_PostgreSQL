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
      body: `🐶 *¡Gracias por tu compra en PaWnity!* 🐱\n\nTu pago se ha realizado con éxito y estamos ¡más felices que un perro con dos colas! 🐕\n\n📩 Te enviaremos un correo con tus entradas una vez las nomines en nuestra aplicación.\n\n🐾 www.PaWnity.com 🐾\n\n*¿Qué sigue ahora?* Prepara a tu peludito para vivir una experiencia inolvidable. \n🐕‍🦺🐈🐇🐦🐢 \n\n ¡Nos encantará veros pronto! Ya estamos preparando todo con mucho mimo y amor. 💖\n\n *Contacto*: \n📞 +34 912 345 678 \n 📧 contacto@pawnity.com\n\n ✨ Gracias por formar parte de la familia *PaWnity* ✨\n\n🐾 *Juntos por un mundo más pet-friendly* 🐾`
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