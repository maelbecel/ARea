// --- Librairies import --- //
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)

    if (session)
        return res.send({ content: session });
    return res.send({ content: 'Please log in.' });
}

export default handler;
