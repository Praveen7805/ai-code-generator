# ⚡ AI Code Generator

Generate production-ready code with AI. Describe what you want in plain English, and AI generates clean code + unit tests instantly.

![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-Active-green)

---

## 🎯 Features

✨ **AI-Powered Code Generation**
- Describe your requirements in natural language
- AI generates production-ready code in Python or JavaScript
- Follows best practices and handles edge cases

🧪 **Automatic Test Generation**
- AI generates comprehensive unit tests
- Copy tests directly to your project

💻 **Multiple Languages**
- Python support
- JavaScript support
- Easy to extend to more languages

🎨 **Beautiful UI**
- Dark mode with gradient design
- Syntax highlighting with Prism.js
- One-click copy to clipboard
- Responsive design

⚡ **Fast & Efficient**
- Local AI inference with Ollama
- No API costs
- Zero privacy concerns

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Prism.js (syntax highlighting)
- Axios (HTTP client)
- Lucide React (icons)

**Backend:**
- Node.js + Express
- Ollama (local AI inference)
- Mistral 7B model

**Architecture:**
- REST API
- Real-time response streaming
- Client-side code formatting

---

## 📋 Prerequisites

Before you start, make sure you have:

1. **Node.js** (v16+) - [Download](https://nodejs.org/)
2. **Ollama** - [Download](https://ollama.ai/)
3. **Mistral Model** - Run `ollama run mistral`

---

## 🚀 Installation

### 1. Clone Repository
```bash
git clone https://github.com/Praveen7805/ai-code-generator.git
cd ai-code-generator
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
OLLAMA_API=http://localhost:11434/api/generate
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

---

## 💻 Usage

### Start Ollama (Terminal 1)
```bash
ollama serve
```

You should see:
```
listening on 127.0.0.1:11434
```

### Start Backend (Terminal 2)
```bash
cd backend
npm run dev
```

You should see:
```
🚀 AI Code Generator running on http://localhost:5000
```

### Start Frontend (Terminal 3)
```bash
cd frontend
npm start
```

Opens at `http://localhost:3000`

---

## 📖 How to Use

1. **Choose Language** - Select Python or JavaScript
2. **Describe Your Code** - Explain what you want
   - Example: "Create a function that checks if a number is prime"
3. **Click Generate** - Wait 2-3 minutes for AI to generate
4. **Copy Code** - Click copy button to grab the generated code
5. **Copy Tests** - Use the generated test cases
6. **Paste & Use** - Integrate into your project

---

## 📊 Project Structure

```
ai-code-generator/
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── index.css         # Tailwind CSS
│   │   └── index.js          # React entry point
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── server.js             # Express server
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── temp/                 # Temp directory for generated files
│
└── README.md
```

---

## 🎨 Example Usage

### Input
```
Language: Python
Description: Write a function that calculates factorial
```

### Generated Code
```python
def factorial(n):
    if n < 0:
        return "Please input a non-negative integer"
    elif n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)
```

### Generated Tests
```python
def test_factorial_positive():
    assert factorial(5) == 120
    
def test_factorial_zero():
    assert factorial(0) == 1
    
def test_factorial_negative():
    assert factorial(-5) == "Please input a non-negative integer"
```

---

## 🔧 API Reference

### Generate Code & Tests

**Endpoint:** `POST /api/generate`

**Request:**
```json
{
  "description": "Create a function that reverses a string",
  "language": "Python"
}
```

**Response:**
```json
{
  "success": true,
  "code": "def reverse_string(s):\n    return s[::-1]",
  "tests": "def test_reverse():\n    assert reverse_string('hello') == 'olleh'",
  "language": "Python",
  "timestamp": "2026-06-28T17:30:00Z"
}
```

---

## ⚙️ Configuration

### Ollama Settings
Edit `backend/server.js` to change:
- **Model:** Change `OLLAMA_MODEL` to use different models (llama2, orca, etc.)
- **API endpoint:** Update `OLLAMA_API` if Ollama runs on different port

### Frontend Settings
Edit `frontend/src/App.jsx` to:
- Change `API_BASE` for different backend URL
- Modify UI theme colors
- Add more language options

---

## 🐛 Troubleshooting

### "Cannot connect to Ollama"
- Make sure Ollama is running: `ollama serve`
- Check if Ollama is listening on `localhost:11434`

### "Mistral model not found"
- Download Mistral: `ollama run mistral`
- Takes ~5GB disk space

### "Generation taking too long"
- Mistral takes 2-3 minutes
- This is normal - depends on your CPU
- Faster CPU = faster generation

### "Port 5000 already in use"
```bash
# Change PORT in .env or kill process using port 5000
```

---

## 🚀 Deployment

### Deploy Frontend to Vercel
```bash
cd frontend
npm run build
vercel --prod
```

### Deploy Backend to Render
1. Push backend code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Set environment variables
5. Deploy

**Note:** Render's free tier has limitations. Consider paid tier for Ollama inference.

---

## 📈 Performance

**Generation Time:**
- Code generation: ~2-3 minutes
- Test generation: ~1-2 minutes
- **Total:** ~4-5 minutes

*Note: Generation time depends on your CPU. Faster processors = faster generation.*

**System Requirements:**
- CPU: 4+ cores recommended
- RAM: 8GB minimum (16GB recommended)
- Disk: 10GB for Ollama + models

---

## 🎓 Learning Value

This project demonstrates:
- ✅ Full-stack application architecture
- ✅ API integration with local AI models
- ✅ Prompt engineering techniques
- ✅ React state management
- ✅ Real-time code processing
- ✅ Error handling in async operations
- ✅ DevOps (process management, environment config)

---

## 📝 License

MIT License - feel free to use this project for learning and commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## 📧 Contact

- **GitHub:** [@Praveen7805](https://github.com/Praveen7805)
- **LinkedIn:** [Praveen Marimuthu](https://linkedin.com/in/praveen-marimuthuu-99b7551b8)
- **Email:** praveenmarimuthu2005@gmail.com

---

## 🙏 Acknowledgments

- **Ollama** - Local AI inference
- **Mistral AI** - 7B language model
- **React** - UI framework
- **Express.js** - Backend framework

---

## ⭐ Star This Project

If you found this useful, please consider starring the repository! It helps other developers discover this project.

---

**Made by Praveen Marimuthu**
