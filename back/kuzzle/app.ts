import { Backend } from "kuzzle";
import { PrometheusPlugin } from "kuzzle-plugin-prometheus";

export class Application extends Backend {
  private prometheusPlugin = new PrometheusPlugin();

  get appConfig() {
    return this.config.content.application;
  }

  constructor() {
    super("application");

    this.plugin.use(this.prometheusPlugin);

    this.pipe.register('document:afterSearch', async (request) => {
      //request.result.now = (new Date()).toUTCString();
      this.log.info("pipe collection: " + JSON.stringify(request.input.args.collection));
      this.log.info("pipe result: " + JSON.stringify(request.result));
      return request;
    });
  }

  async start() {
    await super.start();
    this.log.info("Application started");
  }
}

new Application().start();