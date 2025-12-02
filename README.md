 # 🧠 AI Arabic Translator (Web App)

This project is a simple **AI-powered translation web app**.  
The user can type any text (in any language or Arabic dialect), click **"Translate"**, and the app will send the text to a backend server.  
The server uses an AI model (via **Groq API**) to:

- Translate foreign languages into **Modern Standard Arabic (MSA)**.
- Normalize **Arabic dialects** (e.g., Egyptian, Moroccan) into clear **MSA**.

The result is displayed directly on the web page in a clean and simple interface.

---

## ✨ Main Features

- Translate text from different languages into **Modern Standard Arabic**.
- Convert Arabic dialects into **standard Arabic** while keeping the original meaning.
- Simple, responsive web interface with:
  - Input textarea for the original text.
  - "Translate" button.
  - Output area for the translated text.
- Separation between **frontend** and **backend** for easier future development.

---

## 🧩 Tech Stack

- **Backend**
  - [Node.js](https://nodejs.org/) – runtime environment for the server.
  - [Express.js](https://expressjs.com/) – to create the HTTP server and define routes (e.g. `/translate`).
  - [Axios](https://axios-http.com/) – to send HTTP POST requests to the Groq API and receive the AI response.
  - [Groq API](https://console.groq.com/) – to access an LLM (LLaMA-based model) for translation and dialect normalization.
  - [dotenv](https://github.com/motdotla/dotenv) – to load environment variables (API keys, port) from a `.env` file.
  - [nodemon](https://nodemon.io/) – for automatic server restarts during development.

- **Frontend**
  - **HTML** – basic structure of the page.
  - **CSS** – styling for a clean, modern UI.
  - **JavaScript** – sending requests to the backend and updating the UI with the translation result.
  - **Axios (CDN)** – used in the browser to call the `/translate` endpoint.

---

## 📁 Basic Project Structure

```text
translator/
  ├─ public/
  │   ├─ index.html
  │   ├─ style.css
  │   └─ script.js
  ├─ server.js
  ├─ package.json
  ├─ .env             (not committed)
  └─ .gitignore
