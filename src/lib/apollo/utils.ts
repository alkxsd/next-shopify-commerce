import { getApolloClient } from '@/lib/apollo/client';
import { GET_HERO_BANNER } from '@/lib/apollo/queries/hero-banner';
import { GET_MENU } from '@/lib/apollo/queries/menu';
import { HeroBannerType, Menu, ShopifyHeroBannerOperation, ShopifyMenuItem, ShopifyMenuOperation } from '@/lib/shopify/types';
import { getDomain } from '../utils';

const domain = getDomain();

export function processMenuItems(items: ShopifyMenuItem[], domain: string): Menu[] {
  return items.map((item: ShopifyMenuItem) => ({
    title: item.title,
    path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', ''),
    ...(item.items && { items: processMenuItems(item.items, domain) }),
  }));
}

export const getMenuData = async (handle: string): Promise<Menu[]> => {
  try {
    const { data } = await getApolloClient.query<{ menu: ShopifyMenuOperation['menu'] }>({
      query: GET_MENU,
      variables: { handle },
      context: {
        headers: {
          'Apollo-Require-Preflight': 'true',
        },
      },
      fetchPolicy: 'network-only',
    });

    const menuItems = data.menu?.items || [];

    return menuItems.map((item: ShopifyMenuItem) => ({
      title: item.title,
      path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', ''),
      ...(item.items && { items: processMenuItems(item.items, domain) }),
    }));
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw new Error(`Failed to fetch menu data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getHeroBanner = async (handle: string): Promise<HeroBannerType | null> => {
  try {
    const { data } = await getApolloClient.query<ShopifyHeroBannerOperation>({
      query: GET_HERO_BANNER,
      variables: { handle },
      context: {
        headers: {
          'Apollo-Require-Preflight': 'true',
        },
      },
      fetchPolicy: 'network-only',
    })

    const fields = data.metaobject?.fields;
    if (!fields) return null;

    return {
      id: fields.find((f) => f.key === 'id')?.value || '',
      title: fields.find((f) => f.key === 'title')?.value || '',
      subtitle: fields.find((f) => f.key === 'subtitle')?.value || '',
      features: JSON.parse(fields.find((f) => f.key === 'features')?.value || '[]'),
      buttonText: fields.find((f) => f.key === 'button_text')?.value || '',
      buttonUrl: fields.find((f) => f.key === 'button_url')?.value || '',
      backgroundColor: fields.find((f) => f.key === 'background_color')?.value || '',
      image: {
        url: fields.find((f) => f.key === 'image')?.reference?.image?.url || '',
        altText: fields.find((f) => f.key === 'image')?.reference?.image?.altText || '',
        width: fields.find((f) => f.key === 'image')?.reference?.image?.width || 0,
        height: fields.find((f) => f.key === 'image')?.reference?.image?.height || 0,
      },
    };
  } catch (error) {
    console.error('Error fetching hero banner:', error);
    throw new Error(`Failed to fetch hero banner data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
