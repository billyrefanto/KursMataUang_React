import React from "react";

export default function InputanUang(props) {
  const {
    tukarUangOption,
    uangTerpilih,
    jumlahUang,
    onChangeSelectUang,
    onChangeValueUang
  } = props;
  return (
    <div>
      <input
        type="number"
        className="inputan-uang"
        value={jumlahUang}
        onChange={onChangeValueUang}
      />
      <select
        className="select-uang"
        value={uangTerpilih}
        onChange={onChangeSelectUang}
      >
        {tukarUangOption.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
