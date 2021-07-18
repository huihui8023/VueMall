import { request } from "./request";

export function shopcartgetRecommend() {
    return request({
        url: '/recommend'
    })
}