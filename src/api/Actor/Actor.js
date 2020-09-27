import {prisma} from "../../../generated/prisma-client";

export default {
    Actor : {
        contents: parent => prisma.actor({id: parent.id}).contents(),
    }
}