/**
 * @author Vincent Cheung (coolingfall@gmail.com)
 */

import { Method } from "../Method";
import { parameterDecorator, parameterEmptyDecorator } from "./parameters";
import { methodDecorator } from "./methods";

export function GET(path: string) {
  return methodDecorator(Method.GET, path);
}

export function POST(path: string) {
  return methodDecorator(Method.POST, path);
}

export function DELETE(path: string) {
  return methodDecorator(Method.DELETE, path);
}

export function PUT(path: string) {
  return methodDecorator(Method.PUT, path);
}

export function HEAD(path: string) {
  return methodDecorator(Method.HEAD, path);
}

export function Header(key: string) {
  return parameterDecorator("Header", key);
}

export function Headers(headers: object) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    target[`${propertyKey}_Headers`] = headers;
    return descriptor;
  };
}

export function Query(key: string) {
  return parameterDecorator("Query", key);
}

export function QueryMap(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  return parameterEmptyDecorator("Query", target, propertyKey, parameterIndex);
}

export function Field(key: string) {
  return parameterDecorator("Body", key);
}

export function Body(target: any, propertyKey: string, parameterIndex: number) {
  return parameterEmptyDecorator("Body", target, propertyKey, parameterIndex);
}

export function Part(key: string) {
  return parameterDecorator("Part", key);
}

export function MultiPart(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  target[`${propertyKey}_MultiPart`] = true;
  return descriptor;
}

export function FormUrlEncoded(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  target[`${propertyKey}_FormUrlEncoded`] = true;
  return descriptor;
}

export function Raw(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  target[`${propertyKey}_Return_Raw`] = true;
  return descriptor;
}