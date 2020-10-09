import {prisma} from "../../../../generated/prisma-client";

// files 해결
export default {
    Mutation : {
        createPayment : async (_, args) => {

            const {
                userId,
                plan
            } = args;

            const payment = await prisma.createPayment({
                user : {
                    connect : { id : userId }
                },
                plan
            })

            return true
        }
    }
}

