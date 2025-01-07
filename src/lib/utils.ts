import { ReadonlyURLSearchParams } from "next/navigation";

export function ensureStartWith(stringToCheck: string, startsWith: string) {
  return stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;
}

export function createUrl(pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) {
  const paramString = params.toString();
  const queryString = `${paramString.length ? '?' : ''}${paramString}`;

  return `${pathname}${queryString}`;
}

export function getDomain () {
  return process.env.SHOPIFY_STORE_DOMAIN ? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://') : "";
}