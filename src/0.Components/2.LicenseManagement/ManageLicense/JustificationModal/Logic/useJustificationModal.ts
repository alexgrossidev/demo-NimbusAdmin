import { useState, useCallback } from "react";
import { JUSTIFICATION_OPTIONS } from "../Interfaces/DefaultJustifications";

const MIN_LENGTH = 10;
const MAX_LENGTH = 500;

export const useJustificationModal = () => {
  const [justification, setJustification] = useState("");
  const [option, setOption] = useState("");
  const charCount = justification.length;
  const isOverLimit = charCount > MAX_LENGTH;
  const isTooShort = charCount > 0 && charCount < MIN_LENGTH;
  const isValid = charCount >= MIN_LENGTH && !isOverLimit;

  const handleChange = useCallback((value: string) => {
    setJustification(value);
  }, []);

  const handleReset = useCallback(() => {
    setJustification("");
  }, []);

  const handleDefaultJustification = (defaultValue: string) => {
    //find the default value in the justification options and set it as justification
    const label = JUSTIFICATION_OPTIONS.find(
      (option) => option.value === defaultValue,
    );
    if (label?.label) {
      setOption(label.value);
      setJustification(label.label);
    }
  };

  return {
    justification,
    isValid,
    charCount,
    isOverLimit,
    isTooShort,
    option,
    handleChange,
    handleReset,
    handleDefaultJustification,
  };
};

export { MIN_LENGTH, MAX_LENGTH };
