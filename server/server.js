const express = require('express');
const { Pool } = require('pg');
const http = require('http');

const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// const io = socketIo(server);

app.use(cors({ origin: "http://localhost:3000" }));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cnc_data ORDER BY timestamp ASC LIMIT 50');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

pool.connect((err, client, done) => {
    if (err) throw err;

    client.on('notification', (msg) => {
        const payload = JSON.parse(msg.payload);
        console.log('Payload:', payload);
        io.emit('FromAPI', payload);
    });

    client.query('LISTEN "cnc_data"');
});


const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
