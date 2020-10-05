import {prisma} from "../../../generated/prisma-client";

export default {
    Content : {
        genres: parent => prisma.content({id: parent.id}).genres(),
        episodes: parent => prisma.content({id: parent.id}).episodes(),
        actors: parent => prisma.content({id: parent.id}).actors(),
        files: parent => prisma.content({id: parent.id}).files(),
        likes: parent => prisma.content({id: parent.id}).likes(),
        isLiked: (parent, _, {request}) => {
            const { user } = request
            const { id } = parent
            return prisma.$exists.like({
                AND: [
                    {
                        user : {
                            id: user.id
                        },
                    },
                    {
                        content : {
                            id
                        }
                    }
                ]
            })
        },
        likeCount: parent => {
            return prisma.likesConnection({
                where : {
                    content : { id : parent.id }
                }
            }).aggregate().count()
        }
    }
}