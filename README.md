# BiztelAI Workflow System

AI-Powered Manufacturing Document Processing & Review Workflow System

---

# Project Overview

BiztelAI Workflow System is an AI-powered operational document processing platform designed for manufacturing environments.

The system allows users to:

- Upload manufacturing log sheets
- Extract structured operational data using Gemini Vision AI
- Validate extracted records using business rules
- Highlight uncertain fields with confidence scoring
- Manually review and correct records
- Save reviewed operational data
- Analyze operational insights through dashboards
- Search historical uploads and processed records

---

# Features

## 1. Document Upload
- Upload Images & PDFs
- File Preview
- Upload History
- Open Previously Processed Documents

---

## 2. AI-Powered Extraction
- Gemini 2.5 Flash Vision API
- Structured JSON extraction
- Manufacturing operational data parsing

Extracted Fields:
- Serial Number
- Date
- Shift
- Employee Number
- Operation Code
- Machine Number
- Work Order Number
- Quantity Produced
- Time Taken

---

## 3. Review Workflow
- Editable operational records
- Manual correction support
- Save reviewed records
- Enterprise-style review table

---

## 4. Confidence Scoring
- High / Medium / Low confidence levels
- Uncertain field highlighting
- Manual review indicators

---

## 5. Validation & Exception Handling

Implemented Business Rules:
- Missing mandatory fields
- Invalid shift values
- Invalid machine code formats
- Empty quantity fields
- Suspicious numeric values
- Duplicate work order numbers
- Invalid time values

---

## 6. Dashboard & Analytics
- Total uploads
- Validation failures
- Auto-approved records
- Shift-wise summaries
- Quantity summaries
- Machine-wise summaries

---

## 7. Search & History
- Search records
- Filter by status
- Filter by shift
- View historical uploads
- Open uploaded documents

---

# Tech Stack

## Frontend
- React.js
- Vite
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## AI Integration
- Gemini 2.5 Flash Vision API

---

# Project Structure

```bash
Client/
 ├── src/
 │    ├── components/
 │    ├── pages/
 │    ├── services/
 │    ├── styles/
 │    └── App.jsx

Server/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── services/
 ├── uploads/
 └── server.js
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone <your-repository-url>
```

---

# Backend Setup

## 2. Navigate to Server

```bash
cd Server
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Create `.env`

Create a `.env` file inside `Server/`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key
```

---

## 5. Start Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## 6. Navigate to Client

```bash
cd Client
```

---

## 7. Install Dependencies

```bash
npm install
```

---

## 8. Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Routes

## Upload Document

```http
POST /api/upload
```

---

## Get Records

```http
GET /api/records
```

---

## Update Record

```http
PUT /api/records/:id
```

---

## Dashboard Analytics

```http
GET /api/dashboard
```

---

# AI Workflow

1. User uploads manufacturing document
2. Gemini Vision extracts operational data
3. Backend validates extracted records
4. Confidence scoring is assigned
5. Uncertain fields are highlighted
6. User reviews & edits records
7. Reviewed records are saved
8. Dashboard analytics are updated

---

# Future Improvements

- Authentication & Role Management
- CSV/Excel Export
- Advanced Analytics Charts
- OCR + LLM Hybrid Pipeline
- Real-time Notifications
- Multi-user Review Workflow

---

# Author

Sibtain Ali Raza

AI & Full Stack Developer