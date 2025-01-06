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

