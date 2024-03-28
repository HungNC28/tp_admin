import { Http } from "./http";

const API_ENDPOINT = {
    LIST_STATISTIC: "report/statistic?",
    GET_STATISTIC: "report/statistic/get?",
    MONTH_STATISTIC: "report/total/month?",
    COUNT_MONTH: "report/count/month?"
}

class SharedService {
    constructor() {
        if (SharedService._instance) {
            return SharedService._instance;
        }
        SharedService._instance = this;
    }

    listStatistic(query) {
        return Http.get(API_ENDPOINT.LIST_STATISTIC + `zone_id=${query.zone_id}`)
    }

    getStatistic(query) {
        return Http.get(API_ENDPOINT.GET_STATISTIC + `group_id=${query.group_id}`)
    }

    getTotalMonth(query) {
        return Http.get(API_ENDPOINT.MONTH_STATISTIC + `zone_id=${query.zone_id}`)
    }

    getCountMonth(query) {
        return Http.get(API_ENDPOINT.COUNT_MONTH + `zone_id=${query.zone_id}`)
    }
}

const sharedService = new SharedService();

export default sharedService;