/**
 * Copyright (C) 2017-present Vincent Cheung
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Interceptor } from "./interceptor";
import { XhrCall } from "./xhr-call";
import { ReviResponse } from "./response";
import { ReviRequest } from "./request";

/**
 * A call which sends a request to server and returns callback. Calls may be executed
 * asynchronously with {@link enqueue}.
 */
export interface Call<T> {
  request(): ReviRequest;

  enqueue(
    onResponse?: (response: ReviResponse) => void,
    onFailure?: (error: any) => void
  ): void;

  cancel(): void;
}

/**
 * A factory to create a new {@link Call}.
 */
export interface CallFactory {
  /**
   * Return a new call with origin request.
   *
   * @param request origin request
   * @returns new call
   */
  newCall(request: ReviRequest): Call<any>;
}

/**
 * Default call factory used in revival.
 */
export class DefaultCallFactory implements CallFactory {
  private readonly interceptors: Array<Interceptor> = [];

  constructor(interceptors?: Array<Interceptor>) {
    if (interceptors && interceptors.length > 0) {
      this.interceptors.push(...interceptors);
    }
  }

  newCall(request: ReviRequest): Call<any> {
    return new XhrCall(request, this.interceptors);
  }
}
