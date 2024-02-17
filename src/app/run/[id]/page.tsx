import { H1, H2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAnswerStatsForRunGroupedByUser } from "@/domain/answer/answer-repository";
import { getRunTemplateById } from "@/domain/run-templates/run-template-repository";
import { getUsersByIds } from "@/domain/user/user-repository";
import { randomUUID } from "crypto";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RunPage({ params }: { params: { id: string } }) {
  const run = await getRunTemplateById(params.id);
  if (!run) {
    return notFound();
  }
  const answersCount = await getAnswerStatsForRunGroupedByUser(params.id);
  const runPlayers = await getUsersByIds(answersCount.map((a) => a.answeredById));

  const data = answersCount.map((answer) => {
    const player = runPlayers.find((player) => player.id === answer.answeredById);
    return {
      ...answer,
      playerName: player ? player.name : "Unknown",
    };
  });

  return (
    <div>
      <H1>Run {params.id}</H1>
      <H2>Description: {run.description}</H2>
      <H2>Questions: {run.questions.length}</H2>
      <H2>Board</H2>
      <Table>
        <TableCaption>Board of best players</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Total answers</TableHead>
            <TableHead>Correct</TableHead>
            <TableHead>Incorect</TableHead>
            <TableHead className="text-right">Percentage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{row.playerName}</TableCell>
              <TableCell>{row.correctAnswers + row.incorrectAnswers}</TableCell>
              <TableCell>{row.correctAnswers}</TableCell>
              <TableCell>{row.incorrectAnswers}</TableCell>
              <TableCell className="text-right">{row.percentage.toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="grid-col-1 grid">{}</div>
      <div className="grid-col-1 mt-8 grid"></div>
      <Link
        href={`/run/${params.id}/${run?.questions[0].id}?runId=${randomUUID()}&count=${run?.questions.length}&actual=0`}
      >
        <Button className="w-full">START NEW RUN!</Button>
      </Link>
    </div>
  );
}
