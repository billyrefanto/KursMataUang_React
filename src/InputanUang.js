import React from "react";

export default function InputanUang(props) {
  const { tukarUangOption } = props;
  return (
    <div>
      <input type="number" className="inputan-uang" />
      <select className="select-uang">
        {tukarUangOption.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
