// --- Libraries Imports ---
import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req })

    if (token)
        return res.send({ content: token });
    return res.send({ content: 'Please log in.' })
}

export default handler;
