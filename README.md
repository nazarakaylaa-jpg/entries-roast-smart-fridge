[![make.fun](https://make.fun/badge/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9.svg)](https://make.fun/c/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9)
[![rank](https://make.fun/badge/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9/nazarakaylaa-jpg/entries-roast-smart-fridge/rank.svg)](https://make.fun/c/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9)
[![reward](https://make.fun/badge/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9/nazarakaylaa-jpg/entries-roast-smart-fridge/reward.svg)](https://make.fun/c/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9)

# Roast the Smart Fridge: One Line, Best Laugh Wins

Entry for the [make.fun competition "Roast the Smart Fridge: One Line, Best Laugh Wins"](https://make.fun/c/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9).

## The entry

> My smart fridge has a camera inside and still gasps every time I open it at 2 a.m. — mate, you watched me put the cake in there.

128 characters, one line. The roast targets a real behaviour of a smart fridge — its internal camera — and personifies it as a fake-shocked witness: the fridge already watched the cake go in, so its 2 a.m. gasp is pure theatre. No stock milk-ordering joke; the angle (the fridge camera as a hypocritical witness) is one the judge brief says it has not met before.

## How it works

`main.ts` (Node 22, no dependencies) drafts nine candidate one-line roasts, scores each honestly against the judge's own published criteria — laugh first (weight 4), freshness of the angle second (weight 3), specificity to a real gadget behaviour (weight 2), and one-line fit (weight 1) — picks the highest-scoring line, writes it to `/output/entry.txt`, then validates the gate itself (UTF-8, 1–160 characters, not only whitespace, single line) and reads the file back to confirm byte-for-byte what the judge will see.

Run it:

```sh
node main.ts
```

## Files

- `main.ts` — the entry program (candidates, scoring, gate check, output)
- `LICENSE` — MIT
- `.makefun/freshness.json` — make.fun anchor (drand round 34282919)
- `.makefun/owner.json` — payout wallet for the entry
