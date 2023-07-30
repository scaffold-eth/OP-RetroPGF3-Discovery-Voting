import React, { ChangeEvent, useState } from "react";

interface IOPInput {
  index: number;
  handleChange: (index: number, value: number) => void;
  value: string | number;
}
const OPInput: React.FC<IOPInput> = ({ index, value, handleChange }) => {
  const [currentValue, setCurrentValue] = useState(Number(value));
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setCurrentValue(newValue);
    handleChange(index, newValue);
  };
  return (
    <label className="input-group rounded">
      <input
        type="number"
        onChange={onChange}
        className="input input-bordered border-slate-200 input-info rounded"
        value={currentValue}
      />
      <span className="rounded bg-secondary border-r border-b border-t border-slate-200">OP</span>
    </label>
  );
};

export default OPInput;
