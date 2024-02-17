"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createGroup(group: Prisma.GroupCreateInput, userId: string) {
  const newGroup = await prisma.group.create({
    data: {
      name: group.name,
      description: group.description,
      coaches: { connect: { id: userId } },
    },
  });

  revalidatePath("/groups");
  return newGroup;
}

export async function getMyGroupsAsPlayer(userId: string) {
  return await prisma.group.findMany({
    where: {
      players: { some: { id: userId } },
    },
  });
}

export async function getMyGroupsAsCouch(userId: string) {
  return await prisma.group.findMany({
    where: {
      coaches: { some: { id: userId } },
    },
  });
}

export async function getGroupById(id: string) {
  return await prisma.group.findUnique({
    where: { id },
    include: {
      players: true,
      coaches: true,
      questionRuns: { include: { questions: true, answers: true } },
    },
  });
}
