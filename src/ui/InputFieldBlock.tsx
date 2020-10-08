import * as React from "react";

export interface FieldInputBlockProps {
  value: string;
  onValueChange: (value: string) => void;
  error: boolean;
}

const ERROR_MESSAGE = `
    Check your input value.
    Example:
    4 8
    ........
    ....*...
    ...**...
    ........
  `;

const InputFieldBlock: React.FC<FieldInputBlockProps> = ({
  value,
  onValueChange,
  error,
}) => {
  return (
    <div className="field-input-block">
      <textarea
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onValueChange(e.target.value)
        }
        placeholder="Type your field"
      />
      <div className="error-container">
        {error &&
          ERROR_MESSAGE.split("\n").map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
      </div>
    </div>
  );
};

export default InputFieldBlock;
