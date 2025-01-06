import { SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "../constant";
import { isShopifyError } from "../type-guards";
import { ensureStartWith } from "../utils";
import { getHeroBannerQuery } from "./queries/hero-banner";
import { getMenuQuery } from "./queries/menu";
import { HeroBannerType, Menu, ShopifyHeroBannerOperation, ShopifyMenuItem, ShopifyMenuOperation } from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN ? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://') : "";
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;

const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type ExtractVariables<T> = T extends { variables: object}
  ? T['variables']
  : never;

export const shopifyFetch = async <T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> => {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: {tags} })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }
    return {
      status: result.status,
      body: body,
    };
  } catch (error) {
    if (isShopifyError(error)) {
      throw {
        cause: error.cause?.toString() || 'unknown',
        status: error.status || 500,
        message: error.message,
        query
      }
    }

    throw {
      error,
      query,
    }
  }
};

export const getMenu = async (handle: string): Promise<Menu[]> => {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });
  // console.log('MENU RES', res.body.data.menu.items);
  const processMenuItem = (item: ShopifyMenuItem): Menu => ({
    title: item.title,
    path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', ''),
    ...(item.items && { items: item.items.map(processMenuItem) }),
  });

  return res.body?.data?.menu?.items.map(processMenuItem) || [];
};

// getHeroBanner function
export const getHeroBanner = async (handle: string): Promise<HeroBannerType | null> => {
  const res = await shopifyFetch<ShopifyHeroBannerOperation>({
    query: getHeroBannerQuery,
    variables: { handle },
    cache: 'no-store',
  });

  const fields = res.body.data.metaobject?.fields;
  if (!fields) return null;
  return {
    id: fields.find(f => f.key === 'id')?.value || '',
    title: fields.find(f => f.key === 'title')?.value || '',
    subtitle: fields.find(f => f.key === 'subtitle')?.value || '',
    features: JSON.parse(fields.find(f => f.key === 'features')?.value || '[]'),
    buttonText: fields.find(f => f.key === 'button_text')?.value || '',
    buttonUrl: fields.find(f => f.key === 'button_url')?.value || '',
    backgroundColor: fields.find(f => f.key === 'background_color')?.value || '',
    image: {
      url: fields.find(f => f.key === 'image')?.reference?.image?.url || '',
      altText: fields.find(f => f.key === 'image')?.reference?.image?.altText || '',
      width: fields.find(f => f.key === 'image')?.reference?.image?.width || 0,
      height: fields.find(f => f.key === 'image')?.reference?.image?.height || 0,
    }
  };
};