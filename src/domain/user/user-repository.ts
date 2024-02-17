import prisma from "@/lib/db";

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function addPersonToGroup(userId: string, groupId: string) {
  return await prisma.group.update({
    where: {
      id: groupId,
    },
    data: {
      players: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export async function getAllUsersNotInGroup(groupId: string) {
  return await prisma.user.findMany({
    where: {
      isPlayerInTeams: {
        none: {
          id: groupId,
        },
      },
      isCoachInTeams: {
        none: {
          id: groupId,
        },
      },
    },
  });
}

export async function getUsersByIds(ids: string[]) {
  return await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}
