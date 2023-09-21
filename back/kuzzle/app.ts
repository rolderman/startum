import { Backend, KuzzleRequest } from "kuzzle";
import parseCollections from "./parseCollections"
import taskHook from "./taskHook"
import companyHook from "./companyHook"

export class Application extends Backend {
  get appConfig() {
    return this.config.content.application;
  }

  constructor() {
    super("application");

    this.hook.register('document:afterSearch', async (request: KuzzleRequest) => {
      //this.log.info(JSON.stringify(request));      
      const collections = parseCollections(request)
      collections?.forEach(collection => {
        const dbClass = collection.split('_')[0]
        if (dbClass === 'task') return taskHook(this, collection, request)
        if (dbClass === 'company') return companyHook(this, collection, request)
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