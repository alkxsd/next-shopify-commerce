import { typePolicies } from "@/lib/apollo/cache/typePolicies";
import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies,
});