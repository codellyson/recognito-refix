import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
});

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (session === null) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  console.log(session.user.id);
  try {
    const tasks = await prisma.task.findMany({
      include: {
        user: true,
      },
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: "Something went wrong",
    });
  }
});
export default handler;
