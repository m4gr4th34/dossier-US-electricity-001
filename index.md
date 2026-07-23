An Open Dossier · **US-Electricity-001**

# The State of US Electricity

*Irfan Ali-Khan — Independent Researcher*

Working draft — research in progress. This dossier surveys the U.S. electricity system as a landscape, not a single thesis: where power comes from today, what new supply is arriving, and how fast demand is now rising after two flat decades. The discipline is a clean split — the measured present is asserted plainly and cited; every forward-looking number wears a forecast label with its model and assumptions named. Each card below carries an honest status. End it with: **Don't trust this paper — run it.**

## Avenues

| Avenue | Thesis | Status | Forecast | Sources |
|---|---|---|---|---|
| Grid-enhancing tech & reconductoring | Advanced conductors + GETs unlock large grid capacity on existing rights-of-way in months, not years — the cheapest, fastest fix for the bottleneck that actually binds; under-deployed for incentive/regulatory reasons, not technical ones. | ESTABLISHED | — | WATT2025, CGEP2026, PNAS2024 |
| Solar + storage (utility-scale) | Cheapest and quickest-to-deploy new generation; batteries convert it toward firm. The constraint is interconnection, not cost. | ESTABLISHED | — | LazardLCOE2026, EIA2025mix, EIASTEO2026 |
| Enhanced geothermal (EGS) | Firm, clean, 24/7 power from engineered hot-rock reservoirs using oil-and-gas drilling technique; first commercial-scale plant arriving now with a steep cost-down curve. | FORECAST | ~80% by Fervo Cape Station Phase 1 (100 MW) delivering to grid by end-2026; 500 MW by end-2028 | Fervo2026, Canary2026geo, WoodMac2026 |
| Nuclear restarts & uprates | Fastest firm CLEAN megawatts available today — restarting or uprating existing reactors — but capped to a handful of restartable sites. | ESTABLISHED | — | Constellation2025, WNN2024 |
| Onshore wind | Still among the cheapest new-build, but siting/permitting headwinds and a sharp LCOE rise are slowing additions. | ESTABLISHED | — | LazardLCOE2026, EIASTEO2026 |
| Natural gas CCGT | The incumbent firm bridge — indispensable near-term, but not clean, and now equipment-constrained: large-frame turbines are effectively sold out through 2030. | ESTABLISHED | — | GEV2026, LazardLCOE2026, IEEFA2025 |
| Nuclear SMRs | Potentially transformative firm clean power, but every first unit is a first-of-a-kind; no Western SMR is yet in commercial operation. | FORECAST | ~60% by a US SMR delivers commercial power to the grid by end-2030 (Kairos/Oklo/TerraPower) | WNN2024, EnergyGrowth2025, IEA_SMR2026 |
| Offshore wind | Real resource, hard path — most expensive mainstream new-build and highly exposed to policy reversal. | OPEN-CAVEATED | — | LazardLCOE2026, Dominion2025 |
| Fusion | Physics of net energy is settled; the open questions are engineering, cost, and timeline. A 2027 proof point is worth watching; grid-relevant scale is 2030s-plus. | OPEN-UNVERIFIED | — | CFS2026, FusionReport2026, IDTechEx2025 |
| Space-based solar power | Proven in principle (orbit-to-ground beaming demonstrated), but full-system economics remain decades out — a long-horizon hedge, not a near-term source. | REPORTED | — | Caltech2023, JAXA2026, SBSP2026 |

## Consistency checks

Results from `verification/verify_numbers.py` — the same checks the in-page console runs; CI reruns them on every commit.

- [PASS] Consistency: at least one avenue in the landscape
- [PASS] Consistency: every FORECAST has a dated signpost
- [PASS] Consistency: all forecast probabilities lie in [0,100]

**TOTAL: 3 checks · 3 pass · 0 fail** — All checks pass — the survey is internally consistent.

**THE CHAPTER · NARRATIVE**

## 01 THE FIELD, AND WHY SURVEY IT

The United States is not short of ways to make electricity. At the end of 2024, roughly 2,290 GW of generation and storage sat in the nation's interconnection queues (The line new power plants and storage projects wait in to connect to the grid. Before a project can plug in, the operator must study its impact on the network; today that study-and-upgrade process, not the cost of building the plant, is the main thing holding new capacity back.) — close to twice the entire installed fleet — waiting to connect [LBNL '25]. The binding constraints are not generation potential. They are connection, transmission, and, increasingly, the lead time on the equipment that makes power firm (Electricity a grid can count on around the clock regardless of weather — from nuclear, gas, geothermal, or storage paired with generation — as opposed to wind and solar, whose output rises and falls with conditions.).

But potential is not delivered power, and the queue has to be read carefully. That ~2,290 GW is mostly *proposed* projects, not built ones — historically only about 14% of queued capacity ever reaches operation — and it is overwhelmingly variable solar, wind, and storage, not firm capacity. So clearing the regulatory backlog and reconductoring the existing lines is necessary and high-leverage, but not sufficient on its own: the plants still have to be built, and firm sources are still needed to hold the system up when the wind drops and the sun sets. The reading to reject is **we already have enough built power, just plug it in** — the queue is a pipeline of hopefuls, not a warehouse of finished plants.

