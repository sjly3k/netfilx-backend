import {prisma} from "../../../../generated/prisma-client";
import {isAuthenticated} from "../../../middlewares";

export default {
    Mutation : {
        toggleLike : async (_, args, {request}) => {
            if(isAuthenticated(request)) {
                const { user : { id : userId }} = request
                const { contentId } = args

                const filterOption = {
                    AND: [
                        {
                            user: {
                                id: userId
                            },
                            content: {
                                id: contentId
                            }
                        }
                    ]
                }

                try {
                    const existingLike = await prisma.$exists.like(filterOption)
                    if (existingLike) {
                        await prisma.deleteManyLikes(filterOption)
                    } else {
                        await prisma.createLike({
                            user : {
                                connect : { id : userId }
                            },
                            content : {
                                connect : { id : contentId }
                            }
                        })
                    }
                    return true;
                } catch (e) {
                    return false;
                }
            }
        }
    }
}