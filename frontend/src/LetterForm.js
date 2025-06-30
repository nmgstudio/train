import React, { useState } from "react";
import axios from "axios";

const initialState = {
  Name: "",
  Father_Name: "",
  "E-mail": "",
  Contact_Number: "",
  Reporting_Date: "",
  Accommodation: ""
};

export default function LetterForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post("http://localhost:5000/generate-pdf", form, {
      responseType: "blob"
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "training-letter.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <label>
        Name*<br />
        <input name="Name" value={form.Name} onChange={handleChange} required />
      </label><br />
      <label>
        Father Name*<br />
        <input name="Father_Name" value={form.Father_Name} onChange={handleChange} required />
      </label><br />
      <label>
        E-mail*<br />
        <input name="E-mail" value={form["E-mail"]} onChange={handleChange} required type="email" />
      </label><br />
      <label>
        Contact Number*<br />
        <input name="Contact_Number" value={form.Contact_Number} onChange={handleChange} required />
      </label><br />
      <label>
        Reporting Date*<br />
        <input name="Reporting_Date" value={form.Reporting_Date} onChange={handleChange} required type="date" />
      </label><br />
      <label>
        Accommodation<br />
        <select name="Accommodation" value={form.Accommodation} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Basic">Basic</option>
        </select>
      </label><br /><br />
      <button type="submit" disabled={loading}>{loading ? "Generating..." : "Download PDF"}</button>
    </form>
  );
}