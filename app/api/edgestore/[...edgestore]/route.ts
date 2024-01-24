import {initEdgeStore} from "@edgestore/server";
import {createEdgeStoreNextHandler} from "@edgestore/server/adapters/next/app";
import {z} from "zod";

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
    publicImages: es.imageBucket({
        maxSize: 1024 * 1024,
    }).input(
        z.object({
            type: z.enum(["post", "profile", "community/thumb", "community/icon", "community/about"]),
        })
    ).path(({input}) => [{ type: input.type }]),

});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
});

export {handler as GET, handler as POST};

export type EdgeStoreRouter = typeof edgeStoreRouter;
