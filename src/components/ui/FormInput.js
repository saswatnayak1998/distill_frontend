import React from "react";

const FormInput = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-6">
      <input
        className="bg-gray-700 text-white rounded-lg w-full p-2"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      <label className="text-gray-400">{label}</label>
    </div>
  );
};

export default FormInput;