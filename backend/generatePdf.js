import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generatePdfBuffer(formData) {
  const {
    Name,
    Father_Name,
    "E-mail": Email,
    Contact_Number,
    Reporting_Date,
    Accommodation,
  } = formData;

  const now = new Date();
  const dateStr =
    now.toLocaleDateString("en-GB") +
    " " +
    now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  let accommodationText = "";
  if (Accommodation === "Basic") {
    accommodationText =
      "If you do not have a place to stay in Varanasi during the training period, the we can arrange a personal PG room at a Minimal Charge of ₹2,750.";
  } else {
    accommodationText =
      "You have not opted for any accommodation. A ₹700 training facility and administrative fee will apply.";
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Letter size (8.5 x 11 inch)
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  let y = height - 72; // 1 inch margin from top

  function drawText(txt, opts = {}) {
    const {
      bold = false,
      italics = false,
      size = 8,
      color = rgb(0, 0, 0),
      indent = 0,
      lineGap = 13,
    } = opts;
    const usedFont = bold ? fontBold : italics ? fontItalic : font;
    page.drawText(txt, {
      x: 72 + indent,
      y,
      size,
      font: usedFont,
      color,
    });
    y -= lineGap;
  }

  function drawLine() {
    y -= 7;
    page.drawLine({
      start: { x: 72, y },
      end: { x: width - 72, y },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    y -= 8;
  }

  // Header
  drawText("Garment Textile Private Limited", { bold: true, size: 12 });
  drawText("Soyepur Bazar, Pandeypur, Varanasi, Uttar Pradesh", { size: 8 });
  drawText("221007", { bold: true, size: 8 });
  drawText("+91 79707 74361", { size: 8, indent: 0 });
  drawText("garmenttxtpvtltd@hotmail.com", { size: 8, indent: 200 });
  drawLine();

  drawText(`Date: ${dateStr}`, { italics: true, size: 8 });
  y -= 10;

  drawText("To,", { size: 8 });
  drawText(Name, { bold: true, size: 8, indent: 10 });
  drawText(`S/o ${Father_Name}`, { size: 8, indent: 10 });
  drawText(`Email: ${Email}`, { size: 8, indent: 10 });
  drawText(`Phone: ${Contact_Number}`, { size: 8, indent: 10 });
  y -= 5;

  drawText("Subject: Confirmation of Industrial Training", {
    bold: true,
    italics: true,
    size: 8,
  });
  y -= 7;

  drawText(`Dear ${Name},`, { bold: true, size: 8 });
  drawText(
    "We are pleased to inform you that you have been selected for the Industrial Training Program at Garment Textile Pvt. Ltd. The details of your training are mentioned below:",
    { size: 8 }
  );
  y -= 5;

  drawText("Training Details", { bold: true, italics: true, size: 8 });
  drawText("Training Location: Varanasi", { size: 8, indent: 10 });
  drawText("Work Location: Varanasi", { size: 8, indent: 10 });
  drawText(`Reporting Date: ${Reporting_Date}`, { size: 8, indent: 10 });
  drawText("Training Duration: 9 AM  :  5 PM", {
    bold: true,
    size: 8,
    indent: 10,
  });
  y -= 5;

  drawText(accommodationText, { bold: true, size: 8 });

  y -= 7;
  drawText("Documents Required at Reporting", { bold: true, size: 8 });
  drawText(
    "Please bring the following documents (originals + one self-attested copy):",
    { size: 8 }
  );

  [
    "Resume or Cover Letter",
    "2 Passport-size Photograph (same as uploaded)",
    "College ID Card  or Marksheet(s)",
    "Aadhar Card / Valid Government ID",
    "Permanent Account Number (PAN) Card",
    "Current Bank's Passbook",
  ].forEach((item, i) => {
    drawText(`${i + 1}. ${item}`, { size: 8, indent: 10 });
  });
  y -= 5;

  drawText(
    "We believe this training will be beneficial for your technical growth and professional development. Please reach out to us at the above contact for any clarifications.",
    { size: 8 }
  );
  drawText("We look forward to your presence and contribution.", { size: 8 });
  y -= 10;

  drawText("Warm regards,", { size: 8 });
  drawText("Manish Gupta", { bold: true, size: 8 });
  drawText("+91 95194 43625", { bold: true, size: 8 });
  drawText("Garment Textile Private Limited", { bold: true, size: 8 });
  drawText("Soyepur Bazar, Pandeypur, Varanasi, Uttar Pradesh", { size: 8 });
  drawText("221007", { bold: true, size: 8 });
  drawLine();

  drawText(
    "Note: This is a system-generated letter and does not require a physical signature.",
    { bold: true, size: 8 }
  );

  return await pdfDoc.save();
}