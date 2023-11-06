import { KuzzleRequest } from "kuzzle";

export default function (request: KuzzleRequest) {
    let singlCollection: string = request.input.args.collection
    if (singlCollection) return [singlCollection]
    else {
        const collections: string[] = request.input.args.targets[0].collections
        if (collections?.length) return collections
    }
}