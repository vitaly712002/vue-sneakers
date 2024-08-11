import axios from "axios";

export const api = axios.create(
    {
        baseURL: 'https://7890692dcd11d02d.mokky.dev'
    }
)