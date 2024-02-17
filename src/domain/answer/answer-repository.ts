import prisma from "@/lib/db";
import { getQuestionById } from "../questions/questions-repository";

export async function addAnswerToQuestion(
  questionId: string,
  answer: number,
  answeredBy: string,
  runTemplate: string,
  runId: string,
) {
  const correctAnswer = await getQuestionById(questionId);
  return await prisma.answer.create({
    data: {
      runId,
      correct: correctAnswer?.correct === answer ? true : false,
      runTemplate: {
        connect: {
          id: runTemplate,
        },
      },
      answeredBy: {
        connect: { id: answeredBy },
      },
      answer,
      question: {
        connect: {
          id: questionId,
        },
      },
    },
  });
}

export async function getAnswersByTemplateId(runTemplateId: string) {
  return await prisma.answer.findMany({
    where: {
      runTemplateId,
    },
    include: {
      answeredBy: true,
      question: true,
      runTemplate: true,
    },
  });
}

export async function getAnswersByRunId(runId: string) {
  return await prisma.answer.findMany({
    where: {
      runId,
    },
    include: {
      answeredBy: true,
      question: true,
      runTemplate: true,
    },
  });
}

export async function getCountOfCorrectAndIncorrectAnswersForRunGroupedByUser(runTemplateId: string) {
  return await prisma.answer.groupBy({
    by: ["answeredById"],
    _count: {
      _all: true,
    },
    where: {
      runTemplateId,
    },
  });
}

export async function getCountOfCorrectAnswersForRunGroupedByUser(runTemplateId: string) {
  return await prisma.answer.groupBy({
    by: ["answeredById"],
    _count: {
      _all: true,
    },
    where: {
      runTemplateId,
      correct: true,
    },
    orderBy: {
      _count: {
        correct: "desc",
      },
    },
  });
}

export async function getAnswerStatsForRunGroupedByUser(runTemplateId: string) {
  const totalAnswers = await getCountOfCorrectAndIncorrectAnswersForRunGroupedByUser(runTemplateId);
  const correctAnswers = await getCountOfCorrectAnswersForRunGroupedByUser(runTemplateId);

  const mergedResults = totalAnswers.map((totalAnswer) => {
    const correctAnswer = correctAnswers.find(
      (correctAnswer) => correctAnswer.answeredById === totalAnswer.answeredById,
    );
    return {
      ...totalAnswer,
      correctAnswers: correctAnswer ? correctAnswer._count._all : 0,
      incorrectAnswers: totalAnswer._count._all - (correctAnswer ? correctAnswer._count._all : 0),
      percentage: ((correctAnswer ? correctAnswer._count._all : 0) / totalAnswer._count._all) * 100,
    };
  });

  return mergedResults;
}

export async function getCountOfUsersInRun(runTemplateId: string) {
  return await prisma.answer.groupBy({
    by: ["answeredById"],
    _count: {
      _all: true,
    },
    where: {
      runTemplateId,
    },
  });
}
