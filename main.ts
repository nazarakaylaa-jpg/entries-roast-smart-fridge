// Roast the Smart Fridge: One Line, Best Laugh Wins
// u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9
//
// The program drafts candidate one-line roasts of a smart home gadget,
// scores each one honestly against the judge's own brief (funniest first,
// then freshest angle, then specificity to a real behaviour of the gadget),
// picks the best, writes it to /output/entry.txt, then validates the gate
// itself (UTF-8, 1-160 characters, not only whitespace) and reads the file
// back to confirm what was written.
//
// Judge brief, in short: one line roasting a smart home gadget; laugh
// first, originality of the angle second; a stock joke about a fridge
// ordering too much milk loses to a line nobody has heard before; fast
// setup, sting at the end, no padding, no second sentence; specific to
// the gadget's real behaviour, not smart homes in general.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  // Scores out of 10, judged against the published brief.
  funny: number; // lands a real laugh, turn/sting at the end
  fresh: number; // angle, image or phrasing never met before
  specific: number; // names a real behaviour of the gadget
  fit: number; // sets up fast, lands inside the limit, no padding
  note: string;
};

const CANDIDATES: Candidate[] = [
  {
    text: "My smart fridge has a camera inside and still gasps every time I open it at 2 a.m. — mate, you watched me put the cake in there.",
    funny: 9,
    fresh: 9,
    specific: 9,
    fit: 10,
    note:
      "Personifies the internal camera as a fake-shocked witness; the sting is the fridge already knowing about the cake. 'Gasps' is punchier than 'acts shocked' and trims the setup. Fresh angle, nobody roasts the fridge camera.",
  },
  {
    text: "My smart fridge keeps a log of my midnight snacks and shows it to my phone every morning like a snitch with a spreadsheet.",
    funny: 8,
    fresh: 9,
    specific: 8,
    fit: 8,
    note:
      "Fridge-as-snitch is a fresh frame and the usage log is a real feature, but 'spreadsheet' softens the sting and it lacks a direct hit at the end.",
  },
  {
    text: "My fridge has a touchscreen, Wi-Fi, and a camera, and still can't tell me whether the thing at the back is jam or a science experiment.",
    funny: 8,
    fresh: 8,
    specific: 8,
    fit: 9,
    note:
      "Good image (jam vs science experiment) and a real behaviour (it inventories food yet knows nothing), but the setup lists features before the punch.",
  },
  {
    text: "My fridge beeps if the door stays open ten seconds, like my mother, except my mother never charged me a subscription for the guilt.",
    funny: 7,
    fresh: 8,
    specific: 7,
    fit: 8,
    note:
      "Subscription-guilt twist is fresh, but the mother comparison is a well-worn frame and the door alarm is the most obvious fridge behaviour.",
  },
  {
    text: "My smart fridge texts me when I'm out of milk, yet never texts when it's the one eating my leftovers at 3 a.m.",
    funny: 6,
    fresh: 4,
    specific: 7,
    fit: 8,
    note:
      "The brief warns this exact milk joke loses. 'Fridge eats leftovers' saves it a little, but the milk half is stock.",
  },
  {
    text: "My robot vacuum mapped the whole house, memorised the dog, and still eats the same charging cable every single day.",
    funny: 7,
    fresh: 7,
    specific: 9,
    fit: 9,
    note:
      "Very specific (mapping + cable-eating), but vacuum roasts are a crowded lane and the punch is a shrug, not a sting.",
  },
  {
    text: "My fridge needed a firmware update before it would make ice, so now my drinks are warm and my appliance has opinions about its own software.",
    funny: 6,
    fresh: 6,
    specific: 8,
    fit: 7,
    note:
      "Real behaviour (update-gated ice maker), but reads as a mild observation about technology, not a laugh.",
  },
  {
    text: "My smart speaker heard me say 'I'm cold' and turned the heating up; my fridge heard me say 'I'm hungry' and ordered me a gym membership.",
    funny: 6,
    fresh: 6,
    specific: 5,
    fit: 6,
    note:
      "Two gadgets dilute it, second sentence in disguise, and the gym-membership gag is generic.",
  },
  {
    text: "The fridge's touchscreen shows me ads for yoghurt while the actual yoghurt inside expired in 2019.",
    funny: 7,
    fresh: 7,
    specific: 8,
    fit: 9,
    note:
      "Ads-on-appliances is a real, annoying behaviour and the 2019 contrast lands, but it is an observation more than a roast with a sting.",
  },
];

function score(c: Candidate): number {
  // The judge weighs the laugh first, freshness second, then specificity
  // and fit; mirror that order in the weights.
  return c.funny * 4 + c.fresh * 3 + c.specific * 2 + c.fit * 1;
}

function main(): void {
  const ranked = [...CANDIDATES].sort((a, b) => score(b) - score(a));
  for (const c of ranked) {
    console.log(
      `${String(score(c)).padStart(3)} | funny ${c.funny} fresh ${c.fresh} specific ${c.specific} fit ${c.fit} | ${c.text}`,
    );
    console.log(`     ${c.note}`);
  }

  const winner = ranked[0];
  const entry = winner.text;
  const length = [...entry].length; // code points, as the gate counts characters

  // Gate, checked before writing: UTF-8, 1-160 characters, not only whitespace.
  if (length < 1 || length > 160) {
    throw new Error(`Gate failed: entry is ${length} characters (must be 1-160).`);
  }
  if (entry.trim().length === 0) {
    throw new Error("Gate failed: entry is only whitespace.");
  }
  if (entry.includes("\n")) {
    throw new Error("Gate failed: entry must be a single line.");
  }
  // Must be encodable as UTF-8 (a JS string always is; confirm round-trip).
  if (Buffer.from(entry, "utf8").toString("utf8") !== entry) {
    throw new Error("Gate failed: entry is not valid UTF-8 text.");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", entry, "utf8");

  // Read it back and confirm byte-for-byte what the judge will see.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== entry) {
    throw new Error("Verification failed: file contents differ from the chosen entry.");
  }
  console.log(`\nWINNER (${length} chars): ${entry}`);
  console.log("Gate: PASS — wrote /output/entry.txt and verified by reading it back.");
}

main();
