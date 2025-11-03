import http from "http";
import app from "./app.js";
import { PORT } from "./config/env.js";


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
