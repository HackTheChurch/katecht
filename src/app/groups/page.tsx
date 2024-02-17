import { CreateGroupDialog } from "@/components/group/create-dialog";
import { GroupCard } from "@/components/group/group-card";
import { H1, H2 } from "@/components/typography";
import { getMyGroupsAsCouch, getMyGroupsAsPlayer } from "@/domain/group/group-repository";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function GroupsPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const groupsAsCouche = await getMyGroupsAsCouch(session.user?.id as string);
  const groupsAsPlayer = await getMyGroupsAsPlayer(session.user?.id as string);

  return (
    <div>
      <H1>Groups</H1>
      <div className="flex justify-end">
        <CreateGroupDialog userId={session.user?.id as string} />
      </div>
      <H2>My owned groups</H2>
      <div className="grid-col-1 mt-4 grid gap-4">
        {groupsAsCouche.map((group) => (
          <GroupCard group={group} key={group.id} />
        ))}
      </div>
      <H2>My groups</H2>
      <div className="grid-col-1 mt-4 grid gap-4">
        {groupsAsPlayer.map((group) => (
          <GroupCard group={group} key={group.id} />
        ))}
      </div>
    </div>
  );
}
