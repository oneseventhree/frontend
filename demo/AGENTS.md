# Demo Agent Instructions

This file applies to all files under `demo/`. Follow the root `AGENTS.md` for repository-wide standards.

The demo is the full Home Assistant frontend running against a mocked backend (published at https://demo.home-assistant.io). It needs no Home Assistant server, which makes it the easiest way to load the real UI in a browser, for example to take screenshots.

## Running the demo

Run from the repository root:

```bash
yarn dev:demo               # dev server on http://localhost:8090
yarn dev:demo --background  # detached; also supports --status/--stop/--logs
```

The build works offline: when nightly translations cannot be fetched (no network or no GitHub credentials), it falls back to English only.

## Opening a specific demo

The demo contains multiple demo configurations. Select one directly with the `demo` query parameter, e.g. `http://localhost:8090/?demo=arsaboo`. An unknown slug falls back to the default. Slugs are defined in `src/configs/demo-configs.ts`, in this order:

| #   | Slug            | Shown as                 |
| --- | --------------- | ------------------------ |
| 1   | `sections`      | Home Demo (default)      |
| 2   | `arsaboo`       | ARS Home                 |
| 3   | `teachingbirds` | Isa's mobile friendly LL |
| 4   | `kernehed`      | Hem                      |
| 5   | `jimpower`      | Kingia Castle            |

So "the second demo" means `?demo=arsaboo`.

## Opening a specific page

The demo build uses hash-based routing: the frontend path goes in the URL hash, and the `demo` query parameter goes before the `#`. The URL format is:

```
http://localhost:8090/?demo=<slug>#/<path>
```

Useful paths:

- `/lovelace/0` — the selected demo's dashboard (also the default when no hash is given)
- `/energy` — energy dashboard. Its tabs are views: `/energy/overview` (Summary), `/energy/electricity`, `/energy/gas`, `/energy/water`, `/energy/now`
- `/map`, `/history`, `/todo`, `/config` — other sidebar panels

Example — the water tab of the energy dashboard of the second demo:

```
http://localhost:8090/?demo=arsaboo#/energy/water
```

## Taking a screenshot

Playwright is available in this repository. Write a throwaway script (do not commit it) and run it with `node`. Save it in the repository root so `@playwright/test` resolves:

```js
// screenshot.mjs
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto("http://localhost:8090/?demo=arsaboo#/energy/water");
await page.waitForLoadState("networkidle");
await page.waitForTimeout(2000); // let charts finish rendering
await page.screenshot({ path: "demo.png", fullPage: true });
await browser.close();
```

If the Playwright browser download is missing (e.g. in a sandbox), pass a preinstalled browser to `chromium.launch({ executablePath: ... })` instead of downloading one.

## Structure

- `src/ha-demo.ts`: Root element; sets up all backend mocks.
- `src/configs/<slug>/`: One directory per demo configuration (entities, dashboard, theme).
- `src/configs/demo-configs.ts`: Registry of demo configurations and URL slug handling.
- `src/stubs/`: Mocked WebSocket/REST APIs.
- `script/develop_demo`, `script/build_demo`: Dev server and static build wrappers.
