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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createGroup } from "@/domain/group/group-repository";
import { Textarea } from "../ui/textarea";

export async function CreateGroupDialog({ userId }: { userId: string }) {
  async function handleForm(formData: FormData) {
    "use server";
    await createGroup(
      {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
      },
      userId,
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create group</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create group</DialogTitle>
          <DialogDescription>Create new group to create FUN!</DialogDescription>
        </DialogHeader>
        <form action={handleForm}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name of group
              </Label>
              <Input id="name" name="name" defaultValue="" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Type your description here."
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
