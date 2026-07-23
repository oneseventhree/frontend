import type { DemoConfig } from "../types";
import { demoEntitiesHome } from "./entities";
import { demoLovelaceHome } from "./lovelace";

export const demoHome: DemoConfig = {
  authorName: "Home Assistant",
  authorUrl: "https://github.com/home-assistant/frontend/",
  name: "Default dashboard",
  description:
    "The dashboard Home Assistant automatically generates for you, based on the areas in your home and the devices in them.",
  lovelace: demoLovelaceHome,
  entities: demoEntitiesHome,
  theme: { theme: "default", dark: false },
};
