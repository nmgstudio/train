import express from "express";
import cors from "cors";
import { generatePdfBuffer } from "./generatePdf.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-pdf", async (req, res) => {
  try {
    const pdfBuffer = await generatePdfBuffer(req.body);
    res.setHeader("Content-Disposition", "attachment; filename=training-letter.pdf");
    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).send("Failed to generate PDF");
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});