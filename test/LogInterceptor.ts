/**
 * @author Vincent Cheung (coolingfall@gmail.com)
 */

import { Chain } from "../packages/revival/src/Chain";
import { Interceptor } from "../packages/revival/src/Interceptor";
import { ReviRequest } from "../packages/revival/src/ReviRequest";
import { ReviResponse } from "../packages/revival/src/ReviResponse";

export class LogInterceptor implements Interceptor {
  intercept(chain: Chain): ReviResponse {
    let request: ReviRequest = chain.request();

    console.log(`--> ${request.method} ${request.url}`);
    let headers: any = request.headers;
    if (headers) {
      for (let key in headers) {
        if (headers.hasOwnProperty(key)) {
          console.log(`${key}: ${headers[key]}`);
        }
      }
    }
    if (request.params) {
      console.log(request.params);
    }
    console.log(`--> END ${request.method} \n`);

    return chain.proceed(request);
  }
}