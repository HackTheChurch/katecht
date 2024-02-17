import { CreateRunTemplateForm } from "@/components/run-template/create-form";
import { auth } from "../../../../auth";

export default async function RunPage({
  params,
  searchParams,
}: {
  params: { id: string; question: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const groupId = searchParams?.groupId;
  const session = await auth();

  return (
    <>
      <CreateRunTemplateForm userId={session?.user?.id!} groupId={groupId as string} />
    </>
  );
}
