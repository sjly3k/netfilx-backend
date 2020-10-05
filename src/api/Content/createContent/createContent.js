import {prisma} from "../../../../generated/prisma-client";

// files 해결
export default {
    Mutation : {
        createContent : async (_, args) => {

            const {
                title, caption,
                genres : genresInput,
                actors : actorsInput,
                type,
                files,
                is_netflix,
                age_limit,
                duration
            } = args;

            console.log(files)
            for (const genre of genresInput) {
                const checkGenreExist = await prisma.$exists.genre({name : genre})
                if (!checkGenreExist) {
                    await prisma.createGenre({name : genre})
                }
            }

            for (const actor of actorsInput) {
                const checkActorExist = await prisma.$exists.actor({name : actor})
                if (!checkActorExist) {
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
                is_netflix,
                age_limit,
                duration
            })

            for (const file of files) {
                await prisma.createFile({
                    url: file.url,
                    type : file.type,
                    content: {
                        connect: {id: content.id}
                    }
                });
            }
            if (type !== "MOVIE") {
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
            }
            return true
        }
    }
}

