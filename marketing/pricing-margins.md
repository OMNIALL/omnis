# Pricing & margins — OMNIS FOCUS

**Decision (2026-11-15): 59 / 99 / 129 DT** · delivery 7 DT for 1 bottle, free from 2 · extra bottles beyond 3: 43 DT.
Prices live only in `src/lib/pricing.ts`.

## Inputs
| Input | Value | Status |
|---|---|---|
| Unit cost (COGS) | **10 DT** / bottle | confirmed |
| Delivery we pay the courier | 8 DT / shipment | **assumption — confirm** |
| Packaging | 1 DT / order | **assumption — confirm** |
| COD refusal rate | 20 % | **assumption — measure after launch** |
| Return fee on a refused parcel | 4 DT (bottle comes back sealed, resellable) | **assumption — confirm** |

**Gross margin %** = (AOV − COGS − delivery − packaging − refusal cost) ÷ AOV.
Refusal cost per delivered order = refusal rate ÷ (1 − refusal rate) × (delivery + return fee + packaging).

## Chosen prices — 59 / 99 / 129 DT
| Pack | Customer pays | Per bottle | Per day | Saving vs 1 bottle | Profit / order before ads | Gross margin at 15 % / 20 % / 30 % refusals | COGS / price |
|---|---|---|---|---|---|---|---|
| 1 bottle | 59 + 7 = 66 | 59 | 1,97 | — | 43,75 | 67,7 / **66,3** / 62,8 % | 17 % |
| 2 bottles | 99 | 49,50 | 1,65 | 19 DT + delivery | 66,75 | 68,4 / **67,4** / 65,1 % | 20 % |
| 3 bottles | 129 | 43 | 1,43 | 48 DT + delivery | 86,75 | 68,0 / **67,2** / 65,4 % | 23 % |

✅ COGS under 25 % on every pack · ⚠️ gross margin ≈ 66–68 %, **just under the 70 % target**.

## Compared options
| Prices | Gross margin (20 % refusals) | Profit / order (1 / 2 / 3) | Note |
|---|---|---|---|
| 39 / 72 / 99 (old) | 52 / 55 / 57 % | 24 / 40 / 57 DT | Too thin: every CPA increase hurts, scaling accelerates the loss |
| **59 / 99 / 129 (chosen)** | 66 / 67 / 67 % | 44 / 67 / 87 DT | Easier for students; close to target |
| 69 / 119 / 159 | 71 / 73 / 73 % | 54 / 87 / 117 DT | Hits 70 %+; switch here if CPA comes in high |

## What protects the margin at 59 / 99 / 129
1. **Push the 2-pack** (pre-selected, guarantee, free delivery): best profit per order (66,75 DT) for one delivery cost.
2. **Cut refusals** — WhatsApp confirmation before shipping. Every 10 points of refusal rate ≈ 1,5–2 points of margin.
3. **Negotiate the courier rate** — 1 DT less per shipment ≈ +1 to +1,5 points of margin.
4. **Watch the guarantee cost** — the sealed-bottle guarantee only refunds a resellable bottle; keep it that way until margins pass 70 %.
5. **Revisit after the first 100 orders** with real refusal and CPA numbers: if max CPA is too tight, move to 69 / 119 / 159.

## Max cost per order (before profit)
Profit before ads − target profit = max CPA per delivered order. Example, 2-pack: 66,75 − 20 = **46,75 DT** per delivered order ≈ **37 DT per placed order** at 80 % acceptance.
