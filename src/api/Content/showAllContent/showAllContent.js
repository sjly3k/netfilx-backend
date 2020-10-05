import {prisma} from "../../../../generated/prisma-client";

export default {
    Query : {
        showAllContent : async () => {
            const content = await prisma.contents()
            return content
        }
    }
}