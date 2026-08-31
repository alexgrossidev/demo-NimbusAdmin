import { useState } from "react";
import type { UpdateItem } from "../Interfaces/update.schema";

export function useUpdateManager(initialItems: UpdateItem[] = []) {
  // 1. Core List State
  const [items, setItems] = useState<UpdateItem[]>(initialItems);

  // 2. Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<UpdateItem["type"]>("feature");

  // 3. Derived State / Validation for UI
  const isFormValid = title.trim().length > 0 && description.trim().length > 0;

  // 4. Form Actions
  const handleTitleChange = (value: string) => setTitle(value);
  const handleDescriptionChange = (value: string) => setDescription(value);
  const handleTypeChange = (value: UpdateItem["type"]) => setType(value);

  // 5. Form Submission
  const addItem = () => {
    if (!isFormValid) return;

    const newItem: UpdateItem = {
      title: title.trim(),
      description: description.trim(),
      type,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    resetForm();
  };

  // 6. Form Reset Helper
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("feature");
  };

  // 7. Delete Action
  const removeItem = (indexToRemove: number) => {
    setItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove),
    );
  };

  // Return exactly what the UI component needs to read or trigger
  return {
    // States
    items,
    title,
    description,
    type,
    isFormValid,

    // Actions
    handleTitleChange,
    handleDescriptionChange,
    handleTypeChange,
    addItem,
    removeItem,
  };
}
