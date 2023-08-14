import { Backend, KDocument, KDocumentContent, KuzzleRequest } from "kuzzle";
import { PrometheusPlugin } from "kuzzle-plugin-prometheus";
import dayjs from 'dayjs'

interface Task extends KDocumentContent {
  states: {
    flow: {
      value: string,
      title: string
    }
  },
  content: {
    name: string,
    schedule: {
      startDate: {
        plan: string,
        fact: string
      },
      duration: {
        plan: number,
        fact: number
      }
    }
  }
}

export class Application extends Backend {
  private prometheusPlugin = new PrometheusPlugin();

  get appConfig() {
    return this.config.content.application;
  }

  constructor() {
    super("application");

    this.plugin.use(this.prometheusPlugin);

    this.pipe.register('document:afterSearch', async (request: KuzzleRequest) => {
      const collection = request.input.args.collection
      const dbClass = collection.split('_')[0]
      if (dbClass === 'task') {
        let updateItems = []
        request.result.hits.forEach((item: KDocument<Task>) => {
          const { startDate, duration } = item._source.content.schedule
          const { flow } = item._source.states
          if (!startDate.fact && flow.value !== 'failed') {
            const startDateCalcFact = dayjs(startDate.plan).add(duration.plan, 'minute')
            const diff = dayjs(startDateCalcFact).diff(dayjs())
            if (diff < 0) {
              const flow = {
                value: 'failed',
                title: 'Провалена'
              }
              item._source.states.flow = flow
              updateItems.push({
                _id: item._id,
                body: {
                  states: { flow }
                }
              })
              this.log.info(`Task '${item._source.content.name}', flow state updated to 'failed'`);
            }
          }
        });
        this.sdk.document.mUpdate('startum_v1', collection, updateItems, { silent: true })
      }
      return request;
    });
  }

  async start() {
    await super.start();
    this.log.info("Application started");
  }
}

new Application().start();