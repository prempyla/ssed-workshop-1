import express from 'express';
import festRoutes from './routes/festRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', festRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to Fest Registration System API');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API is available at http://localhost:${PORT}/api/participants`);
});
