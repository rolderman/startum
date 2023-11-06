import { KDocumentContent, KuzzleRequest, KDocument } from "kuzzle";
import dayjs from 'dayjs'

interface Task extends KDocumentContent {
    states: {
        flow: {
            value: string
            label: string
            color: string
            order: number
        }
    },
    content: {
        name: string,
        schedule: {
            startDate: {
                plan: number,
                fact: number
            },
            duration: {
                plan: number,
                fact: number
            }
        }
    }
}

export default function (app: any, collection: string, request: KuzzleRequest) {
    let updateItems: any[] = []
    request.result.hits.filter(i => i.collection === collection).forEach((item: KDocument<Task>) => {
        const { startDate, duration } = item._source.content.schedule
        const { flow } = item._source.states
        if (!startDate.fact && flow.value !== 'failed') {
            const startDateCalcFact = dayjs.unix(startDate.plan).add(duration.plan, 'minute')
            const diff = dayjs(startDateCalcFact).diff(dayjs())
            if (diff < 0) {
                const flow = {
                    value: 'failed',
                    label: 'Провалена',
                    color: 'red',
                    order: 3
                }
                item._source.states.flow = flow
                updateItems.push({
                    _id: item._id,
                    body: {
                        states: { flow }
                    }
                })
                app?.log.info(`Task '${item._source.content.name}', flow state updated to 'failed'`);
            }
        }
    });
    app?.sdk.document.mUpdate('startum_v1', collection, updateItems, { silent: true })
    return request
}