import { createRunTemplate } from "@/domain/run-templates/run-template-repository";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { addAIResponse, getLastAIResponse } from "@/domain/ai/ai-repository";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import OpenAI from "openai";
import { H1 } from "../typography";
import { Textarea } from "../ui/textarea";
import { ClientRunTemplateForm } from "./client-form";

export async function CreateRunTemplateForm({ userId, groupId }: { userId: string; groupId: string }) {
  let generatedText = "";
  const generatedQuestions = await getLastAIResponse();
  async function generateQuestionsByAI(formData: FormData) {
    "use server";
    // AI will generate questions

    const description = formData.get("description") as string;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Jsi pomocné AI pro vytváření křesťanských otázek, které mají vzdělávat mladé.",
        },
        {
          role: "user",
          content: `Vygeneruj ${formData.get("numberOfQuestions")} otazek a ke kazde 3 odpovedi k danemu textu a jednu spravnou odpoved oznac pod property 'correct'. Text: "${description}"`,
        },
      ],
      model: "gpt-3.5-turbo-0125",
      // response_format: { type: "json_object" },
    });
    await addAIResponse(JSON.stringify(completion.choices[0].message.content));

    revalidatePath("/run/new");
  }

  async function handleCreateRunTemplateForm(formData: FormData) {
    "use server";

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

  const oneMinuteAgo = Date.now() - 60 * 1000;

  return (
    <div>
      <form action={handleCreateRunTemplateForm} className="mt-4">
        <H1>Create question template</H1>
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" />
        {generatedQuestions && new Date(generatedQuestions.createdDate).getTime() > oneMinuteAgo && (
          <code>{generatedQuestions.json}</code>
        )}
        <div className="flex justify-end">
          <Button formAction={generateQuestionsByAI} type="submit" className="my-4">
            Generate AI questions
          </Button>
          <code>{generatedText}</code>
        </div>
        <ClientRunTemplateForm />
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
      <form></form>
    </div>
  );
}
