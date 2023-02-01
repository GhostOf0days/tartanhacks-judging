import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";
import { initJudgePrizeAssignments, synchronizeProjects } from "./synchronize";

/**
 * Clear judge prize assignments
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await prisma.judgePrizeAssignment.deleteMany({});
    await prisma.judgingInstance.deleteMany({});

    await synchronizeProjects();
    await initJudgePrizeAssignments();
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occured");
  }
}
