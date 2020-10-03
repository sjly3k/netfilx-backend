import {prisma} from "../../../../generated/prisma-client";
import bcrypt from "bcrypt"

const check_password = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;
const salt_num = 10

export default {
    Mutation : {
        createAccount : async (_, args) => {
            const {
                email,
                phoneNumber,
                password,
                likedContents
            } = args;

            const userName = email.split("@")[0]

            const exists = await prisma.$exists.user({
                OR : [
                    {
                        userName
                    },
                    {
                        email
                    },
                    {
                        phoneNumber
                    }
                ]
            })

            if (exists) {
                throw Error("This Username Or Email is already taken.")
            } else {
                if (check_password.test(password) === false) {
                    throw Error("Password must be 8~16 digits of alphabet, " +
                        "number, and special character combination.")
                }
                bcrypt.hash(password, salt_num, async function(err, hash) {
                    const newUser =
                        await prisma.createUser({
                            userName,
                            email,
                            phoneNumber,
                            password : hash,
                        })

                    for (const content in likedContents) {
                        await prisma.createLike({
                            user : {
                                connect : {
                                    id : newUser.id
                                }
                            },
                            content : {
                                connect : {
                                    id : likedContents[content]
                                }
                            }
                        })
                    }
                });
                return true;
            }
        }
    }
}