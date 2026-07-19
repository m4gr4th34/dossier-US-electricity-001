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

What makes this the moment to map the whole landscape is the other side of the ledger. After nearly two decades of flat consumption, U.S. electricity demand is growing again — and the growth is expected to be steep, with about half of it traced to data centers [Grid Strategies '24]. A field where supply potential is abundant but delivery is bottlenecked, and where demand has just turned sharply upward, is a field where sequencing matters more than any single breakthrough. That is what a survey — rather than one more result — is for.

*The country is not short of ways to make power. It is short of ways to connect it, move it, and firm it — and, for the first time in twenty years, short of time.*

## 02 ESTABLISHED FOUNDATIONS

These are the present-state figures every avenue builds on, stated plainly and each with its source — with one honesty note attached before the numbers. These six are **SOURCED-PENDING** anchors (ledger rows `C01`–`C06`): sourced and recorded here, but not asserted as established until the Phase 3 citation audit checks each against its primary source. The figures stand exactly as given; only their verification label is provisional. In 2025 the U.S. generation mix ran natural gas at about 41%, nuclear about 18%, coal about 15%, wind about 10%, solar about 7%, hydro about 5%, and other renewables about 2%, on a record total near 4.43 trillion kWh — up roughly 2.8% on the year [EIA '26]. Wind and solar together outproduced coal for a second consecutive year, even as power-sector CO2 rose about 4.4% on a coal uptick [Canary '26].

On the demand side, Grid Strategies forecasts that U.S. peak load is expected to grow by roughly 166 GW by 2030, with about 90 GW of that from data centers [Grid Strategies '24]. That figure is a labeled projection, not a measured fact — its verifier is how the next few years actually resolve — but it is the best-documented estimate of the demand turn, and the direction is not in dispute.

The connection bottleneck is documented, not anecdotal: about 2,290 GW of capacity was active in interconnection queues at end-2024, against a historical completion rate near 14% and median waits around 55 months; a record ~112 GW of solar-plus-storage withdrew from the queues in 2024 alone [LBNL '25]. On cost, renewables are the cheapest new-build on an unsubsidized levelized-cost (The all-in cost of generating a unit of electricity over a plant's lifetime, in dollars per megawatt-hour, used to compare technologies on a common footing. It omits grid-integration and reliability value, so it is a starting point for comparison, not the whole story.) basis — utility solar about $40–98/MWh and onshore wind about $37–99/MWh, versus gas CCGT around $51–129 and nuclear around $175–255 — but costs are rising across every technology [Lazard '26].

Finally, the firm-power equipment squeeze is real and quantified: large-frame gas turbines are effectively sold out toward 2030, lead times have stretched to five to seven years, and equipment prices have climbed roughly 300% in three years [GE Vernova '26] [IEEFA '25]. The bridge fuel is now itself a queue.

## 03 THE AVENUES

Each avenue is walked in turn and labeled exactly as strongly as its evidence allows: what it costs, how fast it can launch, and — where the avenue is a forward bet — the dated, falsifiable signpost that will later mark it right or wrong.

### Grid-enhancing tech & reconductoring — Tier 1, established

Grid-enhancing technologies (Hardware and software — dynamic line ratings, power-flow controllers, and advanced reconductoring with high-capacity conductors — that squeeze more usable capacity out of transmission lines already in the ground, cheaply and quickly, instead of building new lines.) and advanced reconductoring unlock large capacity on existing rights-of-way in months, not years, at a fraction of new-line cost [Columbia CGEP '26]. This is the cheapest, fastest fix for the constraint that actually binds, and it is under-deployed for incentive and regulatory reasons, not technical ones — which is why it is asserted as established while its scale-up is tracked by a signpost: we expect ≥50 GW of incremental US grid capacity unlocked via GETs/advanced transmission tech by end-2028.

### Solar + storage (utility-scale) — Tier 1, established

Utility-scale solar paired with batteries is the cheapest and quickest-to-deploy new generation, and storage steadily converts it toward firm delivery [EIA STEO '26]. The constraint is interconnection, not cost. The near-term marker we watch: a combined solar+wind share of US generation of ≥21% by end-2027.

### Enhanced geothermal (EGS) — Tier 2, forward bet

Enhanced geothermal (A way to make geothermal power almost anywhere by drilling deep and engineering a reservoir in hot dry rock, then circulating water through it — borrowing the horizontal-drilling and fracturing techniques the shale oil-and-gas industry perfected.) would deliver firm, clean, 24/7 power from engineered hot-rock reservoirs, and the first commercial-scale plant is arriving now on a steep cost-down curve [Wood Mackenzie '26]. Because grid-scale delivery is not yet demonstrated, it is labeled a forecast, not a fact:

> **FORECAST** — **Labeled estimate:** ~80% — the drilling technique is proven and a lead developer is already building; the risk is schedule and reservoir performance at scale, not physics. **Signpost:** Fervo Cape Station Phase 1 (100 MW) delivering to grid by end-2026; 500 MW by end-2028.

### Nuclear restarts & uprates — Tier 1, established

Restarting or uprating existing reactors is the fastest firm CLEAN megawatt available today [World Nuclear News '24]. The avenue is established but capped to a handful of restartable sites, so it is a scalpel, not a lever. Its nearest concrete marker: the Crane Clean Energy Center (TMI Unit 1, 837 MW) is expected to return to commercial operation by 2028.

### Onshore wind — Tier 2, established

Onshore wind remains among the cheapest new-build, but siting and permitting headwinds plus a sharp levelized-cost rise are slowing additions [EIA STEO '26]. It stays a workhorse rather than a growth engine; the marker we watch is simply that net US onshore wind additions remain positive through 2027.

### Natural gas CCGT — Tier 2, established

Combined-cycle gas is the incumbent firm bridge — indispensable near-term, but not clean, and now equipment-constrained: large-frame turbines are effectively sold out through 2030 [GE Vernova '26] [IEEFA '25]. The binding marker here is a constraint, not a hope: new-build CCGT turbine lead times are expected to remain ≥4 years through 2028.

### Nuclear SMRs — Tier 3, forward bet

Small modular reactors would be potentially transformative firm clean power, but every first unit is a first-of-a-kind (The first full-scale unit of a new design, which carries cost and schedule risk that later copies do not — because licensing, supply chain, and construction learning are all being done for the first time.), and no Western SMR is yet in commercial operation [IEA '26]. This is a forward bet, labeled as one:

> **FORECAST** — **Labeled estimate:** ~60% — multiple credible US programs are advancing, but first-of-a-kind cost and schedule risk is high and unproven at grid scale. **Signpost:** a US SMR delivers commercial power to the grid by end-2030 (Kairos/Oklo/TerraPower).

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

Read against a single criterion — the fastest clean, firm, scalable megawatts per dollar, weighted toward clearing the bottleneck that actually binds — the landscape falls into a loose ordering. Tier 1 is the near-term workhorses: grid-enhancing tech and reconductoring, solar-plus-storage, and nuclear restarts. Tier 2 is the solid supporting cast: enhanced geothermal, onshore wind, and gas CCGT. Tier 3 is the high-value forward bet, SMRs. Tier 4 is the long-horizon and unproven: offshore wind, fusion, and space-based solar.

This ranking is a sequencing lens, not a claim about which technology wins. Change the criterion and the order moves: weight for deep decarbonization and firm nuclear climbs; weight for energy security and domestic gas holds Tier 1; weight for cost alone and solar stands nearly by itself. The counter-view deserves equal prominence — a reader who believes transmission reform will stall, or that data-center demand is overstated, would reasonably down-rank the whole premise that speed-to-connect is the master variable. The ordering is offered as a way to think about order-of-operations, not as a verdict, which is why it sits in the ledger as an open, caveated argument rather than a finding.

*Don't trust this paper — run it.*

## References

- **LBNL '25** — Rand, J., Seel, J. et al. — Lawrence Berkeley National Laboratory (2025). Queued Up: ~2,290 GW of generation+storage in US interconnection queues at end-2024 (~2x the installed fleet), ~14% historical completion, ~55-month median waits. *LBNL, Queued Up (2025), emp.lbl.gov/queues*

- **Grid Strategies '24** — Wilson, J. D. & Zimmerman, Z. — Grid Strategies LLC (2024). Strategic Industries Surging: forecasts ~166 GW of US peak-load growth by 2030, roughly 90 GW from data centers — the best-documented estimate of the demand turn. *Grid Strategies LLC, Dec 2024, gridstrategiesllc.com*

- **EIA '26** — U.S. Energy Information Administration (2026). Electricity data establishing the measured 2025 US generation mix and a record annual total near 4.43 trillion kWh — the present-state fuel shares this survey builds on. *EIA, Electric Power Monthly / Electricity data (2026), eia.gov/electricity*

- **Canary '26** — Canary Media (2026). Reporting that US wind+solar outproduced coal for a second straight year in 2025 while power-sector CO2 ticked up ~4.4% on coal, contextualizing the mix shift. *Canary Media (2026), canarymedia.com*

- **Lazard '26** — Lazard (2026). Levelized Cost of Energy+: unsubsidized LCOE ranges placing utility solar and onshore wind as cheapest new-build vs gas CCGT and nuclear, with costs rising across the board. *Lazard, Levelized Cost of Energy+ (2026), lazard.com*

- **GE Vernova '26** — GE Vernova (2026). Disclosures on large-frame gas-turbine backlog and lead times — order slots effectively reserved toward 2030 as demand for firm capacity surges. *GE Vernova investor disclosures (2026), gevernova.com*

- **IEEFA '25** — Institute for Energy Economics and Financial Analysis (2025). Analysis of gas-turbine market tightness: five-to-seven-year lead times and roughly 300% price escalation for new-build CCGT equipment over three years. *IEEFA (2025), ieefa.org*

- **Columbia CGEP '26** — Columbia University Center on Global Energy Policy (2026). Analysis of grid-enhancing technologies and advanced reconductoring as fast, low-cost capacity on existing rights-of-way, under-deployed for incentive/regulatory reasons rather than technical ones. *Columbia CGEP (2026), energypolicy.columbia.edu*

- **EIA STEO '26** — U.S. Energy Information Administration (2026). Short-Term Energy Outlook: near-term projections for the combined solar+wind share of US generation and for renewable capacity additions. *EIA, Short-Term Energy Outlook (2026), eia.gov/outlooks/steo*

- **Wood Mackenzie '26** — Wood Mackenzie (2026). Market analysis of enhanced-geothermal cost trajectories and deployment outlook as the first commercial-scale plants come online. *Wood Mackenzie (2026), woodmac.com*

- **World Nuclear News '24** — World Nuclear News (2024). Reporting on US reactor restarts and uprates, including the Crane Clean Energy Center (Three Mile Island Unit 1) restart plan and schedule. *World Nuclear News (2024), world-nuclear-news.org*

- **IEA '26** — International Energy Agency (2026). Assessment of small modular reactor economics and timelines, underscoring first-of-a-kind risk and that no Western SMR is yet in commercial operation. *IEA, nuclear / SMR outlook (2026), iea.org*

- **Dominion '25** — Dominion Energy (2025). Project filings and construction updates for Coastal Virginia Offshore Wind (~2.6 GW), the largest US offshore wind project under construction, and its stated schedule. *Dominion Energy, CVOW disclosures (2025), coastalvawind.com*

- **FIA '26** — Fusion Industry Association (2026). Annual survey of private fusion developers — capital raised, milestones, and stated net-energy and pilot-plant timelines — the landscape against which SPARC's signpost sits. *Fusion Industry Association, The Global Fusion Industry (2026), fusionindustryassociation.org*

- **Caltech '23** — California Institute of Technology, Space Solar Power Project (2023). The MAPLE experiment aboard SSPD-1 demonstrated wireless power transfer in orbit and detectably beamed power to Earth — proof of principle, not system economics. *Caltech Space Solar Power Project (2023), spacesolar.caltech.edu*
