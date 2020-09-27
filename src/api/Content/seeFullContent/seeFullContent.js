import {prisma} from "../../../../generated/prisma-client";

export default {
    Query : {
        seeFullContent : async (_, args) => {
            const { id } = args;
            const content = await prisma.content({id})
            return content
        }
    }
}