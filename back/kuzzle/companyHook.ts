import { KDocumentContent, KuzzleRequest, KDocument } from "kuzzle";
import dayjs from 'dayjs'

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
                end: Date
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

                const deysLeftFromNow = dayjs(date.end).endOf('d').diff(dayjs().endOf('d'), 'd')
                const newBalance: number = deysLeftFromNow * dayCost

                if (newBalance !== balance) {
                    let newEndDate: Date = dayjs().endOf('d').add(deysLeftFromNow, 'd').toDate()
                    switch (true) {
                        case deysLeftFromNow > 7: item._source.states.subscription = { value: 'active', label: 'Активна' }; break
                        case deysLeftFromNow <= 7 && deysLeftFromNow > 0: item._source.states.subscription =
                            { value: 'ending', label: 'Заканчивается' }; break
                        case deysLeftFromNow <= 0: item._source.states.subscription = { value: 'ended', label: 'Закончилась' }; break
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