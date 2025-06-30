# Training Letter Generator

A web app for Garment Textile Pvt. Ltd. to generate system-generated industrial training letters in PDF format, based on form inputs.

## Features

- Simple React frontend for user form
- Node.js/Express backend for PDF generation using [pdf-lib](https://github.com/Hopding/pdf-lib)
- Downloads PDF with all required formatting, fonts, and custom accommodation logic

## Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/YOUR_USERNAME/training-letter-app.git
cd training-letter-app
```

### 2. Setup and Run Backend

```bash
cd backend
npm install
npm start
```

The backend runs on [http://localhost:5000](http://localhost:5000).

### 3. Setup and Run Frontend

```bash
cd ../frontend
npm install
npm start
```

The frontend runs on [http://localhost:3000](http://localhost:3000).

### 4. Usage

- Open [http://localhost:3000](http://localhost:3000) in your browser
- Fill out the form and click **Download PDF**
- The letter will be generated and downloaded instantly

---

## Folder Structure

```
training-letter-app/
│
├── backend/
│   ├── package.json
│   ├── server.js
│   └── generatePdf.js
└── frontend/
    ├── package.json
    └── src/
        ├── App.js
        ├── LetterForm.js
        └── index.js
    └── public/
        └── index.html
```

---

## Customization

- To adjust letter content or formatting, edit `backend/generatePdf.js`
- For more form fields or validation, edit `frontend/src/LetterForm.js`

---

## License

MIT