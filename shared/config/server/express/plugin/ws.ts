import type { Server } from "node:http";
import { WebSocketServer } from "ws";

export default function registerWebSocket(
    server: Server,
) {
    if (!server) {
        throw new Error(
            "HTTP server is required when websocket plugin is enabled",
        );
    }
    const wss = new WebSocketServer({
        server,
        path: "/ws",
    });

    wss.on("connection", (socket, request) => {
        console.log("WebSocket connected:", request.socket.remoteAddress);

        socket.send(
            JSON.stringify({
                type: "connected",
                message: "WebSocket connection established",
            }),
        );

        socket.on("message", (message) => {
            console.log("Received:", message.toString());

            socket.send(
                JSON.stringify({
                    type: "message",
                    data: message.toString(),
                }),
            );
        });

        socket.on("close", () => {
            console.log("WebSocket disconnected");
        });

        socket.on("error", (error) => {
            console.error("WebSocket error:", error);
        });
    });

    return wss;
}