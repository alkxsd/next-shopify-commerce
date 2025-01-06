export type Menu = {
  title: string;
  path: string;
  items?: Menu[]; // Add support for nested items
};

export type ShopifyMenuItem = {
  title: string;
  url: string;
  items?: ShopifyMenuItem[]; // Shopify's nested items
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: ShopifyMenuItem[];
    };
  };
  variables: {
    handle: string;
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
  data: {
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
    };
  };
  variables: {
    handle: string;
  };
};