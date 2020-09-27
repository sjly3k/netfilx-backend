import {prisma} from "../../../../generated/prisma-client";

export default {
    Query : {
        searchContent: async (_, args) => {
            const {term} = args;
            const contents = await prisma.contents({
                where: {
                    AND: [
                        {title_contains: term}
                    ]
                }
            })
            return contents
        }
    }
}