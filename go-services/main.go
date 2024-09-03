package main

import (
  "log"
  "net/http"

  "github.com/gorilla/websocket"
)

// var upgrader = websocket.Upgrader{
//     ReadBufferSize:  1024,
//     WriteBufferSize: 1024,
//     CheckOrigin: func(r *http.Request) bool {
//         // In production, replace this with proper origin checking
//         return true
//     },
// }

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
    CheckOrigin: func(r *http.Request) bool {
        // origin := r.Header.Get("Origin")
        // return origin == "http://localhost:3000"
        return true
    },
}



func handleWebSocket(w http.ResponseWriter, r *http.Request) {
  conn, err := upgrader.Upgrade(w, r, nil)
  if err != nil {
    log.Println(err)
    return
  }
  defer conn.Close()

  for {
    messageType, p, err := conn.ReadMessage()
    if err != nil {
      log.Println(err)
      return
    }
    if err := conn.WriteMessage(messageType, p); err != nil {
      log.Println(err)
      return
    }
  }
}

func main() {
  http.HandleFunc("/ws", handleWebSocket)
  log.Println("WebSocket server starting on :8080")
  err := http.ListenAndServe(":8080", nil)
  if err != nil {
    log.Fatal("ListenAndServe: ", err)
  }
}







// package main

// import (
//     "C"
//     "log"
//     "net/http"
//     "sync"
//     "unsafe"

//     "github.com/gorilla/websocket"
// )
// import "C"

// var upgrader = websocket.Upgrader{
//     CheckOrigin: func(r *http.Request) bool {
//         return true // Allow all origins for now. In production, this should be more restrictive.
//     },
// }

// type Client struct {
//     conn *websocket.Conn
//     send chan []byte
// }

// type Session struct {
//     clients    map[*Client]bool
//     broadcast  chan []byte
//     register   chan *Client
//     unregister chan *Client
// }

// var sessions = make(map[string]*Session)
// var sessionMutex sync.Mutex

// func newSession() *Session {
//     return &Session{
//         clients:    make(map[*Client]bool),
//         broadcast:  make(chan []byte),
//         register:   make(chan *Client),
//         unregister: make(chan *Client),
//     }
// }

// func (s *Session) run() {
//     for {
//         select {
//         case client := <-s.register:
//             s.clients[client] = true
//         case client := <-s.unregister:
//             if _, ok := s.clients[client]; ok {
//                 delete(s.clients, client)
//                 close(client.send)
//             }
//         case message := <-s.broadcast:
//             for client := range s.clients {
//                 select {
//                 case client.send <- message:
//                 default:
//                     close(client.send)
//                     delete(s.clients, client)
//                 }
//             }
//         }
//     }
// }

// func handleWebSocket(w http.ResponseWriter, r *http.Request) {
//     sessionID := r.URL.Query().Get("session_id")
//     if sessionID == "" {
//         http.Error(w, "Missing session_id", http.StatusBadRequest)
//         return
//     }

//     conn, err := upgrader.Upgrade(w, r, nil)
//     if err != nil {
//         log.Println(err)
//         return
//     }

//     sessionMutex.Lock()
//     session, ok := sessions[sessionID]
//     if !ok {
//         session = newSession()
//         sessions[sessionID] = session
//         go session.run()
//     }
//     sessionMutex.Unlock()

//     client := &Client{conn: conn, send: make(chan []byte, 256)}
//     session.register <- client

//     go client.writePump()
//     client.readPump(session)
// }

// func (c *Client) readPump(session *Session) {
//     defer func() {
//         session.unregister <- c
//         c.conn.Close()
//     }()

//     for {
//         _, message, err := c.conn.ReadMessage()
//         if err != nil {
//             if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
//                 log.Printf("error: %v", err)
//             }
//             break
//         }
//         processedAudio := processAudioData(message)
//         session.broadcast <- processedAudio
//     }
// }

// func (c *Client) writePump() {
//     defer c.conn.Close()

//     for {
//         select {
//         case message, ok := <-c.send:
//             if !ok {
//                 c.conn.WriteMessage(websocket.CloseMessage, []byte{})
//                 return
//             }

//             w, err := c.conn.NextWriter(websocket.BinaryMessage)
//             if err != nil {
//                 return
//             }
//             w.Write(message)

//             if err := w.Close(); err != nil {
//                 return
//             }
//         }
//     }
// }

// func processAudioData(audioData []byte) []byte {
//     // Decompress audio data
//     var decompressedSize C.int
//     decompressedPtr := C.decompressAudio((*C.uint8_t)(unsafe.Pointer(&audioData[0])), C.int(len(audioData)), &decompressedSize)
//     defer C.freeMemory(decompressedPtr)

//     decompressedSlice := (*[1 << 30]float32)(unsafe.Pointer(decompressedPtr))[:decompressedSize:decompressedSize]

//     // Process audio
//     var processedSize C.int
//     processedPtr := C.processAudio((*C.float)(unsafe.Pointer(&decompressedSlice[0])), C.int(decompressedSize), C.float(44100), &processedSize)
//     defer C.freeMemory(processedPtr)

//     processedSlice := (*[1 << 30]float32)(unsafe.Pointer(processedPtr))[:processedSize:processedSize]

//     // Compress processed audio
//     var compressedSize C.int
//     compressedPtr := C.compressAudio((*C.float)(unsafe.Pointer(&processedSlice[0])), C.int(processedSize), &compressedSize)
//     defer C.freeMemory(compressedPtr)

//     compressedSlice := C.GoBytes(compressedPtr, compressedSize)

//     return compressedSlice
// }


// func main() {
//     http.HandleFunc("/ws", handleWebSocket)
//     log.Println("WebSocket server starting on :8080")
//     err := http.ListenAndServe(":8080", nil)
//     if err != nil {
//         log.Fatal("ListenAndServe: ", err)
//     }
// }







