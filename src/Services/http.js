import Axios from "axios";
import { BASE_URL } from "../Utils/const";
import authService from "./AuthService";

export class Http {
  static _getHeader() {
    return {
      "Authorization": `Bearer ${authService.getToken()}`,
    };
  }

  static get = async (endPoint, params) => {
    const options = {
      headers: this._getHeader(),
    };
    if (params && Object.keys(params).length) {
      options.params = params;
    }
    return Axios.get(BASE_URL + endPoint, options);
  };
  
  static post = (endPoint, payload) => {
    return Axios.post(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static put = (endPoint, payload) => {
    return Axios.put(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static patch = (endPoint, payload) => {
    return Axios.patch(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static delete = (endPoint, id) => {
    return Axios.delete(BASE_URL + endPoint + "/" + id, {
      headers: this._getHeader(),
    });
  };
}