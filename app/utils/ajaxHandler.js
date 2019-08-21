import axios from "axios";

export default class AjaxHandler {
    constructor() {
        this.host = "http://localhost";
        this.port = 3000;
        this.axios = axios;
    }

    getAll(entity = "", filter = {}, sort = {}) {
        const { sortField, sortOrder } = sort;
        const { searchField, value } = filter;
        let url = `${this.host}:${this.port}/${entity}`;

        if(searchField && value) {
            url = `${url}?${searchField}=${encodeURI(value)}`
        }

        if(sortField && sortOrder) {
            url = url.indexOf("?") > -1 ? `${url}&_sort=${sortField}&order=${sortOrder}` : `${url}?_sort=${sortField}&order=${sortOrder}`
        }

        return this.axios.get(url);
    }

    delete(entity = "", id = 0) {
        return this.axios.delete(`${this.host}:${this.port}/${entity}/${id}`);
    }

    create(entity = "", data) {
        return this.axios.post(`${this.host}:${this.port}/${entity}`, data);
    }

    update(entity = "", data) {
        return this.axios.put(`${this.host}:${this.port}/${entity}`, data);
    }

}