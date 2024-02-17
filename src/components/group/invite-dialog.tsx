import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addPersonToGroup, getAllUsersNotInGroup } from "@/domain/user/user-repository";
import { revalidatePath } from "next/cache";

export async function InviteDialog({ groupId }: { groupId: string }) {
  const allAvailableUsers = await getAllUsersNotInGroup(groupId);

  async function handleForm(formData: FormData) {
    "use server";
    const userId = formData.get("userId") as string;
    await addPersonToGroup(userId, groupId);
    revalidatePath(`/groups/${groupId}`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Invite people</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create group</DialogTitle>
          <DialogDescription>Add more people to this FUN!</DialogDescription>
        </DialogHeader>
        <form action={handleForm}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Select name="userId">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select an user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Users</SelectLabel>
                    {allAvailableUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Invite</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
