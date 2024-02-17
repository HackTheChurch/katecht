import { H1, H2 } from "@/components/typography";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAnswerStatsForRunGroupedByUser, getAnswersByRunId } from "@/domain/answer/answer-repository";
import { getUsersByIds } from "@/domain/user/user-repository";
import { cn } from "@/lib/utils";

export default async function RunPage({
  params,
  searchParams,
}: {
  params: { id: string; question: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const runId = searchParams?.runId;

  const answers = await getAnswersByRunId(runId as string);
  const correct = answers.filter((answer) => answer.correct).length;
  const count = answers.length;
  const score = (correct / count) * 100;

  const answersCount = await getAnswerStatsForRunGroupedByUser(params.id);
  const runPlayers = await getUsersByIds(answersCount.map((a) => a.answeredById));

  const data = answersCount.map((answer) => {
    const player = runPlayers.find((player) => player.id === answer.answeredById);
    return {
      ...answer,
      playerName: player ? player.name : "Unknown",
    };
  });

  function getBackgroundColorClass(percentage: number) {
    if (percentage >= 75) {
      return "to-green-800"; // Green for 75% and above
    } else if (percentage >= 50) {
      return "to-orange-800"; // Orange for 50% to 74%
    } else {
      return "to-red-800"; // Red for less than 50%
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <H1 className="col-span-2">Your results</H1>
        <Card className={cn("bg-gradient-to-tl from-slate-900 to-slate-700 text-center text-white")}>
          <CardHeader></CardHeader>
          <CardContent>
            <div>
              <H1>
                {correct} / {count}
              </H1>
            </div>
          </CardContent>
        </Card>
        <Card
          className={cn("bg-gradient-to-tr from-slate-900  text-center text-white", getBackgroundColorClass(score))}
        >
          <CardHeader></CardHeader>
          <CardContent>
            <div>
              <H1>{score}%</H1>
            </div>
          </CardContent>
        </Card>
      </div>

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
    </div>
  );
}
