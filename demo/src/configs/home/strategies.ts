import { ReactiveElement } from "lit";
import type { LovelaceConfig } from "../../../../src/data/lovelace/config/types";
import type { LovelaceViewConfig } from "../../../../src/data/lovelace/config/view";
import { isStrategyView } from "../../../../src/data/lovelace/config/view";
import type { HomeDashboardStrategyConfig } from "../../../../src/panels/lovelace/strategies/home/home-dashboard-strategy";
import { HomeDashboardStrategy } from "../../../../src/panels/lovelace/strategies/home/home-dashboard-strategy";
import type { HomeOverviewViewStrategyConfig } from "../../../../src/panels/lovelace/strategies/home/home-overview-view-strategy";
import { HomeOverviewViewStrategy } from "../../../../src/panels/lovelace/strategies/home/home-overview-view-strategy";
import type { HomeAssistant } from "../../../../src/types";

export interface DemoHomeDashboardStrategyConfig extends Omit<
  HomeDashboardStrategyConfig,
  "type"
> {
  type: "custom:demo-home";
}

interface DemoHomeOverviewViewStrategyConfig extends Omit<
  HomeOverviewViewStrategyConfig,
  "type"
> {
  type: "custom:demo-home-overview";
}

class DemoHomeDashboardStrategy extends ReactiveElement {
  static registryDependencies = HomeDashboardStrategy.registryDependencies;

  static async generate(
    config: DemoHomeDashboardStrategyConfig,
    hass: HomeAssistant
  ): Promise<LovelaceConfig> {
    const generated = await HomeDashboardStrategy.generate(
      { ...config, type: "home" },
      hass
    );
    // Swap the overview view for the demo version, which adds the demo card.
    return {
      ...generated,
      views: generated.views.map((view) =>
        isStrategyView(view) && view.strategy.type === "home-overview"
          ? {
              ...view,
              strategy: { ...view.strategy, type: "custom:demo-home-overview" },
            }
          : view
      ),
    };
  }
}

class DemoHomeOverviewViewStrategy extends ReactiveElement {
  static registryDependencies = HomeOverviewViewStrategy.registryDependencies;

  static async generate(
    config: DemoHomeOverviewViewStrategyConfig,
    hass: HomeAssistant
  ): Promise<LovelaceViewConfig> {
    const view = await HomeOverviewViewStrategy.generate(
      { ...config, type: "home-overview" },
      hass
    );
    return {
      ...view,
      sections: [
        {
          type: "grid",
          column_span: 3,
          cards: [
            {
              type: "custom:ha-demo-card",
              grid_options: { columns: "full" },
            },
          ],
        },
        ...(view.sections || []),
      ],
    };
  }
}

customElements.define(
  "ll-strategy-dashboard-demo-home",
  DemoHomeDashboardStrategy
);
customElements.define(
  "ll-strategy-view-demo-home-overview",
  DemoHomeOverviewViewStrategy
);

declare global {
  interface HTMLElementTagNameMap {
    "ll-strategy-dashboard-demo-home": DemoHomeDashboardStrategy;
    "ll-strategy-view-demo-home-overview": DemoHomeOverviewViewStrategy;
  }
}
