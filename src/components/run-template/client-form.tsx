"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { QuestionInputs } from "./question-inputs";

export function ClientRunTemplateForm() {
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  return (
    <div className="my-8">
      <div>
        <Label htmlFor="numberOfQuestions">Number of Questions</Label>
        <Input
          className="w-1/4"
          type="number"
          name="numberOfQuestions"
          min={1}
          max={100}
          defaultValue={numberOfQuestions}
          onChange={(e) => {
            setNumberOfQuestions(Number(e.target.value));
          }}
        />
      </div>
      <div className="my-8 grid grid-cols-3 gap-4">
        {Array.from({ length: numberOfQuestions }, (_, i) => (
          <QuestionInputs key={i} id={i.toString()} />
        ))}
      </div>
    </div>
  );
}
