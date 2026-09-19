import app from './app.js';
import 'dotenv/config';

app.listen(process.env.API_PORT, () => {
    console.log(`Server running in port '${process.env.API_PORT}'`);
});