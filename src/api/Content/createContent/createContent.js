import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation : {
        createContent : async (_, args) => {

            const {
                title, caption,
                genres : genresInput,
                actors : actorsInput,
                type, files
            } = args;

            for (const genre of genresInput) {
                const checkGenreExist = prisma.$exists.genre({name : genre})
                if (checkGenreExist) {
                    await prisma.createGenre({name : genre})
                }
            }

            for (const actor of actorsInput) {
                console.log(actor)
                const checkActorExist = prisma.$exists.actor({name : actor})
                if (checkActorExist) {
                    await prisma.createActor({name : actor})
                }
            }

            const content = await prisma.createContent({
                title,
                type,
                caption,
                genres: {
                    connect: genresInput.map((name) => ({name : name}))
                },
                actors: {
                    connect: actorsInput.map((name) => ({name : name}))
                },
            })

            for (const file of files) {
                await prisma.createFile({
                    url: file,
                    content: {
                        connect: {id: content.id}
                    }
                });
            }

            let Episiodes = require( `../../../../episodes/${content.title}.json`);
            const EpisiodesKeys = Object.keys(Episiodes)

            for (const key of EpisiodesKeys) {
                await prisma.createEpisode({
                    title: Episiodes[key]["title"],
                    caption: Episiodes[key]["caption"],
                    duration: Episiodes[key]["duration"],
                    season: Episiodes[key]["season"],
                    sequence: Episiodes[key]["sequence"],
                    content: {
                        connect: {id: content.id}
                    }
                });
            }
            return true
        }
    }
}

