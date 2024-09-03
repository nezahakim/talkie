package main

import (
  "encoding/json"
  "log"
  "net/http"
  "sync"

  "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
  CheckOrigin: func(r *http.Request) bool {
    return true // Allow all origins for now. In production, this should be more restrictive.
  },
}

type Client struct {
  conn *websocket.Conn
  send chan []byte
}

type Session struct {
  clients    map[*Client]bool
  broadcast  chan []byte
  register   chan *Client
  unregister chan *Client
}

var sessions = make(map[string]*Session)
var sessionMutex sync.Mutex

func newSession() *Session {
  return &Session{
    clients:    make(map[*Client]bool),
    broadcast:  make(chan []byte),
    register:   make(chan *Client),
    unregister: make(chan *Client),
  }
}

func (s *Session) run() {
  for {
    select {
    case client := <-s.register:
      s.clients[client] = true
    case client := <-s.unregister:
      if _, ok := s.clients[client]; ok {
        delete(s.clients, client)
        close(client.send)
      }
    case message := <-s.broadcast:
      for client := range s.clients {
        select {
        case client.send <- message:
        default:
          close(client.send)
          delete(s.clients, client)
        }
      }
    }
  }
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
  sessionID := r.URL.Query().Get("session_id")
  if sessionID == "" {
    http.Error(w, "Missing session_id", http.StatusBadRequest)
    return
  }

  conn, err := upgrader.Upgrade(w, r, nil)
  if err != nil {
    log.Println(err)
    return
  }

  sessionMutex.Lock()
  session, ok := sessions[sessionID]
  if !ok {
    session = newSession()
    sessions[sessionID] = session
    go session.run()
  }
  sessionMutex.Unlock()

  client := &Client{conn: conn, send: make(chan []byte, 256)}
  session.register <- client

  go client.writePump()
  client.readPump(session)
  }

  func (c *Client) readPump(session *Session) {
  defer func() {
    session.unregister <- c
    c.conn.Close()
  }()

  for {
    _, message, err := c.conn.ReadMessage()
    if err != nil {
      if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
        log.Printf("error: %v", err)
      }
      break
    }
    session.broadcast <- message
  }
  }

  func (c *Client) writePump() {
  defer c.conn.Close()

  for {
    select {
    case message, ok := <-c.send:
      if !ok {
        c.conn.WriteMessage(websocket.CloseMessage, []byte{})
        return
      }

      w, err := c.conn.NextWriter(websocket.TextMessage)
      if err != nil {
        return
      }
      w.Write(message)

      n := len(c.send)
      for i := 0; i < n; i++ {
        w.Write([]byte{'\n'})
        w.Write(<-c.send)
      }

      if err := w.Close(); err != nil {
        return
      }
    }
  }
  }

  type Message struct {
  Type    string `json:"type"`
  Content string `json:"content"`
  }

  func broadcastToSession(sessionID string, message []byte) {
  sessionMutex.Lock()
  session, ok := sessions[sessionID]
  sessionMutex.Unlock()

  if ok {
    session.broadcast <- message
  }
  }

  func endSession(sessionID string) {
  sessionMutex.Lock()
  session, ok := sessions[sessionID]
  if ok {
    delete(sessions, sessionID)
  }
  sessionMutex.Unlock()

  if ok {
    close(session.broadcast)
    for client := range session.clients {
      close(client.send)
    }
  }
  }

  func handleAudioData(sessionID string, audioData []byte) {
  // Here, you would typically process the audio data using the C++ component
  // For now, we'll just broadcast it to all clients in the session
  broadcastToSession(sessionID, audioData)
  }
