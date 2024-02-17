import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { addRunTemplateToGroup } from "../questions/questions-repository";

export async function createRunTemplate(runTemplate: Prisma.RunTemplateCreateInput, groupId: string) {
  try {
    console.log(runTemplate);
    const createdRunTemplate = await prisma.runTemplate.create({
      data: runTemplate,
      include: {
        questions: true,
      },
    });

    console.log(createdRunTemplate);
    await addRunTemplateToGroup(createdRunTemplate.id, groupId);

    revalidatePath("/groups");
    return createdRunTemplate;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getRunTemplateById(id: string) {
  return await prisma.runTemplate.findUnique({
    where: {
      id,
    },
    include: {
      questions: true,
      answers: { include: { answeredBy: true } },
    },
  });
}
