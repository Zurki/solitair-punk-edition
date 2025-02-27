import type { LinksFunction as RouterLinksFunction, MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export type MetaFunction = RouterMetaFunction;
  export type LinksFunction = RouterLinksFunction;
  export interface ErrorBoundaryProps {
    error: unknown;
  }
} 