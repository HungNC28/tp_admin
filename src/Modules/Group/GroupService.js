import { Http } from "../../Services/http";

const API_ENDPOINT = {
    LIST_GROUP: "zone/box_group/list?",
    POST_GROUP: "zone/box_group/create",
    UPDATE_GROUP: "zone/box_group/update?",
    GET_GROUP: "zone/box_group/get?",
    LIST_ZONE: "zone/list",
};

class GroupService {
    constructor() {
        if (GroupService._instance) {
            return GroupService._instance;
        }
        GroupService._instance = this;
    }

    listGroup() {
        return Http.get(API_ENDPOINT.LIST_GROUP + `zone_id=GI3K8ROF`);
    }

    postGroup(data) {
        return Http.post(API_ENDPOINT.POST_GROUP, data);
    }

    updateGroup(query, data) {
        return Http.post(API_ENDPOINT.UPDATE_GROUP + `id=${query.id}`, data);
    }

    getGroup(query) {
        return Http.get(API_ENDPOINT.GET_GROUP + `id=${query.id}`);
    }

    listZone() {
        return Http.get(API_ENDPOINT.LIST_ZONE);
    }
}

const groupService = new GroupService();

export default groupService;
