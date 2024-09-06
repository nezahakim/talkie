import axios from "axios";

const API_BASE_URL =
  "https://94458d4a-03fc-40fe-9c73-a107faef071c-00-126sm7vflti8p.spock.replit.dev:3000/api";

class Api {
  constructor() {
    this.axios = axios.create({
      baseURL: API_BASE_URL,
    });

    this.axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          // Optionally, redirect to login page or dispatch a logout action
        }
        return Promise.reject(error);
      },
    );
  }

  async getUserProfile(userId) {
    if (!userId) {
      throw new Error("User ID is required to fetch user profile");
    }
    try {
      const response = await this.axios.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  // User routes
  async register(userData) {
    const response = await this.axios.post("/users/register", userData);
    return response.data;
  }

  async login(credentials) {
    const response = await this.axios.post("/users/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.user_id);
    }
    return response.data;
  }

  async updateUserProfile(userId, userData) {
    const response = await this.axios.put(`/users/${userId}`, userData);
    return response.data;
  }

  // Session routes
  async createSession(sessionData) {
    const response = await this.axios.post("/sessions", sessionData);
    return response.data;
  }

  async endSession(sessionId) {
    const response = await this.axios.post(`/sessions/${sessionId}/end`);
    return response.data;
  }

  async getActiveSessions() {
    const response = await this.axios.get("/sessions/active");
    return response.data;
  }

  async joinSession(sessionId) {
    const response = await this.axios.post(`/sessions/${sessionId}/join`);
    return response.data;
  }

  async leaveSession(sessionId) {
    const response = await this.axios.post(`/sessions/${sessionId}/leave`);
    return response.data;
  }

  // Community routes
  async createCommunity(communityData) {
    const response = await this.axios.post("/communities", communityData);
    return response.data;
  }

  async getCommunity(communityId) {
    const response = await this.axios.get(`/communities/${communityId}`);
    return response.data;
  }

  async deleteCommunity(communityId) {
    const response = await this.axios.delete(`/communities/${communityId}`);
    return response.data;
  }

  // WebSocket connection for live sessions
  connectToSession(sessionId, handlers) {
    const token = localStorage.getItem("token");
    const ws = new WebSocket(
      `${process.env.REACT_APP_WS_URL}/sessions/${sessionId}?token=${token}`,
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
}

export default new Api();
