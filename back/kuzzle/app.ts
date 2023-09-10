import { Backend, KuzzleRequest } from "kuzzle";
import parseCollections from "./parseCollections"
import taskPipe from "./taskPipe"

export class Application extends Backend {
  get appConfig() {
    return this.config.content.application;
  }

  constructor() {
    super("application");

    this.pipe.register('document:afterSearch', async (request: KuzzleRequest) => {
      //this.log.info(JSON.stringify(request));      
      const collections = parseCollections(request)
      collections?.forEach(collection => {
        const dbClass = collection.split('_')[0]
        if (dbClass === 'task') return taskPipe(undefined, collection, request)
      })
      return request
    });
  }

  async start() {
    await super.start();
    this.log.info("Application started");
  }
}

new Application().start();