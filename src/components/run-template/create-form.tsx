import { createRunTemplate } from "@/domain/run-templates/run-template-repository";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { H1 } from "../typography";
import { Textarea } from "../ui/textarea";
import { ClientRunTemplateForm } from "./client-form";

export async function CreateRunTemplateForm({ userId, groupId }: { userId: string; groupId: string }) {
  async function handleCreateRunTemplateForm(formData: FormData) {
    "use server";

    console.log(userId);
    console.log(formData);
    const questions = Array.from({ length: Number(formData.get("numberOfQuestions")) }, (_, i) => {
      return {
        question: formData.get(`question${i}`) as string,
        answers: [
          formData.get(`answer-${i}-1`) as string,
          formData.get(`answer-${i}-2`) as string,
          formData.get(`answer-${i}-3`) as string,
        ],
        // in form it is 1 based, but in db it is 0 based
        correct: Number(formData.get(`correct-${i}-answer`)) - 1,
      };
    });

    const runTemplate = {
      description: formData.get("description") as string,
      createdBy: {
        connect: {
          id: userId,
        },
      },
      questions: {
        create: questions,
      },
      group: { connect: { id: groupId } },
    };

    const newTemplate = await createRunTemplate(runTemplate, groupId);
    if (newTemplate) {
      redirect(`/run/${newTemplate.id}`);
    }
  }

  return (
    <div>
      <form action={handleCreateRunTemplateForm} className="mt-4">
        <H1>Create question template</H1>
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" />
        <ClientRunTemplateForm />
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </div>
  );
}
