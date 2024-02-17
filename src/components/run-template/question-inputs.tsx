"use client";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export function QuestionInputs({ id }: { id: string }) {
  return (
    <>
      <Input type="text" name={`question${id}`} placeholder={`Question ${Number(id) + 1}`} className="col-span-3" />
      <Input type="text" name={`answer-${id}-1`} placeholder="Answer 1" />
      <Input type="text" name={`answer-${id}-2`} placeholder="Answer 2" />
      <Input type="text" name={`answer-${id}-3`} placeholder="Answer 3" />
      <Input
        className="col-span-2"
        max={3}
        min={1}
        type="number"
        name={`correct-${id}-answer`}
        placeholder="Correct Answer"
      />
      <Separator className="col-span-3 mb-4" />
    </>
  );
}
