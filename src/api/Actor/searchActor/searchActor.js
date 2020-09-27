import {prisma} from "../../../../generated/prisma-client";

export default {
    Query : {
        searchActor: async (_, args) => {
            const {term} = args;
            const actors = await prisma.actors({
                where: {
                    name_contains: term
                }
            })
            return actors
        }
    }
}