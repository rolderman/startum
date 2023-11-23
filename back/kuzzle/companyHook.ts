import { KDocumentContent, KuzzleRequest, KDocument } from "kuzzle";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

interface Company extends KDocumentContent {
    states: {
        subscription: {
            value: string
            label: string
        }
    },
    content: {
        subscription: {
            balance: number
            date: {
                end: number
            },
            dayCost: number
        }
    }
}

export default function (app: any, collection: string, request: KuzzleRequest) {
    let updateItems: any[] = []
    request.result.hits.filter(i => i.collection === collection).forEach((item: KDocument<Company>) => {
        const { subscription } = item._source.states
        if (subscription.value !== 'notRegistered') {
            if (item._source.content?.subscription) {
                const { balance, dayCost, date } = item._source.content?.subscription

                const secondsLeftFromNow = dayjs(date.end).diff(dayjs().utc(), 's')
                const newBalance: number = secondsLeftFromNow * dayCost / 86400

                if (newBalance !== balance) {
                    let newEndDate: number = dayjs().utc().add(secondsLeftFromNow, 's').valueOf()
                    switch (true) {
                        case secondsLeftFromNow > 7 * 86400: item._source.states.subscription = { value: 'active', label: 'Активна' }; break
                        case secondsLeftFromNow <= 7 * 86400 && secondsLeftFromNow > 0: item._source.states.subscription =
                            { value: 'ending', label: 'Заканчивается' }; break
                        case secondsLeftFromNow <= 0: item._source.states.subscription = { value: 'ended', label: 'Закончилась' }; break
                    }
                    item._source.content.subscription.balance = newBalance
                    item._source.content.subscription.date.end = newEndDate

                    updateItems.push({
                        _id: item._id,
                        body: {
                            states: { subscription: item._source.states.subscription },
                            content: {
                                subscription: {
                                    balance: newBalance,
                                    date: { end: newEndDate }
                                }
                            }
                        }
                    })
                }
            }
        }
    });
    app?.sdk.document.mUpdate('startum_v1', collection, updateItems, { silent: true })
    return request
}