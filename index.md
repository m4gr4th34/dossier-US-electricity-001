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

On the demand side, Grid Strategies' National Load Growth Report forecasts that U.S. peak load is expected to grow by roughly 166 GW by 2030, with about 90 GW of that from data centers [Grid Strategies '25]. That the report projects this is now audited against the primary; whether the load actually materializes is the forecast, and its verifier is how the next few years resolve — but it is the best-documented estimate of the demand turn, and the direction is not in dispute.

The connection bottleneck is documented, not anecdotal: about 2,290 GW of capacity was active in interconnection queues at end-2024, against a historical completion rate near 14% and median waits around 55 months; a record ~112 GW of solar-plus-storage withdrew from the queues in 2024 alone [LBNL '25]. On cost, renewables are the cheapest new-build on an unsubsidized levelized-cost (The all-in cost of generating a unit of electricity over a plant's lifetime, in dollars per megawatt-hour, used to compare technologies on a common footing. It omits grid-integration and reliability value, so it is a starting point for comparison, not the whole story.) basis — utility solar about $40–98/MWh and onshore wind about $37–99/MWh, versus gas CCGT around $51–129 and nuclear around $175–255 — but costs are rising across every technology [Lazard '26].

Finally, the firm-power equipment squeeze is real and quantified: large-frame gas turbines are effectively sold out toward 2030, lead times have stretched to five to seven years, and equipment prices have climbed roughly 300% in three years [GE Vernova '26] [IEEFA '25]. The bridge fuel is now itself a queue.

## 03 THE AVENUES

Each avenue is walked in turn and labeled exactly as strongly as its evidence allows: what it costs, how fast it can launch, and — where the avenue is a forward bet — the dated, falsifiable signpost that will later mark it right or wrong.

### Grid-enhancing tech & reconductoring — Tier 1, established

Grid-enhancing technologies (Hardware and software — dynamic line ratings, power-flow controllers, and advanced reconductoring with high-capacity conductors — that squeeze more usable capacity out of transmission lines already in the ground, cheaply and quickly, instead of building new lines.) and advanced reconductoring unlock large capacity on existing rights-of-way in months, not years, at a fraction of new-line cost [Columbia CGEP '26]. This is the cheapest, fastest fix for the constraint that actually binds, and it is under-deployed for incentive and regulatory reasons, not technical ones — which is why it is asserted as established while its scale-up is tracked by a signpost: we expect ≥50 GW of incremental US grid capacity unlocked via GETs/advanced transmission tech by end-2028.

*(figure: Reconductoring: the same towers carry 2–3× the power — Reconductoring adds capacity on existing rights-of-way in roughly 1–2 years, about 30–40% cheaper than new lines, with no new land or permitting — e.g. Salt River Project gained an ~80% capacity increase on a Phoenix line without replacing a single 1970s-era tower.)*

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

One further, longer-range reason some of these designs matter is the waste problem. A reactor's most stubborn hazard is not uranium itself but the *transuranics* — plutonium, americium, and their kin — created in fission, whose radiotoxicity is what stretches the dangerous lifetime of spent fuel toward hundreds of thousands of years. Certain advanced designs are built to burn exactly those:

> **FORECAST** — **Labeled estimate:** fast-spectrum reactors and certain molten-salt reactors (MSRs) are expected to shrink the long-lived-waste burden by consuming transuranics as fuel, potentially compressing the dangerous lifetime of the residual waste from ~hundreds of thousands of years toward centuries. Two clarifications keep this precise: the long-life problem is the transuranics, not the uranium; and MSRs' nearer-term advantages are operational — atmospheric-pressure operation and walk-away safety — rather than waste. **Counter-view, equal prominence:** none of this is proven at commercial scale, and the reprocessing and fast-burn fuel cycles it would rely on carry their own cost and proliferation considerations. Tie-in worth noting: Kairos, a leading US effort, is a fluoride-salt-cooled design. This is claim `C19` in the ledger. **Signpost:** a US advanced/fast-spectrum or molten-salt reactor demonstrates commercial-scale operation with materially reduced long-lived-waste output by 2035.

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

- **Columbia CGEP '26** — Columbia University Center on Global Energy Policy (2026). Analysis of grid-enhancing technologies and advanced reconductoring as fast, low-cost capacity on existing rights-of-way, under-deployed for incentive/regulatory reasons rather than technical ones. *Columbia CGEP (2026), energypolicy.columbia.edu*

- **EIA STEO '26** — U.S. Energy Information Administration (2026). Short-Term Energy Outlook: near-term projections for the combined solar+wind share of US generation and for renewable capacity additions. *EIA, Short-Term Energy Outlook (2026), eia.gov/outlooks/steo*

- **Wood Mackenzie '26** — Wood Mackenzie (2026). Market analysis of enhanced-geothermal cost trajectories and deployment outlook as the first commercial-scale plants come online. *Wood Mackenzie (2026), woodmac.com*

- **World Nuclear News '24** — World Nuclear News (2024). Reporting on US reactor restarts and uprates, including the Crane Clean Energy Center (Three Mile Island Unit 1) restart plan and schedule. *World Nuclear News (2024), world-nuclear-news.org*

- **IEA '26** — International Energy Agency (2026). Assessment of small modular reactor economics and timelines, underscoring first-of-a-kind risk and that no Western SMR is yet in commercial operation. *IEA, nuclear / SMR outlook (2026), iea.org*

- **Dominion '25** — Dominion Energy (2025). Project filings and construction updates for Coastal Virginia Offshore Wind (~2.6 GW), the largest US offshore wind project under construction, and its stated schedule. *Dominion Energy, CVOW disclosures (2025), coastalvawind.com*

- **FIA '26** — Fusion Industry Association (2026). Annual survey of private fusion developers — capital raised, milestones, and stated net-energy and pilot-plant timelines — the landscape against which SPARC's signpost sits. *Fusion Industry Association, The Global Fusion Industry (2026), fusionindustryassociation.org*

- **Caltech '23** — California Institute of Technology, Space Solar Power Project (2023). The MAPLE experiment aboard SSPD-1 demonstrated wireless power transfer in orbit and detectably beamed power to Earth — proof of principle, not system economics. *Caltech Space Solar Power Project (2023), spacesolar.caltech.edu*
