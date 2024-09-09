import axios from "axios";

const a =
  "https://0d3a37b3-590d-4da3-892e-347bbc5cb91e-00-1gsjkthjnxlbp.spock.replit.dev/api";
// Base URL for API requests
const API_BASE_URL = "https://talkie-back.vercel.app/api";
const WS_BASE_URL = "wss://talkie-back.vercel.app/ws";

class Api {
  constructor() {
    this.axios = axios.create({
      baseURL: API_BASE_URL,
    });

    this.axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["x-auth-token"] = token;
      }

      return config;
    });

    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          // const navigate = useNavigate();
          // navigate("/login");
          // Optionally, redirect to login page or dispatch a logout action
        }
        return Promise.reject(error);
      },
    );
  }

  // User routes
  async register(userData) {
    const response = await this.axios.post("/auth/register", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
    }
    return response.data;
  }

  async login(credentials) {
    const response = await this.axios.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
    }
    return response.data;
  }

  async getUserProfile(username) {
    let endpoint;
    if (!username) {
      endpoint = `/users/profile`;
    } else {
      endpoint = `/users/profile/${username}`;
    }

    try {
      const response = await this.axios.get(endpoint, {
        params: {
          userId: localStorage.getItem("user"),
        },
      });

      if (response.data.message == "Token is not valid") {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  async updateUserProfile(userData) {
    const userId = localStorage.getItem("user_id");
    const response = await this.axios.put(`/users/profile`, userData);
    return response.data;
  }

  async followUser(userId) {
    const response = await this.axios.post(`/users/follow/${userId}`);
    return response.data;
  }

  async unfollowUser(userId) {
    const response = await this.axios.delete(`/users/unfollow/${userId}`);
    return response.data;
  }

  // Room routes
  async createRoom(roomData) {
    const response = await this.axios.post("/rooms", roomData);
    return response.data;
  }

  async getRooms() {
    const response = await this.axios.get("/rooms");
    return response.data;
  }

  async joinRoom(sessionId) {
    const response = await this.axios.post(`/rooms/${sessionId}/join`);
    return response.data;
  }

  async leaveRoom(sessionId) {
    const response = await this.axios.post(`/rooms/${sessionId}/leave`);
    return response.data;
  }

  async endRoom(sessionId) {
    const response = await this.axios.post(`/rooms/${sessionId}/end`);
    return response.data;
  }

  async startStreaming(sessionId) {
    const response = await this.axios.post(`/rooms/${sessionId}/stream/start`);
    return response.data;
  }

  async stopStreaming(sessionId) {
    const response = await this.axios.post(`/rooms/${sessionId}/stream/stop`);
    return response.data;
  }

  async processAudioStream(sessionId, audioData) {
    const response = await this.axios.post(
      `/rooms/${sessionId}/stream/process`,
      audioData,
    );
    return response.data;
  }

  async getActiveSpeakers(sessionId) {
    const response = await this.axios.get(`/rooms/${sessionId}/speakers`);
    return response.data;
  }

  // WebSocket connection for live sessions
  connectToSession(sessionId, handlers) {
    const token = localStorage.getItem("token");
    const ws = new WebSocket(
      `${WS_BASE_URL}/sessions/${sessionId}?token=${token}`,
    );

    ws.onopen = () => {
      console.log("WebSocket connection established");
      if (handlers.onOpen) handlers.onOpen();
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (handlers.onMessage) handlers.onMessage(data);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      if (handlers.onClose) handlers.onClose();
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (handlers.onError) handlers.onError(error);
    };

    return {
      send: (message) => ws.send(JSON.stringify(message)),
      close: () => ws.close(),
    };
  }

  async getAllChats() {
    const response = await this.axios.get("/chats");
    return response.data;
  }

  async getChatMessages(chatId, limit = 50, offset = 0) {
    const response = await this.axios.get(`/chats/${chatId}/messages`, {
      params: { limit, offset },
    });
    return response.data;
  }

  async sendMessage(chatId, message) {
    const response = await this.axios.post(`/chats/${chatId}/messages`, {
      message,
    });
    return response.data;
  }

  async deleteMessage(chatId, messageId) {
    const response = await this.axios.delete(
      `/chats/${chatId}/messages/${messageId}`,
    );
    return response.data;
  }

  async createPrivateChat(userId) {
    const response = await this.axios.post("/chats/private", { userId });
    return response.data;
  }

  async createCommunity(communityData) {
    const response = await this.axios.post("/communities", communityData);
    return response.data;
  }

  async getCommunityMembers(communityId) {
    const response = await this.axios.get(
      `/communities/${communityId}/members`,
    );
    return response.data;
  }

  async removeCommunityMember(communityId, userId) {
    const response = await this.axios.delete(
      `/communities/${communityId}/members/${userId}`,
    );
    return response.data;
  }

  async getCommunityChats() {
    const response = await this.axios.get("/chats/community");
    return response.data;
  }

  async joinCommunityChat(communityId) {
    const response = await this.axios.post(
      `/chats/community/${communityId}/join`,
    );
    return response.data;
  }

  async leaveCommunityChat(communityId) {
    const response = await this.axios.post(
      `/chats/community/${communityId}/leave`,
    );
    return response.data;
  }

  async pinMessage(chatId, messageId) {
    const response = await this.axios.post(
      `/chats/${chatId}/messages/${messageId}/pin`,
    );
    return response.data;
  }

  async unpinMessage(chatId, messageId) {
    const response = await this.axios.post(
      `/chats/${chatId}/messages/${messageId}/unpin`,
    );
    return response.data;
  }

  // WebSocket connection for real-time chat updates
  // connectToChat(chatId, handlers) {
  //   const token = localStorage.getItem("token");
  //   const ws = new WebSocket(`${WS_BASE_URL}/chats/${chatId}?token=${token}`);

  //   ws.onopen = () => {
  //     console.log("Chat WebSocket connection established");
  //     if (handlers.onOpen) handlers.onOpen();
  //   };

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     if (handlers.onMessage) handlers.onMessage(data);
  //   };

  //   ws.onclose = () => {
  //     console.log("Chat WebSocket connection closed");
  //     if (handlers.onClose) handlers.onClose();
  //   };

  //   ws.onerror = (error) => {
  //     console.error("Chat WebSocket error:", error);
  //     if (handlers.onError) handlers.onError(error);
  //   };

  //   return {
  //     send: (message) => ws.send(JSON.stringify(message)),
  //     close: () => ws.close(),
  //   };
  // }

  // connectToChat(chatId, handlers) {
  //   const token = localStorage.getItem("token");
  //   const maxRetries = 5;
  //   let retryCount = 0;
  //   let ws;

  //   function connect() {
  //     const url = `${WS_BASE_URL}/chats/${chatId}?token=${token}`;
  //     console.log(`Attempting to connect to WebSocket: ${url}`);

  //     ws = new WebSocket(url);

  //     ws.onopen = () => {
  //       console.log("Chat WebSocket connection established");
  //       retryCount = 0;
  //       if (handlers.onOpen) handlers.onOpen();
  //     };

  //     ws.onmessage = (event) => {
  //       try {
  //         const data = JSON.parse(event.data);
  //         if (handlers.onMessage) handlers.onMessage(data);
  //       } catch (error) {
  //         console.error("Error parsing WebSocket message:", error);
  //       }
  //     };

  //     ws.onclose = (event) => {
  //       console.log(
  //         `Chat WebSocket connection closed. Code: ${event.code}, Reason: ${event.reason}`,
  //       );
  //       if (handlers.onClose) handlers.onClose(event);

  //       if (retryCount < maxRetries) {
  //         retryCount++;
  //         console.log(
  //           `Attempting to reconnect (${retryCount}/${maxRetries})...`,
  //         );
  //         setTimeout(connect, 3000);
  //       } else {
  //         console.error("Max retries reached. WebSocket connection failed.");
  //       }
  //     };

  //     ws.onerror = (error) => {
  //       console.error("Chat WebSocket error:", error);
  //       console.log("WebSocket readyState:", ws.readyState);
  //       console.log("Navigator online status:", navigator.onLine);

  //       // Log additional information about the WebSocket
  //       console.log("WebSocket URL:", ws.url);
  //       console.log("WebSocket protocol:", ws.protocol);
  //       console.log("WebSocket extensions:", ws.extensions);

  //       if (handlers.onError) handlers.onError(error);
  //     };
  //   }

  //   connect();

  //   return {
  //     send: (message) => {
  //       if (ws.readyState === WebSocket.OPEN) {
  //         ws.send(JSON.stringify(message));
  //       } else {
  //         console.error(
  //           `WebSocket is not open (readyState: ${ws.readyState}). Message not sent.`,
  //         );
  //       }
  //     },
  //     close: () => {
  //       if (
  //         ws.readyState === WebSocket.OPEN ||
  //         ws.readyState === WebSocket.CONNECTING
  //       ) {
  //         ws.close();
  //       }
  //     },
  //   };
  // }

  connectToChat(chatId, handlers) {
    const token = localStorage.getItem("token");
    const maxRetries = 5;
    let retryCount = 0;
    let ws;

    function connect() {
      const url = `${WS_BASE_URL}/chats/${chatId}?token=${token}`;
      console.log(`Attempting to connect to WebSocket: ${url}`);

      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("Chat WebSocket connection established");
        retryCount = 0;
        if (handlers.onOpen) handlers.onOpen();
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (handlers.onMessage) handlers.onMessage(data);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onclose = (event) => {
        console.log(
          `Chat WebSocket connection closed. Code: ${event.code}, Reason: ${event.reason}`
        );
        if (handlers.onClose) handlers.onClose(event);
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Attempting to reconnect (${retryCount}/${maxRetries})...`);
          setTimeout(connect, 3000 * Math.pow(2, retryCount)); // Exponential backoff
        } else {
          console.error("Max retries reached. WebSocket connection failed.");
        }
      };

      ws.onerror = (error) => {
        console.error("Chat WebSocket error:", error);
        if (handlers.onError) handlers.onError(error);
      };
    }

    function checkConnection() {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "ping" }));
      } else {
        console.log("WebSocket not open, attempting to reconnect...");
        connect();
      }
    }

    connect();

    // Set up a heartbeat to keep the connection alive
    const heartbeatInterval = setInterval(() => {
      checkConnection();
    }, 30000);

    return {
      send: (message) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(message));
        } else {
          console.error(
            `WebSocket is not open (readyState: ${ws.readyState}). Message not sent.`
          );
          checkConnection();
        }
      },
      close: () => {
        clearInterval(heartbeatInterval);
        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
          ws.close();
        }
      },
    };
  }

}

export default new Api();
