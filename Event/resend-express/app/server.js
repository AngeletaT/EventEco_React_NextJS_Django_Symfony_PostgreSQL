import express from 'express';
import emailRoutes from './src/routes/emailRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;

// Habilitar CORS
app.use(cors());

// Middleware para analizar JSON
app.use(express.json());

// Rutas
app.use('/api/feedback', emailRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});