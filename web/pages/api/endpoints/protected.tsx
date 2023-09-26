// --- Libraries import --- //
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)

    if (session)
        return res.send({ content: "Access granted." });
    res.send({ error: "You don't have access to the content of this page. Please login." });
}

export default handler;
