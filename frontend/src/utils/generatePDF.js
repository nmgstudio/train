import jsPDF from "jspdf";

export const generatePDF = (formData) => {
  const accommodationText =
    formData.accommodation === "Basic"
      ? "If you do not have a place to stay in Varanasi during the training period, then we can arrange a personal PG room at a Minimal Charge of ₹2,750."
      : "You have not opted for any accommodation. A ₹700 training facility and administrative fee will apply.";

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: [8.5, 11],
  });

  // Page setup
  const margin = 1;
  const pageWidth = 8.5 - margin * 2;

  doc.setFont("Arial", "normal");
  doc.setFontSize(8);

  // Header
  doc.setFont("Arial", "bold");
  doc.text("*Garment Textile Private Limited*", margin, margin);
  doc.setFont("Arial", "normal");
  doc.text("Soyepur Bazar, Pandeypur, Varanasi, Uttar Pradesh", margin, margin + 0.2);
  doc.text("*221007*", margin, margin + 0.4);
  doc.text("+91 79707 74361       garmenttxtpvtltd@hotmail.com", margin, margin + 0.6);
  doc.line(margin, margin + 0.8, pageWidth, margin + 0.8);

  // Date
  const currentDate = new Date().toLocaleString();
  doc.setFont("Arial", "italic");
  doc.text(`_Date: ${currentDate}_`, margin, margin + 1);

  // Content
  doc.setFont("Arial", "bold");
  doc.text("To,", margin, margin + 1.4);
  doc.text(`*${formData.name}*`, margin, margin + 1.6);
  doc.setFont("Arial", "normal");
  doc.text(`S/o ${formData.fatherName}`, margin, margin + 1.8);
  doc.text(`Email: ${formData.email}`, margin, margin + 2);
  doc.text(`Phone: ${formData.contactNumber}`, margin, margin + 2.2);

  doc.setFont("Arial", "italic");
  doc.text("_Subject:_", margin, margin + 2.6);
  doc.setFont("Arial", "bold");
  doc.text(" Confirmation of Industrial Training", margin + 0.5, margin + 2.6);

  doc.setFont("Arial", "bold");
  doc.text(`Dear ${formData.name},`, margin, margin + 3);
  doc.setFont("Arial", "normal");
  doc.text(
    "We are pleased to inform you that you have been selected for the Industrial Training Program at Garment Textile Pvt. Ltd. The details of your training are mentioned below:",
    margin,
    margin + 3.2,
    { maxWidth: pageWidth }
  );

  // Training Details
  doc.setFont("Arial", "italic");
  doc.text("_Training Details_", margin, margin + 4);
  doc.setFont("Arial", "normal");
  doc.text("Training Location: Varanasi", margin, margin + 4.2);
  doc.text("Work Location: Varanasi", margin, margin + 4.4);
  doc.text(`Reporting Date: ${formData.reportingDate}`, margin, margin + 4.6);
  doc.setFont("Arial", "bold");
  doc.text("Training Duration: 9 AM  :  5 PM", margin, margin + 4.8);
  doc.text(accommodationText, margin, margin + 5, { maxWidth: pageWidth });

  // Documents
  doc.setFont("Arial", "bold");
  doc.text("Documents Required at Reporting:", margin, margin + 5.6);
  doc.setFont("Arial", "normal");
  const documents = [
    "Resume or Cover Letter",
    "2 Passport-size Photograph (same as uploaded)",
    "College ID Card  or Marksheet(s)",
    "Aadhar Card / Valid Government ID",
    "Permanent Account Number (PAN) Card",
    "Current Bank's Passbook",
  ];
  documents.forEach((docu, index) => {
    doc.text(`${index + 1}. ${docu}`, margin, margin + 5.8 + index * 0.2);
  });

  // Footer
  doc.setFont("Arial", "bold");
  doc.text("Warm regards,", margin, margin + 7.2);
  doc.text("Manish Gupta", margin, margin + 7.4);
  doc.text("+91 95194 43625", margin, margin + 7.6);
  doc.text("Garment Textile Private Limited", margin, margin + 7.8);
  doc.text("Soyepur Bazar, Pandeypur, Varanasi, Uttar Pradesh", margin, margin + 8);
  doc.text("*221007*", margin, margin + 8.2);
  doc.line(margin, margin + 8.4, pageWidth, margin + 8.4);

  doc.setFont("Arial", "italic");
  doc.text(
    "*Note: This is a system-generated letter and does not require a physical signature.*",
    margin,
    margin + 8.6,
    { maxWidth: pageWidth }
  );

  doc.save("Training-Letter.pdf");
};
