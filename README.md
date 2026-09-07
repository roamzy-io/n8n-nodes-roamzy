# @roamzy/n8n-nodes-roamzy

An [n8n](https://n8n.io) community node for [Roamzy](https://roamzy.io) — **one global eSIM for 193 countries, billed per megabyte, paid in USDT or USDC**. No packages, no expiry, no subscription.

Price a trip, create an order, poll it until the invoice is paid, read the eSIM's activation details — from a workflow, or from an **AI Agent** node that uses this node as a tool.

[![npm version](https://img.shields.io/npm/v/@roamzy/n8n-nodes-roamzy?color=cb3837&logo=npm&logoColor=white)](https://www.npmjs.com/package/@roamzy/n8n-nodes-roamzy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE.md)
[![n8n community node](https://img.shields.io/badge/n8n-community%20node-ea4b71)](https://docs.n8n.io/integrations/community-nodes/)

## Install

In n8n: **Settings → Community Nodes → Install**, enter `@roamzy/n8n-nodes-roamzy`.

Self-hosted from the shell:

```bash
npm install @roamzy/n8n-nodes-roamzy
```

## Credentials

The node uses one credential, **Roamzy API**, holding a Bearer token (`rk_live_…`). Two ways to get one:

1. **Instantly, with no account** — add a Roamzy node, set *Resource* = `Session`, *Operation* = `Create Anonymous`, run it once. The output contains `api_token` (shown once — copy it into a Roamzy API credential) and a `claim_url` to attach the account to a Google or Telegram identity later. Anonymous accounts start with tight spending limits ($40/day, $100/month, 1 active eSIM) that lift when claimed.
2. **From the dashboard** — sign in at [roamzy.io](https://roamzy.io) and create a token under *API tokens*; you set the daily/monthly spending limits yourself.

`Country`, `Estimate`, `Payment Option` and `Session` operations are public and need no credential; `Order`, `eSIM` and `Account` do.

## Operations

| Resource | Operation | What it does |
|---|---|---|
| Country | Get Many | Full catalog — 193 countries with USD per MB / per GB (one item per country) |
| Country | Get | One country's rate and coverage |
| Estimate | Calculate | Cost of an MB budget in a country at today's rate |
| Payment Option | Get Many | Stablecoin + network combinations accepted right now, with the `code` to pass to *Order → Create* |
| Order | Create | Reserve an eSIM and create a stablecoin invoice (min 20 USDT). Returns `pay_url`; the eSIM is issued once paid. |
| Order | Get | Payment / provisioning status of an order |
| eSIM | Get Many | The account's eSIMs with status and balance |
| eSIM | Get | One eSIM with QR payload and LPA string |
| Account | Get | The account behind the token, its limits and eSIM cap |
| Account | Get Referral | Referral code, link and earnings (20% of every payment by referred accounts, recurring) |
| Session | Create Anonymous | New account + API token with no signup |

Money moves only when the invoice returned by *Order → Create* is paid; creating an order alone charges nothing.

## Example: price a trip, then order

1. **Roamzy** — *Country → Get* with `esim-japan` → rate per MB.
2. **Roamzy** — *Estimate → Calculate* with `esim-japan`, `2000` MB → projected cost.
3. **IF** the projection is acceptable →
4. **Roamzy** — *Order → Create* with `esim-japan`, `20` USDT, `usdttrc20` → `pay_url`.
5. Send `pay_url` wherever the human pays (Telegram, Slack, email); a **Wait** node plus *Order → Get* on a loop until `status` is `paid`.
6. **Roamzy** — *eSIM → Get* → QR payload to deliver.

## As an AI Agent tool

The node is marked `usableAsTool`, so in an **AI Agent** workflow it appears under *Tools*. Give the agent a Roamzy API credential and it can answer "what will 3 GB cost me in Spain?", compare countries, and create an order — the payment link goes back to the human, who pays.

## Notes

- Rates are per megabyte and differ by country; the catalog is the source of truth and is refreshed when the price list changes. The same data is published as an open dataset: [roamzy-io/mobile-data-price-index](https://github.com/roamzy-io/mobile-data-price-index).
- One eSIM works in all 193 countries; the *Country Slug* on an order only sets the first destination.
- Roamzy also runs an MCP server for Claude, Cursor and other MCP clients: [roamzy-io/mcp-server](https://github.com/roamzy-io/mcp-server).

## License

[MIT](./LICENSE.md)
