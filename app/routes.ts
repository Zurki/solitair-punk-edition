import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("solitaire", "routes/solitaire.tsx")
] satisfies RouteConfig;
