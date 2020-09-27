import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcrypt"
import {generateToken} from "../../../utils";

export default {
    Mutation : {
        Login : async (_, args) => {
            const {
                email,
                password
            } = args;

            const user = await prisma.user({email})

            if (user !== null) {
                if (bcrypt.compareSync(password, user.password)) {
                    return generateToken(user.id)
                } else {
                    throw Error("Wrong Email & Password Combination.")
                }
            } else {
                throw Error("Account doesn't exist. Please Sign up first.")
            }
        }
    }
}