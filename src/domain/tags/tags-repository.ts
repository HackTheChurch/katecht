import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function createTag(tag: Prisma.TagCreateInput) {
  try {
    const createdTag = await prisma.tag.create({
      data: tag,
    });
    return createdTag;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createTags(tags: Prisma.TagCreateManyInput) {
  try {
    const createdTags = await prisma.tag.createMany({
      data: tags,
    });
    return createdTags;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
