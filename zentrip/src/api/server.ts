import express from 'express';
import cors from 'cors';
import gygEndpoints from './gygEndpoints';

const app = express();

app.use(cors());
app.use(express.json());

// Ruta raíz para verificar que el servidor está funcionando
app.get('/', (_req, res) => {
  res.json({ message: 'GetYourGuide API Server Running' });
});

app.use('/api/gyg', gygEndpoints);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 