
import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
import sessionCheckout from './src/routes/sessionCheckout.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use('/api', sessionCheckout);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



