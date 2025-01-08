// src/lib/shopify/types.ts
export type Menu = {
  title: string;
  path: string;
  items?: Menu[];
};

export type ShopifyMenuItem = {
  __typename: 'MenuItem';
  title: string;
  url: string;
  items: ShopifyMenuItem[];
};

export type ShopifyMenuOperation = {
  menu: {
    __typename: 'Menu';
    items: ShopifyMenuItem[];
  };
};
export type HeroBannerType = {
  id: string;
  title: string;
  subtitle: string;
  features: string[];
  buttonText: string;
  buttonUrl: string;
  image: {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  backgroundColor: string;
};

export type ShopifyHeroBannerOperation = {
  metaobject: {
    fields: {
      key: string;
      value: string;
      reference: {
        image?: {
          url: string;
          altText: string;
          width: number;
          height: number;
        };
      } | null;
    }[];
  } | null;
};