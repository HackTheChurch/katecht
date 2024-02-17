import { InviteDialog } from "@/components/group/invite-dialog";
import { H1, H2, H3 } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCountOfUsersInRun } from "@/domain/answer/answer-repository";
import { getGroupById } from "@/domain/group/group-repository";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function GroupPage({ params }: { params: { id: string } }) {
  const group = await getGroupById(params.id);

  if (!group) {
    return notFound();
  }

  return (
    <div className="my-4">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <H1>{group.name}</H1>
          <H3>{group.description}</H3>
        </div>
        <div className="flex flex-row gap-4">
          <Link href={`/run/new?groupId=${group.id}`}>
            <Button>Create template</Button>
          </Link>
          <InviteDialog groupId={params.id} />
        </div>
      </CardHeader>

      <CardContent>
        <H2>Katecheti</H2>
        {group.coaches.map((coach) => (
          <Avatar>
            <AvatarImage src={coach.image || ""} alt={coach.name || ""} />
            <AvatarFallback>{getInitials(coach.name || "")}</AvatarFallback>
          </Avatar>
        ))}
        <H2>Hraci</H2>
        {group.players.map((coach) => (
          <Avatar>
            <AvatarImage src={coach.image || ""} alt={coach.name || ""} />
            <AvatarFallback>{getInitials(coach.name || "")}</AvatarFallback>
          </Avatar>
        ))}

        <H2>Run templates</H2>
        <div className="flex flex-col gap-4">
          {group.questionRuns.map(async (runTemplate) => {
            const uniqueUsers = await getCountOfUsersInRun(runTemplate.id);
            return (
              <Card
                key={runTemplate.id}
                className="flex flex-row items-center justify-between gap-4 duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle>{runTemplate.description}</CardTitle>
                  <CardDescription>
                    {runTemplate.questions.length} questions / {uniqueUsers.length} players played{" "}
                  </CardDescription>
                </CardHeader>
                <Link href={`/run/${runTemplate.id}`} className="mx-10">
                  <Button>Details & Play</Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </div>
  );
}
