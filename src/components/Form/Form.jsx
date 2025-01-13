import { useState, useEffect } from "react";
import "./Form.css";

const Form = ({ onAddPerson, onCancel, editPerson }) => {
  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    city: "",
  });

  useEffect(() => {
    if (editPerson) {
      setFormData({
        name: editPerson.name || "",
        tel: editPerson.tel || "",
        city: editPerson.city || "",
      });
    } else {
      setFormData({ name: "", tel: "", city: "" });
    }
  }, [editPerson]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.tel) {
      onAddPerson(formData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Imię", name: "name", type: "text", placeholder: "Imię" },
          { label: "Telefon", name: "tel", type: "tel", placeholder: "Telefon" },
          { label: "Miasto", name: "city", type: "text", placeholder: "Miasto" },
        ].map((field) => (
          <div key={field.name}>
            <input
              aria-label={field.label}
              value={formData[field.name]}
              onChange={handleChange}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
            />
          </div>
        ))}
        <button type="submit" disabled={!formData.name || !formData.tel}>
          Zapisz
        </button>
        <button type="button" onClick={onCancel}>
          Anuluj
        </button>
      </form>
    </div>
  );
};

export default Form;
