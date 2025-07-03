# CollabDraw ✏️ – Real-time Collaborative Drawing App

A lightweight Excalidraw-like web application that enables **real-time collaborative drawing** using WebSockets. Built from scratch — **no external canvas or drawing libraries used**. All shapes, strokes, and interactions are rendered and managed through a custom-built canvas engine.

---

## 🚀 Features

- 🎨 **Custom Drawing Canvas**  
  Built from scratch using the HTML5 `<canvas>` API — no external libraries like Fabric.js or Konva.js.

- 🔄 **Real-time Collaboration**  
  Integrated **WebSocket-based communication** so users can draw together live.

- 👥 **Multi-user Support**  
  Users can join the same room and see real-time updates of each other's drawing strokes.

- ✏️ **Tools & Shapes**  
  Basic drawing tools: pencil, lines, rectangles, circles, eraser, and color selection.

- 🧠 **State Management**  
  Efficient drawing state handling to ensure performance and synchronization during multi-user sessions.

---

## 🛠 Tech Stack

- Frontend: Nextjs, ShadCn, Tailwind CSS
- WebSocket Server: Node.js with `ws`
- Canvas Rendering: Pure HTML5 Canvas API
- Deployment: Vercel / Render (still pending)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/collabdraw.git
cd collabdraw
npm install
npm start
