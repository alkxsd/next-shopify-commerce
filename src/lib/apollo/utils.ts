import { getApolloClient } from '@/lib/apollo/client';
import { Menu, ShopifyMenuItem, ShopifyMenuOperation } from '@/lib/shopify/types';
import { getDomain } from '../utils';
import { GET_MENU } from './queries/menu';

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