What makes this the moment to map the whole landscape is the other side of the ledger. After nearly two decades of flat consumption, U.S. electricity demand is growing again — and the growth is expected to be steep, with about half of it traced to data centers [Grid Strategies '25]. A field where supply potential is abundant but delivery is bottlenecked, and where demand has just turned sharply upward, is a field where sequencing matters more than any single breakthrough. That is what a survey — rather than one more result — is for.

*The country is not short of ways to make power. It is short of ways to connect it, move it, and firm it — and, for the first time in twenty years, short of time.*

## 02 PRESENT-STATE FOUNDATIONS

These are the present-state figures every avenue builds on, stated plainly and each with its source. As of this version they have been audited against their primary sources (ledger rows `C01`–`C06`) and are asserted as established; the single exception, flagged in place, is the precise power-sector emissions percentage, which is attributed to a secondary analysis rather than an official statistic. In 2025 the U.S. utility-scale generation mix ran natural gas at 41%, nuclear at 18%, and coal at 17% — coal now the third-highest source, behind gas and nuclear — followed by wind at 11%, solar at 7%, hydro at 6%, biomass at about 1%, geothermal under 1%, and petroleum at 0.7%. Fossil fuels together supplied about 58% and all renewables about 24%, on a record total near 4.43 trillion kWh — up roughly 2.8% on 2024 [EIA '26]. Wind and solar combined (18%) edged out coal (17%) for a second straight year, and power-sector emissions rose for a second consecutive year [EIA '26]. The precise figure most often quoted for that rise — roughly 4.4% — comes from the Distilled/Canary Media analysis of EIA data rather than an EIA-official statistic, and is recorded here as attributed, not asserted [Canary '26].

*(figure: 2025 US utility-scale generation mix — 2025 US utility-scale generation mix (EIA) — an audited, established figure: natural gas dominant, coal third, and wind+solar combined (18%) edging out coal (17%). Total 4.43 trillion kWh, a record.)*

On the demand side, Grid Strategies' National Load Growth Report forecasts that U.S. peak load is expected to grow by roughly 166 GW by 2030, with about 90 GW of that from data centers [Grid Strategies '25]. That the report projects this is now audited against the primary; whether the load actually materializes is the forecast, and its verifier is how the next few years resolve — but it is the best-documented estimate of the demand turn, and the direction is not in dispute.

The connection bottleneck is documented, not anecdotal: about 2,290 GW of capacity was active in interconnection queues at end-2024, against a historical completion rate near 14% and median waits around 55 months; a record ~112 GW of solar-plus-storage withdrew from the queues in 2024 alone [LBNL '25]. On cost, renewables are the cheapest new-build on an unsubsidized levelized-cost (The all-in cost of generating a unit of electricity over a plant's lifetime, in dollars per megawatt-hour, used to compare technologies on a common footing. It omits grid-integration and reliability value, so it is a starting point for comparison, not the whole story.) basis — utility solar about $40–98/MWh and onshore wind about $37–99/MWh, versus gas CCGT around $51–129 and nuclear around $175–255 — but costs are rising across every technology [Lazard '26].

Finally, the firm-power equipment squeeze is real and quantified: large-frame gas turbines are effectively sold out toward 2030, lead times have stretched to five to seven years, and equipment prices have climbed roughly 300% in three years [GE Vernova '26] [IEEFA '25]. The bridge fuel is now itself a queue.

## 03 THE AVENUES

The avenues read best as a chain of questions: each act opens with the question the last one raised and closes with the one the next must answer. Four acts, working outward from the wires to the frontier — and every avenue keeps its honest status label as it passes.

**ACT I · DEMAND IS BACK — CAN THE GRID SERVE IT?**

Demand has turned up after twenty flat years (§01–§02). The first question is the blunt one: can the grid physically serve it? The honest near-term answer is no — and the proof is that the grid is already throwing energy away. In 2024, roughly 20 million MWh of US wind and solar output was curtailed (Deliberately not producing available wind or solar power — ordering plants to throttle back — usually because the transmission lines out of a region are full, or because supply momentarily exceeds local demand. The energy is simply lost, not stored.) — deliberately not produced, largely because the transmission out of the windy and sunny regions was full [Amperon '26]. Four of the seven ISOs set curtailment records that year, and ERCOT alone curtailed more than 8 TWh [Modo Energy '25]. That 20-million-MWh national figure is an industry-analysis aggregate, recorded here as attributed; one clean primary-source slice sits underneath it — CAISO curtailed 3.4 million MWh of wind and solar in 2024, up 29% year over year, with congestion a primary driver [EIA TiE '25].

This reframes what new wires are for. New transmission capacity does not have to wait on new generation; it fills in sequence — claim `C22` in the ledger, an open argument. First, the currently-curtailed generation already spinning flows the moment the constraint lifts. Second, the queue projects whose only binding constraint was connection can finally plug in. Third, and only third, genuinely new build. Reconductoring, in this light, is the cork on generation that already exists. **Counter-view, equal prominence:** curtailment is concentrated in specific regions — West Texas, California — so reconductoring somewhere else does not tap it; some curtailment is oversupply rather than congestion, which more wires alone do not fix; and storage competes with wires as the cheaper cure for part of it. The argument is directional, not a guarantee.

### Grid-enhancing tech & reconductoring — Tier 1, established

Grid-enhancing technologies (Hardware and software — dynamic line ratings, power-flow controllers, and advanced reconductoring with high-capacity conductors — that squeeze more usable capacity out of transmission lines already in the ground, cheaply and quickly, instead of building new lines.) and advanced reconductoring unlock large capacity on existing rights-of-way in months, not years, at a fraction of new-line cost [Columbia CGEP '26]. This is the cheapest, fastest fix for the constraint that actually binds, and it is under-deployed for incentive and regulatory reasons, not technical ones — which is why it is asserted as established while its scale-up is tracked by a signpost: we expect ≥50 GW of incremental US grid capacity unlocked via GETs/advanced transmission tech by end-2028. Crucially, the capacity it frees does double duty — it uncorks the curtailed generation already spinning today *and* lets the connection-blocked queue plug in, value delivered before a single new plant is built.

*(figure: Reconductoring: the same towers carry 2–3× the power — Reconductoring adds capacity on existing rights-of-way in roughly 1–2 years, about 30–40% cheaper than new lines, with no new land or permitting — e.g. Salt River Project gained an ~80% capacity increase on a Phoenix line without replacing a single 1970s-era tower.)*

So the freed capacity fills first with what already exists. But the queue waiting behind it is overwhelmingly variable — solar, wind, and storage. Can variable power carry the growth?

**ACT II · CAN SOLAR AND WIND KEEP UP?**

Split the question in two, because the honest answer differs by axis. On *energy* — total megawatt-hours over a year — the answer is yes: solar and wind are the fastest, cheapest new generation and already supply the bulk of additions. On *shape* — delivering firm, around-the-clock power to an always-on AI load — the answer is no: batteries move sunlight a few hours, not across days or seasons.

### Solar + storage (utility-scale) — Tier 1, established

Utility-scale solar paired with batteries is the cheapest and quickest-to-deploy new generation, and storage steadily converts it toward firm delivery [EIA STEO '26]. The constraint is interconnection, not cost. The near-term marker we watch: a combined solar+wind share of US generation of ≥21% by end-2027.

### Onshore wind — Tier 2, established

Onshore wind remains among the cheapest new-build, but siting and permitting headwinds plus a sharp levelized-cost rise are slowing additions [EIA STEO '26]. It stays a workhorse rather than a growth engine; the marker we watch is simply that net US onshore wind additions remain positive through 2027.

**THE RATE QUESTION**

Start with the rates, because the whole question turns on them. Batteries — the piece that turns variable solar into something dispatchable — have gotten radically cheap: pack prices fell to about $108 per kWh on average in 2025, down roughly 93% since 2010, and stationary-storage packs reached about $70 per kWh, a 45% drop in a single year [BNEF '25]. Deployment is following: the US added 53 GW of capacity in 2025, its most since 2002, and 2026 plans a record 86 GW — 43.4 GW of solar (51%), 24 GW of batteries (28%), and just 6.3 GW of gas — with solar and storage together about 91% of the first quarter's additions [EIA '26]. But the momentum is policy-fragile: 2025 solar installations actually fell about 14% year-over-year on a tax-credit expiry and a cell shortage, US prices run about 44% above China's on tariffs and import dependence, and US operating solar-cell capacity is only around 3 GW [SEIA / WoodMac '26].

Against that supply sits the demand stack, and here the honest move is to show the disagreement rather than pick a number. US data centers used about 183 TWh in 2024; 2030 projections span a startling range — from roughly 200 TWh to more than 1,000 TWh, with the IEA's base case above 400 and Lawrence Berkeley's central estimate at 649 TWh, or 9.5 to 15.3% of all US electricity [LBNL '24] [IEA '25]. That 649-against-400-plus gap is not a rounding error; it is a genuine disagreement about how fast AI load compounds, recorded here as an attributed range, not a settled figure. EVs add a smaller, steadier climb, from about 18 TWh to roughly 113–131 TWh by 2030. Economy-wide, forecasters put total load growth anywhere from about 2.5% a year (Bank of America) to 3.5% (McKinsey).

*(figure: The race: new clean supply vs new demand, and a plausible 2035 mix — The race (left): at ~2026 build rates, new clean supply (solar ~95 + wind ~35 TWh/yr) roughly matches new demand (~115–150 TWh/yr) — ledger C31, our arithmetic. A plausible 2035 mix (right) is a FORECAST (C31): solar and wind carry ~33–38%, a nuclear-plus-geothermal floor ~15–18% covers the winter wall, and ~40% remains gas-and-residual. Batteries shift the day; the residual is the winter-and-firm problem.)*

> **FORECAST** — **Our arithmetic — the race:** take the middle of that demand range. At about 2.5% a year on a 4,430-TWh grid, new demand runs roughly 115 to 150 TWh a year. At 2026 build rates, new solar adds about 95 TWh a year and new wind about 35 — so new clean supply would roughly match new demand, and current record rates would hold renewables' *share* of the mix roughly flat. Displacing the existing ~58%-fossil fleet, rather than merely keeping pace, would require sustained additions well above today's records. Extrapolated to 2035, solar would reach about 20–25% of a 5,400–6,000-TWh grid and variable renewables 33–38% — but only if annual additions climb toward 70–80 GW. This is claim `C31`, our own arithmetic, not a published forecast. **Signposts:** US solar additions ≥55 GW/yr by 2028; stationary battery pack price ≤$50/kWh by 2028; solar ≥15% of US generation by 2030.

One asymmetry decides how far this can go. Firming a 25%-solar grid across a *day* — charge at noon, discharge at night — takes on the order of 1,500 GWh of cycling storage, which is well within reach at current cost trends. Firming it across a *winter* is a different universe: a single winter day of 2035 load is on the order of 15,000 GWh, and a dark, still week runs to roughly 100 TWh [deep-decarb lit.]. Lithium-ion never pencils for that. Batteries solve hours; they do not solve seasons — which is exactly why the day can go almost fully renewable while the winter still needs something firm.

> **OPEN-ARGUMENT** — **Where the cost curves point:** the shape the arithmetic keeps drawing is solar plus batteries plus a nuclear floor — solar and batteries taking the diurnal cycle at the lowest cost, nuclear and geothermal running flat as a ~15–20% clean-firm floor that covers the winter wall, and batteries, not reactors, doing the fast balancing. TerraPower's Natrium, with its built-in molten-salt thermal storage, is the industry building for exactly this division of labor. This is claim `C33`. **Counter-view, equal prominence:** extrapolated learning curves can break — on critical materials, tariffs, or interconnection limits; demand could overshoot every supply estimate here (the LBNL 649-TWh case); and the US may simply decline to un-tariff the Chinese cost curve, in which case the gas bridge extends instead of the clean fleet arriving. The architecture is where the trends point, not where policy is guaranteed to go.

On energy they keep up and then some; on shape they cannot — and now the number behind that is concrete: a dark, still winter week is on the order of 100 TWh of demand that no battery fleet will bridge. So what runs at 3 a.m. in January?

**ACT III · THE FIRM-POWER PROBLEM**

What runs at 3 a.m. in January is *firm* power, and it is the growth's hardest problem. Four candidates answer it, in ascending order of how far off they are: the incumbent bridge, the fastest clean megawatts, the emerging clean-firm workhorse, and the high-value bet.

### Natural gas CCGT — Tier 2, established

Combined-cycle gas is the incumbent firm bridge — indispensable near-term, but not clean, and now equipment-constrained: large-frame turbines are effectively sold out through 2030 [GE Vernova '26] [IEEFA '25]. The binding marker here is a constraint, not a hope: new-build CCGT turbine lead times are expected to remain ≥4 years through 2028. That sold-out order book is the trap — the obvious answer is the one you cannot buy in time.

### Nuclear restarts & uprates — Tier 1, established

Restarting or uprating existing reactors is the fastest firm CLEAN megawatt available today [World Nuclear News '24]. The avenue is established but capped to a handful of restartable sites, so it is a scalpel, not a lever. Its nearest concrete marker: the Crane Clean Energy Center (TMI Unit 1, 837 MW) is expected to return to commercial operation by 2028.

### Enhanced geothermal (EGS) — Tier 2, forward bet

Enhanced geothermal (A way to make geothermal power almost anywhere by drilling deep and engineering a reservoir in hot dry rock, then circulating water through it — borrowing the horizontal-drilling and fracturing techniques the shale oil-and-gas industry perfected.) would deliver firm, clean, 24/7 power from engineered hot-rock reservoirs, and the first commercial-scale plant is arriving now on a steep cost-down curve [Wood Mackenzie '26]. Because grid-scale delivery is not yet demonstrated, it is labeled a forecast, not a fact — but it is the clean-firm workhorse the shape problem most needs:

> **FORECAST** — **Labeled estimate:** ~80% — the drilling technique is proven and a lead developer is already building; the risk is schedule and reservoir performance at scale, not physics. **Signpost:** Fervo Cape Station Phase 1 (100 MW) delivering to grid by end-2026; 500 MW by end-2028.

### Nuclear SMRs — Tier 3, forward bet

Small modular reactors would be potentially transformative firm clean power, but every first unit is a first-of-a-kind (The first full-scale unit of a new design, which carries cost and schedule risk that later copies do not — because licensing, supply chain, and construction learning are all being done for the first time.), and no Western SMR is yet in commercial operation [IEA '26]. This is a forward bet, labeled as one:

> **FORECAST** — **Labeled estimate:** ~60% — multiple credible US programs are advancing, but first-of-a-kind cost and schedule risk is high and unproven at grid scale. **Signpost:** a US SMR delivers commercial power to the grid by end-2030 (Kairos/Oklo/TerraPower).

The longer-range reason some of these designs matter is the waste problem — and it is worth stating precisely, because it is usually stated wrong. A reactor's most stubborn hazard is not uranium but the *transuranics* — plutonium, americium, and their kin, with Pu-239's half-life around 24,000 years — created in fission [IAEA]. Untreated, spent fuel takes on the order of 100,000-plus years to decay back to the radiotoxicity of the ore it came from. The physics that could change that is specific: fast-spectrum neutrons can fission those transuranics; thermal-spectrum neutrons mostly cannot. In a closed fuel cycle — burn, recycle, burn again — fast reactors reduce the residual to a custody time of roughly 300 to 500 years (the IAEA puts it near 30 grams per kilogram needing 200–300 years; peer-reviewed equilibrium studies land close to 500) [Actinide recycling lit.].

*For a fractional premium at the reactor, the waste problem shrinks from a hundred millennia to three centuries — from a question for geology to a question for civil engineering.*

That shift matters because the status quo is not free. Because the US never opened a permanent repository, taxpayers already pay utilities up to about $800 million a year in damages for storing spent fuel on-site — roughly $11.1 billion paid since 1998, and a liability the Department of Energy's Inspector General projects will reach about $44.5 billion [GAO '21]. More than 95,000 metric tons of spent fuel sit stranded at 79 sites across 39 states; about $15 billion was sunk into Yucca Mountain before it was shelved, and roughly $37 billion in the ratepayer-funded Nuclear Waste Fund sits unused [CRS RL33461] [CNBC '25]. State it plainly: the long-lived-waste status quo is already a multi-tens-of-billions liability — but in the same breath, that is the price of the political failure to open any repository, not an intrinsic per-year cost of long half-lives.

*(figure: Radiotoxic lifetime: conventional spent fuel vs a fast-reactor closed cycle — On a log scale, the fast-reactor closed-cycle bar (≈300–500 years) ends before all of recorded history begins; conventional spent fuel runs about 20x past it, to ~100,000 years. The short bar ASSUMES the sustained closed cycle of claim C19 (OPEN-CAVEATED) — reprocessing that does not yet exist commercially in the US; without it, a fast reactor alone does not shrink the clock.)*

Here is the distinction the headlines blur. *Molten salt* is a choice of coolant and fuel form; *fast spectrum* is a choice of neutron speed — and the waste benefit follows the spectrum, not the salt [IEA '26]. That matters for reading the field. Kairos, the salt-cooled US front-runner, is a *thermal* design: no waste-lifetime benefit — and the same holds for the other near-term SMRs, NuScale's VOYGR, GE-Hitachi's BWRX-300, and X-energy's Xe-100. The fast-spectrum US designs on a near horizon are different reactors altogether: Oklo's Aurora (15 MW, sodium-cooled, at Idaho National Lab, first unit targeted around 2028) and TerraPower's Natrium (345 MWe, sodium-cooled, at Kemmerer, Wyoming, around 2030). Fast *molten-salt* designs do exist — TerraPower's MCFR, Moltex's SSR-W — but sit further out.

> **FORECAST** — **Labeled estimate:** a fast-spectrum US reactor would shrink the waste clock to centuries — but only with the piece the headlines omit. The ~300–500-year figure requires reprocessing and a SUSTAINED closed cycle: burn, recycle, burn again. First units run once-through, and the US has no commercial reprocessing today (Oklo is building a fuel-recycling line). So a fast SMR alone does not shrink the clock; a fast SMR plus recycling infrastructure would. This is claim `C19`. **Signpost:** a US fast-spectrum reactor plus a recycling pathway demonstrates commercial-scale operation with waste custody-time reduced to the order of centuries, by 2035.

On cost, the honest answer is a shrug with a direction. The identifiable fast-design deltas are real: HALEU fuel — enriched to about 19%, needing roughly 2.5 to 3 times the natural uranium per kilowatt-hour and currently scarce — plus sodium handling and longer Gen-IV licensing [Natrium / DOE]. Natrium's first-of-a-kind price is about $4 billion for 345 MW, near $11,600 per kW, roughly half of it DOE-funded. But first-of-a-kind noise swamps the spectrum effect — the cancelled NuScale *thermal* project reached about $20,000 per kW — so the claim stays bounded: a fast-versus-thermal premium is expected, through fuel and licensing, but its magnitude is not yet demonstrated. FOAK SMRs generally land around $80–150/MWh, with $50–80 NOAK targets. This is claim `C25`, **OPEN-CAVEATED**. **Counter-view, equal prominence:** critics — the Union of Concerned Scientists among them — argue the HALEU uranium intensity, the proliferation exposure of reprocessing, and unproven economics could erase the advantage entirely [UCS '25].

Three different *2–3×* figures orbit this technology, and conflating them is how the fast-costs-double myth forms — so pin each one down. The Natrium-versus-NuScale gap above is not a fast-vs-thermal ratio in either direction; it is first-of-a-kind noise on two non-comparable projects — one thermal design killed after a decade of overruns, one fast design still pre-completion and roughly half DOE-funded. The [UCS '25] 2–3× figure is a levelized-cost comparison of a microreactor against a larger SMR — a *size* effect, and it touches Oklo's Aurora because Aurora is *micro*, not because it is fast. And the 2.5–3× above is HALEU's natural-uranium *input* per kilowatt-hour; because fuel is a minor share of nuclear's cost — capital dominates — even a 3× fuel input moves the total by dollars per MWh, not by multiples, and HALEU's sharper near-term bite is availability and schedule risk, not a clean price multiplier. So the expected premium stays what the ledger scopes it to: meaningful but fractional — not multiples — and no honest fast-vs-thermal ratio exists until comparable units on both sides finish construction.

> **OPEN-ARGUMENT** — **The question worth posing:** if a fractional fast-spectrum premium buys a reduction of two to three orders of magnitude in custody time, and the status quo already costs tens of billions, then the right frame is a total-system comparison — the reactor premium plus reprocessing set against the avoided storage liability — and it deserves to be run. **Counter-view, equal prominence** [MIT '11]: a closed cycle still needs a repository — shorter custody, but the same facility — and repository cost is driven more by heat load, volume, and politics than by raw half-life; every major fuel-cycle economics study, and French practice, has found closed cycles net more expensive than once-through even after crediting disposal savings; and disposal is a small share of nuclear's levelized cost — the historical US fee was about 1 mill per kilowatt-hour, roughly $1/MWh — so the avoided-cost pool is smaller than it looks, while the $44.5 billion liability is a political-failure cost a fast fleet would not automatically retire. This is claim `C27`. Whether it nets out cheaper has never been priced against a US status quo this expensive — the comparison is posed here, not settled.

**THE MAKER QUESTION**

One more question closes this act, and it is not about physics. Twice now the US has watched a clean-energy manufacturing wave form and break somewhere else. In solar, China holds more than 80% of every stage of the supply chain — 98% of wafers, 92% of cells, 85% of finished panels [IEA]. The scale gap lands hardest as a single comparison: China added roughly 280 GW of solar in 2025, more than the entire cumulative installed US solar base of about 190 GW [Ember '25]. In batteries the pattern repeated — China makes about 75% of the world's lithium-ion cells, and CATL and BYD together account for more than 55% of the market [Wood Mackenzie '26]. Set that beside claim `C28`: the US pays about 44% above Chinese battery prices on a domestic cell base of roughly 3 GW. That is the worst quadrant to occupy — a consumer of both waves, paying a maker's premium without a maker's industry.

*(figure: Three waves: who owns the factory — The scoreboard, not the thesis. Waves 1 and 2 are ESTABLISHED and closed (ledger C34): China owns the solar and battery factories. Wave 3 is ESTABLISHED as a scoreboard too (C35) — the first-deployment race is lost — but the row is marked window OPEN only in the narrow sense that the next-wave supply chain is not yet owned by anyone. Whether the US should or could take it is the OPEN-ARGUMENT of claim C36, argued in the text, not asserted by this figure.)*

Wave three is advanced nuclear, and the honest scoreboard is mixed. The first-deployment race is already decided, and the US lost it: China's Linglong One, a 125 MWe land-based unit, enters commercial service in the first half of 2026 as the world's first commercial land-based SMR, built in 58 months; China's HTR-PM has run commercially since 2023, and Russia's floating plant since 2020 [WNN / CNNC '26]. The US has no operating SMR at all. What the US does hold is the rest of the board: the largest portfolio of advanced designs — including the fast-spectrum reactors of claims `C19` and `C24` — the deepest public and private capital (more than $10 billion in federal support since 2020, and a $700 million private round for X-energy alone), and the strongest demand pull on earth in the data-center build-out [SMR Intel '26]. The chokepoint is fuel: Russia dominates HALEU production, Centrus is building the first US enrichment cascade at Piketon targeting 6 metric tons a year within 42 months, and as of early 2025 more than half of HALEU-dependent SMR projects had no binding fuel supply [Centrus '26].

> **OPEN-ARGUMENT** — **The maker question:** the lesson of waves one and two is that whoever owns the factory owns the learning curve — the cost declines accrue to the manufacturer, not to the customer. The contest still winnable is therefore not *first SMR*, which is lost, but the next-wave manufacturing ecosystem: fast-spectrum reactors, HALEU enrichment, fuel recycling, and factory fabrication — a chain no nation yet owns. The corrective framing matters: the winnable contest is *becoming* the maker of the next wave, not *remaining* one. On this argument, a deliberate public investment across that chain, on national-security grounds, is how the US changes quadrant. This is claim `C36`. **Counter-view, equal prominence:** industrial policy has a picking-winners failure mode, and NuScale is the recent domestic precedent; China's execution tempo and its IAEA-certified export machine may capture the market regardless of who leads on design; and the consumer position carries real consumer-surplus value if tariffs do not destroy it. Note what the counter-view does not defend: the status quo — consumer *and* premium — is the one position with no defenders. **Signposts:** Centrus Piketon delivering ≥6 MTU/yr of HALEU by 2030; cumulative US SMR order book ≥5 GW by 2030.

Each of these firm-clean answers is either capped, unbuilt, or first-of-a-kind — and none of them is yet something the US manufactures at scale. If none of them scales in time — what are the long-shots?

**ACT IV · THE FRONTIER BETS**

The long-shots are the frontier bets: real physics and real programs, but hedges rather than plans, and honest about the timescale — years for the first three questions, decades for these.

### Offshore wind — Tier 4, open-caveated

Offshore wind is a real resource on a hard path: the most expensive mainstream new-build and highly exposed to policy reversal [Lazard '26]. It is established that the resource and the engineering work; what is **OPEN-CAVEATED** is whether the current US pipeline reaches operation on schedule under present policy — defensible as a directional expectation (~45%), not a firm prediction. The concrete test is whether Coastal Virginia Offshore Wind (~2.6 GW) reaches full commercial operation on its stated schedule [Dominion '25].

### Fusion — Tier 4, open question

Fusion's net-energy physics is settled; the open questions are engineering, cost, and timeline, and grid-relevant scale is 2030s-plus [FIA '26]. A near-term proof point is worth watching, and we mark it honestly as an open, unverified claim:

> **OPEN-UNVERIFIED** — **Honest label:** whether a private device demonstrates net energy gain on its stated near-term schedule is unverified. This is claim `C15` in the public ledger and an open challenge — the first person to confirm or refute it gets named credit in the next version. **Signpost:** CFS SPARC demonstrates net energy gain (Q>1) by end-2027.

### Space-based solar power — long-horizon, reported

Orbit-to-ground power beaming has been demonstrated in principle, but full-system economics remain decades out. It belongs in the survey as a long-horizon hedge, recorded with its provenance marked plainly:

> **REPORTED** — **Non-independent source:** the case rests largely on agency and industry roadmaps (e.g. JAXA and space-solar programs), alongside the Caltech SSPD-1 experiment, which detectably beamed power to Earth as a proof of concept [Caltech '23]. The mundane counterpoint, given equal prominence: launch mass, in-orbit assembly, and beaming efficiency put grid-relevant, revenue-generating delivery decades — not years — away, and no independent techno-economic analysis places it inside this decade. It is recorded for completeness; it is NOT the author's claim and gets no vote on any other claim's status.

## 04 WHAT WOULD SETTLE THE OPEN QUESTIONS

Gathered in one place, the signposts turn this survey from a snapshot into an instrument — each names the dated event that would move an avenue from open to settled. Enhanced geothermal: Fervo Cape Station delivering 100 MW to the grid by end-2026, and 500 MW by end-2028. Nuclear SMRs: the first US small modular reactor delivering commercial power to the grid by end-2030. Fusion: CFS SPARC demonstrating net energy gain (Q>1) by end-2027. Natural gas: any easing of turbine lead times back below four years — the sign the firm-equipment squeeze is breaking. And grid-enhancing tech: gigawatts of capacity demonstrably unlocked on existing rights-of-way, on the way to ≥50 GW by end-2028. Each is falsifiable, dated, and public.

## 05 SYNTHESIS

The ranking is the four acts restated: unclog, fill cheap, firm it, hedge. One axis it does not price is who builds the machines — the maker question of claim `C36` cuts across every tier: the sequencing lens says what to build first, not who profits from building it.

*(figure: Cost vs speed-to-deploy — a sequencing lens — A sequencing lens: the most promising options are cheap, fast, and clean or firm — the lower-left, weighted toward clearing the connection bottleneck. It deliberately mixes AUDITED present costs (near-term avenues, near the midpoints of the Lazard ranges) with FORWARD, uncertain estimates; fusion and space-based solar sit in the cost-not-yet-demonstrated band with no plotted $/MWh. This is an OPEN-ARGUMENT sequencing lens, not a claim that any one technology wins.)*

This ranking is a sequencing lens, not a claim about which technology wins. Change the criterion and the order moves: weight for deep decarbonization and firm nuclear climbs; weight for energy security and domestic gas holds Tier 1; weight for cost alone and solar stands nearly by itself. The counter-view deserves equal prominence — a reader who believes transmission reform will stall, or that data-center demand is overstated, would reasonably down-rank the whole premise that speed-to-connect is the master variable. And it bears repeating that speed-to-connect is necessary, not sufficient: the ~2,290 GW queue is mostly proposed, variable projects — only about 14% of queued capacity historically gets built — so reconductoring and permitting reform buy headroom, but the firm plants still have to be built. The ordering is offered as a way to think about order-of-operations, not as a verdict, which is why it sits in the ledger as an open, caveated argument rather than a finding.

*Don't trust this paper — run it.*

## References

- **LBNL '25** — Rand, J., Seel, J. et al. — Lawrence Berkeley National Laboratory (2025). Queued Up: ~2,290 GW of generation+storage in US interconnection queues at end-2024 (~2x the installed fleet), ~14% historical completion, ~55-month median waits. *LBNL, Queued Up (2025), emp.lbl.gov/queues*

- **Grid Strategies '25** — Grid Strategies LLC (Nov 2025). National Load Growth Report: forecasts ~166 GW of US peak-load growth by 2030, roughly 90 GW from data centers — the best-documented estimate of the demand turn (audited against the primary as what the report projects; realization remains a forecast). *Grid Strategies LLC, National Load Growth Report, Nov 2025, gridstrategiesllc.com*

- **EIA '26** — U.S. Energy Information Administration (2025 data). Audited against the EIA primary: the 2025 US utility-scale generation mix (gas 41%, nuclear 18%, coal 17%, wind 11%, solar 7%, hydro 6%, remainder biomass/geothermal/petroleum), a record ~4.43 trillion kWh total, and wind+solar (18%) edging out coal (17%) for a second year. *EIA, 'Electricity in the U.S.' (2025 data), eia.gov/energyexplained/electricity/electricity-in-the-us.php*

- **Canary '26** — Canary Media / Distilled (2026). Secondary analysis of EIA data; the precise ~4.4% figure for the 2025 power-sector emissions rise is theirs and is recorded here as attributed, not as an EIA-official statistic. The direction (emissions up a second year, coal uptick) is EIA-consistent. *Canary Media / Distilled analysis of EIA data (2026), canarymedia.com*

- **Lazard '26** — Lazard (2026). Levelized Cost of Energy+: unsubsidized LCOE ranges placing utility solar and onshore wind as cheapest new-build vs gas CCGT and nuclear, with costs rising across the board. *Lazard, Levelized Cost of Energy+ (2026), lazard.com*

- **GE Vernova '26** — GE Vernova (2026). Disclosures on large-frame gas-turbine backlog and lead times — order slots effectively reserved toward 2030 as demand for firm capacity surges. *GE Vernova investor disclosures (2026), gevernova.com*

- **IEEFA '25** — Institute for Energy Economics and Financial Analysis (2025). Analysis of gas-turbine market tightness: five-to-seven-year lead times and roughly 300% price escalation for new-build CCGT equipment over three years. *IEEFA (2025), ieefa.org*

- **Amperon '26** — Amperon (2026). Industry analysis aggregating 2024 US renewable curtailment: roughly 20 million MWh of wind+solar output deliberately not produced, largely because transmission was full, with four of seven ISOs setting records. Recorded here as an attributed industry aggregate, not a single reproducible primary. *Amperon curtailment analysis (2026), amperon.co*

- **Modo Energy '25** — Modo Energy (2025). Analysis of ERCOT 2024 curtailment: more than 8 TWh of wind and solar curtailed in Texas alone as transmission out of West Texas saturated — the single largest ISO contributor to the national total. *Modo Energy, ERCOT curtailment analysis (2025), modoenergy.com*

- **EIA TiE '25** — U.S. Energy Information Administration — Today in Energy (May 2025). Primary-source figure: CAISO curtailed 3.4 million MWh of wind and solar in 2024, up 29% year-over-year, with grid congestion a primary driver — the EIA-verified slice under the national curtailment aggregate. *EIA, Today in Energy (May 2025), eia.gov/todayinenergy*

- **Columbia CGEP '26** — Columbia University Center on Global Energy Policy (2026). Analysis of grid-enhancing technologies and advanced reconductoring as fast, low-cost capacity on existing rights-of-way, under-deployed for incentive/regulatory reasons rather than technical ones. *Columbia CGEP (2026), energypolicy.columbia.edu*

- **EIA STEO '26** — U.S. Energy Information Administration (2026). Short-Term Energy Outlook: near-term projections for the combined solar+wind share of US generation and for renewable capacity additions. *EIA, Short-Term Energy Outlook (2026), eia.gov/outlooks/steo*

- **BNEF '25** — BloombergNEF (December 2025). Annual battery price survey: pack prices fell to a $108/kWh average in 2025 (down ~93% since 2010) and stationary-storage packs to ~$70/kWh (−45% in a year); China averaged ~$84/kWh (lowest ~$36/kWh cell, ~$50/kWh pack), with North American prices ~44% higher on tariffs and import dependence. *BloombergNEF, 2025 Battery Price Survey (Dec 2025), bnef.com*

- **EIA '26** — U.S. Energy Information Administration (Feb 2026). Preliminary monthly electric generator inventory: 53 GW added in 2025 (largest since 2002); 2026 plans a record 86 GW — solar 43.4 GW (51%), batteries 24 GW (28%), gas 6.3 GW; solar+storage ~91% of Q1-2026 planned additions. *EIA, Preliminary Monthly Electric Generator Inventory (Feb 2026), eia.gov/electricity*

- **SEIA / WoodMac '26** — SEIA / Wood Mackenzie (2026). US Solar Market Insight: 2025 solar installations fell ~14% year-over-year on the tax-credit expiry and a solar-cell shortage, and US operating solar-cell manufacturing capacity is only ~3 GW — momentum that is real but policy-fragile. *SEIA / Wood Mackenzie, US Solar Market Insight (2026), seia.org*

- **LBNL '24** — Shehabi, A. et al. — Lawrence Berkeley National Laboratory (2024). 2024 United States Data Center Energy Usage Report: US data centers used ~183 TWh in 2024, with a central 2030 projection of ~649 TWh (~9.5–15.3% of US electricity) — the central point in a wide, disputed forecast range. *LBNL, 2024 US Data Center Energy Usage Report, eta.lbl.gov*

- **IEA '25** — International Energy Agency (2025). Electricity 2025 / Energy and AI: base-case US data-center demand projected above ~400 TWh by 2030, at the lower end of a range other analysts push past 1,000 TWh — the projections disagree by a factor of several. *IEA, Electricity 2025 / Energy and AI (2025), iea.org*

- **deep-decarb lit.** — Deep-decarbonization storage literature (firm-resource convention). Grid-modeling studies converge on an order-of-magnitude split: daily firming of a ~25%-solar grid needs O(1,500 GWh) of cycling storage, but seasonal firming (a winter day ~15,000 GWh, a dark week ~100 TWh) is orders larger — lithium-ion does not pencil for it, so a clean-firm floor is needed. *Sepulveda/Jenkins-type firm-low-carbon-resource studies (Joule 2018 and successors)*

- **World Nuclear News '24** — World Nuclear News (2024). Reporting on US reactor restarts and uprates, including the Crane Clean Energy Center (Three Mile Island Unit 1) restart plan and schedule. *World Nuclear News (2024), world-nuclear-news.org*

- **Wood Mackenzie '26** — Wood Mackenzie (2026). Market analysis of enhanced-geothermal cost trajectories and deployment outlook as the first commercial-scale plants come online. *Wood Mackenzie (2026), woodmac.com*

- **IEA '26** — International Energy Agency (2026). Assessment of small modular reactor economics and timelines, underscoring first-of-a-kind risk and that no Western SMR is yet in commercial operation. *IEA, nuclear / SMR outlook (2026), iea.org*

- **IAEA** — International Atomic Energy Agency — IAEA Bulletin. Establishes the physics of the long-lived-waste problem: the transuranics created in fission (Pu-239 half-life ~24,000 yr) drive spent fuel's 100,000+ year radiotoxicity, and a closed fuel cycle leaves roughly 30 g per kg needing only ~200–300 years of custody. *IAEA Bulletin, waste-management / partitioning-and-transmutation articles, iaea.org*

- **Actinide recycling lit.** — Peer-reviewed actinide-recycling literature (Progress in Nuclear Energy et al.). Equilibrium closed-fuel-cycle studies find the residual waste's dangerous custody time falls to on the order of 500 years once transuranics are repeatedly recycled and fissioned in a fast spectrum — the basis for the ~300–500-year figure. *Progress in Nuclear Energy and related actinide-transmutation studies (fast-reactor closed cycle)*

- **GAO '21** — U.S. Government Accountability Office (2021). GAO-21-603 on commercial spent nuclear fuel: with no permanent repository, the federal government pays utilities damages for on-site storage — on the order of hundreds of millions per year and billions to date — a liability that keeps growing until a repository opens. *GAO-21-603, Commercial Spent Nuclear Fuel (2021), gao.gov*

- **CRS RL33461** — Congressional Research Service — RL33461. CRS report on civilian nuclear-waste disposal: the ~$37B ratepayer-funded Nuclear Waste Fund, the ~$15B spent on Yucca Mountain before it was shelved, and the 95,000+ metric tons of spent fuel stranded at reactor sites across the country. *CRS RL33461, Civilian Nuclear Waste Disposal, crsreports.congress.gov*

- **CNBC '25** — CNBC / DOE Office of Inspector General (2025). Reporting on the DOE Inspector General projection that the federal spent-fuel storage liability reaches roughly $44.5 billion — ~$11.1B already paid to utilities since 1998, up to ~$800M/yr in ongoing damages. *CNBC reporting on DOE-IG audit figures (2025), cnbc.com*

- **Natrium / DOE** — TerraPower Natrium project reporting (2024–2026). First-of-a-kind Natrium (345 MWe, sodium-cooled, Kemmerer WY) reported near $4 billion (~$11.6k/kW), roughly half DOE cost-shared; used here to bound fast-design cost, alongside HALEU-fuel and Gen-IV-licensing deltas. *TerraPower / DOE Advanced Reactor Demonstration Program disclosures, terrapower.com*

- **UCS '25** — Union of Concerned Scientists (2025). Critique of advanced-reactor claims: HALEU uranium intensity, proliferation exposure of reprocessing, and unproven first-of-a-kind economics — the counter-view that a fast-vs-thermal cost premium could erase the waste advantage. *Union of Concerned Scientists, advanced-nuclear analysis (2025), ucsusa.org*

- **MIT '11** — Massachusetts Institute of Technology (2011). The Future of the Nuclear Fuel Cycle: an interdisciplinary study finding that once-through cycles are more economic than closed (reprocessing) cycles under prevailing assumptions even after crediting disposal savings — the counter-view to the total-system 'worth it' argument. *MIT, The Future of the Nuclear Fuel Cycle (2011), energy.mit.edu*

- **IEA** — International Energy Agency — Solar PV Global Supply Chains. China holds more than 80% of every stage of solar manufacturing — about 98% of wafers, 92% of cells, and 85% of finished panels — a concentration greater than any other strategic energy technology. *IEA, Solar PV Global Supply Chains, iea.org*

- **Ember '25** — Ember (2025). Global solar deployment tracking: China added roughly 280 GW of solar in 2025 alone — more than the entire cumulative installed US solar base of about 190 GW. *Ember, global electricity / solar deployment data (2025), ember-energy.org*

- **Wood Mackenzie '26** — Wood Mackenzie / battery-market reporting (2026). China manufactures roughly 75% of the world's lithium-ion cells, with CATL and BYD together accounting for more than 55% of the global market — the same concentration pattern solar showed a decade earlier. *Wood Mackenzie battery supply-chain analysis (2026), woodmac.com*

- **WNN / CNNC '26** — World Nuclear News / CNNC (2026). China's Linglong One (ACP100, 125 MWe) enters commercial service in H1 2026 as the world's first land-based commercial SMR, built in 58 months; China's HTR-PM has run commercially since 2023 and Russia's floating plant since 2020. *World Nuclear News / CNNC project reporting (2026), world-nuclear-news.org*

- **SMR Intel '26** — SMR industry intelligence (2026). Scorecard of the advanced-reactor race: the US holds the largest portfolio of advanced designs, the deepest public and private capital (more than $10B federal since 2020; a $700M private round for X-energy), and the strongest demand pull from data centers — but no operating SMR. *smrintel advanced-reactor market tracking (2026)*

- **Centrus '26** — Centrus Energy / HALEU supply reporting (2026). The fuel chokepoint: Russia dominates HALEU production, Centrus is building the first US enrichment cascade at Piketon targeting 6 metric tons of HALEU per year within 42 months, and more than half of HALEU-dependent SMR projects had no binding fuel supply as of early 2025. *Centrus Energy disclosures / HALEU supply-chain reporting (2026), centrusenergy.com*

- **Dominion '25** — Dominion Energy (2025). Project filings and construction updates for Coastal Virginia Offshore Wind (~2.6 GW), the largest US offshore wind project under construction, and its stated schedule. *Dominion Energy, CVOW disclosures (2025), coastalvawind.com*

- **FIA '26** — Fusion Industry Association (2026). Annual survey of private fusion developers — capital raised, milestones, and stated net-energy and pilot-plant timelines — the landscape against which SPARC's signpost sits. *Fusion Industry Association, The Global Fusion Industry (2026), fusionindustryassociation.org*

- **Caltech '23** — California Institute of Technology, Space Solar Power Project (2023). The MAPLE experiment aboard SSPD-1 demonstrated wireless power transfer in orbit and detectably beamed power to Earth — proof of principle, not system economics. *Caltech Space Solar Power Project (2023), spacesolar.caltech.edu*
