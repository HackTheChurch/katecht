import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function createQuestion(question: Prisma.QuestionCreateInput, runTemplateId: string) {
  prisma.question.create({
    data: question,
  });
}

export async function createQuestions(questions: Prisma.QuestionCreateManyInput) {
  try {
    const createdQuestions = await prisma.question.createMany({
      data: questions,
    });
    return createdQuestions;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addRunTemplateToGroup(runTemplateId: string, groupId: string) {
  prisma.group.update({
    where: {
      id: groupId,
    },
    data: {
      questionRuns: {
        connect: {
          id: runTemplateId,
        },
      },
    },
  });
}

export async function getQuestionById(id: string) {
  return await prisma.question.findUnique({
    where: {
      id,
    },
  });
}
