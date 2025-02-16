import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { ScheduleLabel } from "@/api-call/types";

interface AddNewLabelProps {
  add: (label: ScheduleLabel) => void;
}

export default function AddNewLabel({ add }: AddNewLabelProps) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [label, setLabel] = useState<ScheduleLabel>({
    label: "",
    color: "",
  });

  function handleChange(e: any) {
    const { value } = e.target;
    setLabel(value);
  }

  return (
    <>
      <Button
        onClick={() => {
          setShowForm(true);
        }}
      >
        <Plus />
        <span>Add new label</span>
      </Button>
      {showForm && (
        <div className="flex">
          <Input
            name="label"
            value={label.label}
            onChange={handleChange}
            placeholder="Enter the label"
          />
          <input type="color" name="color" onChange={handleChange} />
          <Button
            onClick={() => {
              add(label);
            }}
          >
            Add
          </Button>
        </div>
      )}
    </>
  );
}
