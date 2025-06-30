import React, { useState } from "react";
import { generatePDF } from "../utils/generatePDF";

export default function TrainingLetterForm() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    contactNumber: "",
    reportingDate: "",
    accommodation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF(formData);
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Training Letter Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Father's Name:
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Contact Number:
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Reporting Date:
          <input
            type="date"
            name="reportingDate"
            value={formData.reportingDate}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Accommodation:
          <select
            name="accommodation"
            value={formData.accommodation}
            onChange={handleChange}
          >
            <option value="">None</option>
            <option value="Basic">Basic</option>
          </select>
        </label>
        <br />
        <button type="submit">Generate PDF</button>
      </form>
    </div>
  );
}
