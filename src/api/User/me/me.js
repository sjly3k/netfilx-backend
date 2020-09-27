import {prisma} from "../../../../generated/prisma-client";
import {isAuthenticated} from "../../../middlewares"

export default {
    Query : {
        me : (_, __, { request }) => {
            if (isAuthenticated(request)) {
                const { user } = request;
                return prisma.user({id : user.id})
            }

        }
    }
}