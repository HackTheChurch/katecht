import prisma from "@/lib/db";

export async function addAIResponse(jsonString: string) {
  return await prisma.aIRecommendation.create({
    data: {
      json: jsonString,
    },
  });
}

export async function getLastAIResponse() {
  return prisma.aIRecommendation.findFirst({
    orderBy: {
      createdDate: "desc",
    },
  });
}
