import React, { ChangeEvent, useState } from "react";

interface IOPInput {
  index: number;
  handleChange: (index: number, value: number) => void;
  value: string | number;
  customClassesGroup?: string;
  customClassesInput?: string;
  customClassesSpan?: string;
  disabled?: boolean;
}
const OPInput: React.FC<IOPInput> = ({
  index,
  value,
  handleChange,
  customClassesGroup,
  customClassesInput,
  customClassesSpan,
  disabled,
}) => {
  const [currentValue, setCurrentValue] = useState(Number(value));
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setCurrentValue(newValue);
    handleChange(index, newValue);
  };
  return (
    <label className={`input-group rounded ${customClassesGroup}`}>
      <input
        type="number"
        onChange={onChange}
        className={`input input-info input-bordered border-slate-200 border w-[100px] rounded ${customClassesInput}`}
        value={currentValue}
        disabled={disabled}
      />
      <span className={`rounded bg-secondary border-r border-b border-t border-slate-200 ${customClassesSpan}`}>
        OP
      </span>
    </label>
  );
};

export default OPInput;
