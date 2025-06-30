import { jsPDF } from "./js/jspdf.umd.min.js";

document.getElementById("trainingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const father = document.getElementById("father").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const reporting = document.getElementById("reporting").value;
  const accommodation = document.getElementById("accommodation").value;

  const today = new Date().toLocaleString();

  const accoText = accommodation === "Basic"
    ? "If you do not have a place to stay in Varanasi during the training period, the we can arrange a personal PG room at a Minimal Charge of ₹2,750."
    : "You have not opted for any accommodation. A ₹700 training facility and administrative fee will apply.";

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "letter"
  });

  const margin = 1;
  doc.setFont("Arial");
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);

  let y = margin;

  const addText = (txt, bold = false, italic = false) => {
    doc.setFont("Arial", bold ? "bold" : italic ? "italic" : "normal");
    doc.text(txt, margin, y);
    y += 0.2;
  };

  const hr = () => {
    y += 0.1;
    doc.setLineWidth(0.01);
    doc.line(margin, y, 8.5 - margin, y);
    y += 0.2;
  };

  // Header
  addText("*Garment Textile Private Limited*", true);
  addText("Soyepur Bazar, Pandeypur, Varanasi, Uttar Pradesh");
  addText("*221007*", true);
  addText("+91 79707 74361   garmenttxtpvtltd@hotmail.com");
  hr();

  addText(`_Date: ${today}_`, false, true);
  y += 0.2;
  addText("To,", false);
  addText(`*${name}*`, true);
  addText(`S/o ${father}`);
  addText(`Email: ${email}`);
  addText(`Phone: ${phone}`);
  y += 0.2;

  addText("_Subject:_ *Confirmation of Industrial Training*", true, true);
  y += 0.2;

  addText(`*Dear ${name},*`, true);
  doc.setFont("Arial", "normal");
  doc.text("We are pleased to inform you that you have been selected for the Industrial Training Program at Garment Textile Pvt. Ltd. The details of your training are mentioned below:", margin, y);
  y += 0.3;

  addText("_*Training Details*_", true, true);
  addText("Training Location: Varanasi");
  addText("Work Location: Varanasi");
  addText(`Reporting Date: ${reporting}`);
  addText("Training Duration: *9 AM  :  5 PM*", true);

  y += 0.2;
  addText(`*${accoText}*`, true);

  y += 0.3;
  addText("*Documents Required at Reporting*", true);
  const docs = [
    "1. Resume or Cover Letter",
    "2. 2 Passport-size Photograph (same as uploaded)",
    "3. College ID Card  or Marksheet(s)",
    "4. Aadhar Card / Valid Government ID",
    "5. Permanent Account Number (PAN) Card",
    "6. Current Bank's Passbook"
  ];
  docs.forEach(d => addText(d));
  y += 0.3;

  doc.setFont("Arial", "normal");
  doc.text("We believe this training will be beneficial for your technical growth and professional development. Please reach out to us at the above contact for any clarifications.", margin, y);
  y += 0.3;
  doc.text("We look forward to your presence and contribution.", margin, y);
  y += 0.3;

  addText("Warm regards,", false);
  addText("*Manish Gupta*", true);
  addText("*+91 95194 43625*", true);
  addText("*Garment Textile Private Limited*", true);
  addText("Soyepur Bazar, Pandeypur, Varanasi, Uttar Pradesh");
  addText("*221007*", true);
  hr();
  addText("*Note: This is a system-generated letter and does not require a physical signature.*", true);

  doc.save(`Training_Letter_${name}.pdf`);
});
