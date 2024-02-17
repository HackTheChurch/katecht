import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Group } from "@prisma/client";
import Link from "next/link";

export function GroupCard({ group }: { group: Group }) {
  return (
    <Card className="w-[350px] duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
        <CardDescription>{group.description}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`groups/${group.id}`}>
          <Button>Open</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
