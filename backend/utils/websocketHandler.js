import { WebSocketServer } from "ws";
import logger from "./logger.js";

const wss = new WebSocketServer({ noServer: true });

const sessions = new Map();

export async function startSession(sessionId) {
  sessions.set(sessionId, new Set());
  logger.info(`Session ${sessionId} started`);
}

export async function endSession(sessionId) {
  const clients = sessions.get(sessionId);
  if (clients) {
    clients.forEach((client) => {
      if (client.readyState === WebSocketServer.OPEN) {
        client.close();
      }
    });
    sessions.delete(sessionId);
    logger.info(`Session ${sessionId} ended`);
  }
}

wss.on("connection", (ws, req) => {
  const sessionId = req.url.split("/").pop();
  const clients = sessions.get(sessionId);
  if (!clients) {
    ws.close();
    return;
  }

  clients.add(ws);

  ws.on("message", (message) => {
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocketServer.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});

export default wss;
