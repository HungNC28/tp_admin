import { Http } from "./http";
import { GetLocalStorage, LOCAL_STORAGE, SetLocalStorage } from "../Utils/localstorage";

const API_ENDPOINT = {
  LOGIN: "auth/login",
  ME: "auth/me"
}
class AuthService {
  constructor() {
    if (AuthService._instance) {
      return AuthService._instance;
    }
    AuthService._instance = this;
  }
  setGroupId(id) {
    SetLocalStorage(LOCAL_STORAGE.GROUP_ID, id);
  }

  getGroupId() {
    return GetLocalStorage(LOCAL_STORAGE.GROUP_ID) || '';
  }

  getToken() {
    return GetLocalStorage(LOCAL_STORAGE.TOKEN) || '';
  }

  login(payload) {
    return Http.post(API_ENDPOINT.LOGIN, payload);
  }

  getMe() {
    return Http.get(API_ENDPOINT.ME);
  }
}
const authService = new AuthService();

export default authService;