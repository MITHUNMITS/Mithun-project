import {ResponseError} from "./response-error";

export class APIResponse {
    data: any|ResponseError;
    success: boolean = false;
    token: string = "";
    total_count: number = 0;
    url : string = "";
    shortUrl : string = "";
}
