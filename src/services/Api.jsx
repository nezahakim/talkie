import axios from "axios";
import { useNavigate } from "react-router-dom";

const a =
  "https://0d3a37b3-590d-4da3-892e-347bbc5cb91e-00-1gsjkthjnxlbp.spock.replit.dev";
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
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
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
}

export default new Api();
