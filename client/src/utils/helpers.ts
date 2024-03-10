import { Constant } from "@cms/constants";

/**
 *
 * @param endpoint Relative endpoint of the the api
 * @param method HTTP Method type
 * @param body Body of the request
 * @returns Response in JSON format or throws the exception if call wasn't successful.
 */
export async function api<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: object | FormData
): Promise<T> {
  if (["POST", "PUT"].includes(method) && !body) {
    throw new Error(`"body" argument is required for ${method} method.`);
  }

  const isMultipartRequest = body && body instanceof FormData;

  const url = `${import.meta.env.VITE_API_ENDPOINT}${endpoint}`;
  const headers = isMultipartRequest ? {} : Constant.httpHeaders;
  const cleanBody = isMultipartRequest ? body : JSON.stringify(body);

  const response = await fetch(url, {
    method,
    headers,
    body: cleanBody,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data as T;
}

/**
 *
 * @param classNames Names of the classes to be combined
 * @returns String with the all the class names joined with whitespace as delimiter
 */
export function cls(...classNames: string[]) {
  return classNames.join(" ");
}
