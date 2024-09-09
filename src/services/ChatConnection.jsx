import io from "socket.io-client";

class ChatConnection {
  constructor(chatId, token, handlers) {
    this.chatId = chatId;
    this.token = token;
    this.handlers = handlers;
    this.connectionType = "websocket";
    this.lastMessageId = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = 3000;
    this.pingInterval = null;
    this.socket = null;

    this.connect();
  }

  async connect() {
    const isProxy = await this.detectProxy();

    if (isProxy) {
      console.log("Proxy detected. Adjusting connection strategy.");
    }

    this.connectWebSocket();
  }

  connectWebSocket() {
    const url = `https://${process.env.WS_BASE_URL}`;

    this.socket = io(url, {
      path: `/chats/${this.chatId}`,
      query: { token: this.token },
      transports: ["websocket", "polling"],
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectInterval,
      timeout: 10000,
      forceNew: true,
    });

    this.socket.on("connect", () => {
      console.log("Connected to chat via WebSocket");
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.connectionType = "websocket";
      this.startPingInterval();
      if (this.handlers.onOpen) this.handlers.onOpen();
    });

    this.socket.on("message", (data) => {
      if (this.handlers.onMessage) this.handlers.onMessage(data);
      this.lastMessageId = data.id;
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected from chat:", reason);
      this.isConnected = false;
      this.stopPingInterval();
      if (this.handlers.onClose) this.handlers.onClose(reason);

      if (reason === "io server disconnect") {
        // The server has forcefully disconnected the socket
        this.socket.connect();
      }
    });

    this.socket.on("error", (error) => {
      console.error("WebSocket error:", error);
      if (this.handlers.onError) this.handlers.onError(error);

      if (
        !this.isConnected &&
        this.reconnectAttempts >= this.maxReconnectAttempts
      ) {
        console.log(
          "Max reconnect attempts reached. Falling back to long polling.",
        );
        this.connectLongPolling();
      }
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      this.reconnectAttempts++;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.log(
          "Max reconnect attempts reached. Falling back to long polling.",
        );
        this.socket.close();
        this.connectLongPolling();
      }
    });
  }

  connectLongPolling() {
    this.connectionType = "long-polling";
    this.isConnected = true;
    if (this.handlers.onOpen) this.handlers.onOpen();
    this.pollMessages();
  }

  pollMessages() {
    const poll = () => {
      if (!this.isConnected) return;

      fetch(
        `${process.env.API_BASE_URL}/chats/${this.chatId}/messages?since=${this.lastMessageId || ""}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        },
      )
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          if (data.messages && data.messages.length > 0) {
            data.messages.forEach((message) => {
              if (this.handlers.onMessage) this.handlers.onMessage(message);
            });
            this.lastMessageId = data.messages[data.messages.length - 1].id;
          }
          setTimeout(poll, 3000); // Poll every 3 seconds
        })
        .catch((error) => {
          console.error("Long polling error:", error);
          if (this.handlers.onError) this.handlers.onError(error);
          setTimeout(poll, 10000); // Retry after 10 seconds on error
        });
    };

    poll();
  }

  send(message) {
    if (
      this.connectionType === "websocket" &&
      this.socket &&
      this.socket.connected
    ) {
      this.socket.emit("message", message);
    } else {
      fetch(`${process.env.API_BASE_URL}/chats/${this.chatId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(message),
      }).catch((error) => console.error("Error sending message:", error));
    }
  }

  startPingInterval() {
    this.pingInterval = setInterval(() => {
      if (this.socket && this.socket.connected) {
        this.socket.emit("ping");
      }
    }, 30000); // Ping every 30 seconds
  }

  stopPingInterval() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  async detectProxy() {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      const detectedIP = data.ip;

      // Compare detectedIP with the user's actual IP (if known)
      // This is a simplified check and might not be 100% accurate
      return detectedIP !== localStorage.getItem("userActualIP");
    } catch (error) {
      console.error("Error detecting proxy:", error);
      return false;
    }
  }

  close() {
    this.isConnected = false;
    this.stopPingInterval();
    if (this.socket) {
      this.socket.close();
    }
    if (this.handlers.onClose) this.handlers.onClose("User closed connection");
  }
}

export default new ChatConnection();
