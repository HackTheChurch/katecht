import { H1, H3 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { addAnswerToQuestion } from "@/domain/answer/answer-repository";
import { getRunTemplateById } from "@/domain/run-templates/run-template-repository";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../auth";

export default async function RunPage({
  params,
  searchParams,
}: {
  params: { id: string; question: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const runId = searchParams?.runId;
  const count = searchParams?.count;
  const actual = Number(searchParams?.actual);
  const run = await getRunTemplateById(params.id);
  const session = await auth();
  if (!session) {
  }
  if (!run) {
    return notFound();
  }

  async function handleAnswer(formData: FormData) {
    "use server";
    const response = await addAnswerToQuestion(
      run?.questions[actual].id!,
      Number(formData.get("answer")),
      session?.user?.id!,
      params.id,
      runId! as string,
    );

    console.log(response);
    if (actual + 1 === Number(count)) {
      redirect(`/run/${params.id}/result?runId=${runId}`);
    } else {
      redirect(
        `/run/${params.id}/${run?.questions[0].id}?runId=${runId}&count=${run?.questions.length}&actual=${actual + 1}`,
      );
    }
  }

  return (
    <div>
      <H1>
        Question {Number(actual) + 1} / {count}
      </H1>
      <Separator className="my-4" />

      <H3>{run.questions[actual].question}</H3>
      <form action={handleAnswer}>
        <RadioGroup name="answer" className="mt-4 ">
          {run.questions[actual].answers.map((answer, index) => (
            <div className="flex items-center space-x-2">
              <RadioGroupItem id={index.toString()} value={index.toString()} />
              <Label htmlFor={index.toString()}>{answer}</Label>
            </div>
          ))}
        </RadioGroup>
        <Button type="submit">NEXT</Button>
      </form>
    </div>
  );
}
