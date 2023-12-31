import express from "express"
import path from "path";
import http from "http"
import { Server } from "socket.io"

const app = express();
const PORT = 5000;
const server = http.createServer(app);
const io = new Server(server)

// Socket connections

io.on("connection", (socket) => {
    console.log("Connected...");

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})

app.use(express.static(path.resolve('./public')));
app.get('/', (req, res) => {
    return res.sendFile('/public/index.html')
})

server.listen(PORT, () => console.log(`Server is started at PORT: ${PORT}`))
