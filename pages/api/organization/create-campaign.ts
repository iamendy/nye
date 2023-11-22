import prisma from "../../../prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log(req.body);
  const { name, target, description, deadline, orgId } = req.body;

  if (req.method === "POST") {
    try {
      const organization = await prisma.campaign.create({
        data: {
          name,
          target,
          description,
          deadline,
          orgId,
        },
      });
      res.status(200).json(organization);
    } catch (e) {
      res.status(500).json({ msg: e });
    }
  } else {
    res.status(400).json({ msg: "Not Found" });
  }
}
