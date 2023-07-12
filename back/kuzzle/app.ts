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
  }

  async start() {
    await super.start();

    this.log.info("Application Startum started");
  }
}

new Application().start();