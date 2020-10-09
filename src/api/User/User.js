import {prisma} from "../../../generated/prisma-client";

export default {
    User : {
        likes : parent => prisma.user({ id : parent.id }).likes(),
        payment : parent => prisma.user({ id : parent.id }).payment()
    }
}