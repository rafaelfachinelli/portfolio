# CLT x PJ calculator: specification

Audience: Rafael and AI agents building the first tool of Phase 3.
Status: draft, waiting for Rafael's approval · Last updated: 2026-10-19

The first tool of [Phase 3](../roadmap.md#phase-3-tools). Nothing is built before this page is approved.

## What it answers

"For the same job, how much do I keep per year as an employee (CLT) and as a company (PJ)?" And the inverse: "Given this CLT offer, what monthly PJ invoice leaves me with the same money?"

It is a simulation for learning and comparing offers, not accounting or financial advice. The page says so above the result.

## Who it is for (scope)

| In scope | Out of scope (said on the page) |
| --- | --- |
| Employee under CLT, monthly salary, optional dependents and benefits (meal voucher, health plan) | PLR, overtime, commissions, stock options |
| PJ in **Simples Nacional**, one partner, no employees, service activity under the **Fator R** (software, IT consulting) | MEI (software development is not an MEI activity), Lucro Presumido, Lucro Real |
| Values of **2026** (one reference year on the page) | Years before 2026; projections for later years |
| Monthly invoice up to R$ 60,000 (RBT12 up to R$ 720,000, Simples bands 1 to 3) | Larger companies (bands 4 to 6) |

## Rules, with sources

Every number lives in one data file per year (`apps/site/src/lib/tools/clt-pj/tables/2026.ts`) with its legal act and link. No number is written anywhere else.

### CLT side

1. **INSS (employee).** Progressive by bands: 7.5% up to R$ 1,621.00; 9% up to R$ 2,902.84; 12% up to R$ 4,354.27; 14% up to R$ 8,475.55 (ceiling; maximum R$ 988.09 a month). Source: Portaria Interministerial MPS/MF nº 13, 2026-01-09.
2. **IRRF (monthly).** Base = salary − the larger of (INSS + R$ 189.59 per dependent) and the simplified discount (R$ 607.20). Tax by the 2026 table: exempt up to R$ 2,428.80; 7.5% (− R$ 182.16) up to R$ 2,826.65; 15% (− R$ 394.16) up to R$ 3,751.05; 22.5% (− R$ 675.49) up to R$ 4,664.68; 27.5% (− R$ 908.73) above. Then the **Lei 15.270/2025 reduction**, computed on the **gross** taxable income (the Receita's own examples use the salary, not the base): up to R$ 5,000 the tax goes to zero; from R$ 5,000.01 to R$ 7,350 the reduction is R$ 978.62 − 0.133145 × income; above R$ 7,350, none. Source: Receita Federal, [Tributação de 2026](https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026) and [Exemplos de aplicação](https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/exemplos-de-aplicacao-da-lei-15-191-2025).
3. **13th salary.** Taxed on its own (exclusive taxation): INSS by the table, IRRF on 13th − INSS − dependents. **To confirm before the build:** whether the simplified discount and the Lei 15.270 reduction apply to the 13th (no official Receita text found yet; only secondary sources say the reduction applies).
4. **Vacation.** One month of salary plus one third, paid in its own month and taxed through the same INSS and IRRF tables. Only the extra third adds to the year; the vacation month replaces a salary month.
5. **FGTS.** 8% of salary, 13th and vacation. Shown as its own line, because it is money the person cannot spend freely (it is released on dismissal without cause, home purchase, retirement). The result shows the total with and without FGTS. The 40% fine on dismissal is not counted.
6. **Benefits.** Meal or food voucher and health plan, typed by the user as monthly values; counted as value received, not taxed.

### PJ side

1. **Simples Nacional (DAS).** RBT12 = 12 × monthly invoice. Effective rate = (RBT12 × nominal rate − deduction) / RBT12, applied to the monthly invoice. The DAS already includes ISS and the employer INSS (CPP) in annexes III and V. Source: LC 123/2006, annexes as written by LC 155/2016.

   | RBT12 up to | Annex III | Annex V |
   | --- | --- | --- |
   | R$ 180,000 | 6% | 15.5% |
   | R$ 360,000 | 11.2% − R$ 9,360 | 18% − R$ 4,500 |
   | R$ 720,000 | 13.5% − R$ 17,640 | 19.5% − R$ 9,900 |

2. **Fator R.** If payroll (here, the pro-labore) is at least 28% of revenue, the company pays Annex III; below that, Annex V. The pro-labore starts at **28% of the invoice** (never below the minimum wage, R$ 1,621.00), which is the usual choice for software companies; the user can change it and sees the annex switch.
3. **Pro-labore.** INSS of 11% (up to the ceiling) and IRRF by the same monthly table and reduction as the CLT side.
4. **Distributed profit.** Invoice − DAS − pro-labore − accounting − other costs. Exempt from income tax (LC 123/2006, art. 14), assuming the company keeps full bookkeeping, which the accountant does in practice.
5. **Costs.** Accountant (default R$ 300 a month, editable) and other monthly costs (default zero).
6. **Months billed per year.** Default 12. PJ has no paid vacation or 13th: anyone who stops for a month bills 11. The page explains this next to the input.
7. **Lei 15.270/2025 on dividends.** A 10% withholding on profits above R$ 50,000 a month from one company. Whether it applies to Simples is in court (injunctions against, Receita for). The tool does not compute it: above R$ 50,000 of monthly profit it shows a warning. The same goes for the minimum tax on incomes above R$ 600,000 a year.

### What the result shows

- Net per year and per month on each side, with and without FGTS, and the difference.
- Every line of the calculation (INSS, IRRF, reduction, DAS, annex, effective rate), so the person can check the math.
- The PJ invoice that matches the CLT offer (found by search over the same functions, not by a rule of thumb).
- What the numbers leave out, in plain words: stability, unemployment insurance, the 40% FGTS fine, the lower INSS retirement on a smaller pro-labore, paid sick leave, the risk of going without clients.

Example with the 2026 rules, CLT R$ 10,000, no dependents or benefits:
CLT net R$ 7,442.36 a month; R$ 99,167 a year with 13th and vacation; R$ 109,834 with FGTS.
The same money as PJ needs an invoice of about **R$ 10,400 a month** billing 12 months, or about **R$ 11,300** billing 11. This is the math only; the items above are why people ask for more than that as PJ.

## Page

- Route: `/<lang>/tools/clt-x-pj` (open question 1).
- Built from Datum: Field, Input, Select, Card, Stat, Callout, Tooltip, Button. A generic piece the tool needs and Datum does not have yet (a currency input, a two-option switch for "compare" and "find the equivalent") enters Datum first, with its stories.
- The calculation runs in the browser. Nothing typed leaves the page; Umami gets only events without values (`clt-pj-calculated`, `clt-pj-mode-changed`).
- Sections: the form, the result, "how the math works" (the rules above in plain language, with links to the sources), FAQ, and the "not advice" notice.
- SEO: title and description in the page language, entry in the sitemap and in `llms.txt`.
- Performance: the page stays within the brand budget (Performance 90+); the math is a small module with no dependencies.

## Keeping it right

**How long it stays right.** The 2026 values are valid until 2026-12-31. Without an update, the tool goes stale in January 2027.

**What changes and when.**

| Item | Changes | Usual effort |
| --- | --- | --- |
| INSS bands and ceiling | Every January (minimum wage and a new portaria) | 15 minutes |
| IRRF table, reduction, dependents | When a law changes: it changed in 2023, 2024, 2025 and 2026 | 15-30 minutes |
| Simples annexes | Unchanged since 2018 | none |
| Tax reform (CBS and IBS) | From 2027 to 2033, CBS and IBS enter the Simples step by step, and B2B companies may choose to pay them outside the DAS | 2027: a few hours to review; then a yearly check |

**How it is kept honest.**

1. **One table file per year.** `tables/2026.ts` holds every number with its legal act and link. A new year is a new file; old ones stay for history.
2. **Tests built from official examples.** The math module has unit tests that reproduce the Receita's own worked examples (salaries of R$ 4,000, R$ 5,000, R$ 6,000 and R$ 7,607.20). A wrong table fails CI before it reaches the site.
3. **The page knows its year.** It shows "Valores de 2026". From 2027-01-01, while no 2027 table exists, it shows a notice that the values are from 2026 and may have changed. This is computed in the browser, so it works without a deploy.
4. **A yearly reminder.** A scheduled GitHub workflow opens an issue every January 10 with the checklist: new INSS portaria, IRRF table, Simples changes, the tax reform step for that year.

## Build plan

| PR | Content |
| --- | --- |
| A | This specification (docs only) |
| B | Math module and 2026 tables in `apps/site/src/lib/tools/clt-pj/`, Vitest in the site, tests from the Receita examples |
| C | Datum pieces the form needs (if any), with stories |
| D | The page in pt-BR and English, Umami events, SEO, Lighthouse check |
| E | The yearly reminder workflow and the stale-year notice |
| F | An article on how the tool was built and what the numbers mean |

## Open questions

1. Route: `/<lang>/tools/clt-x-pj`, like the site's other routes in English (`about`, `projects`, `contact`), or `/<lang>/ferramentas/clt-x-pj` as written in D5.
2. English version: the site is bilingual, but CLT and PJ are Brazilian. Proposal: the same page translated, with a short line explaining the terms to foreign readers.
3. Accountant default: R$ 300 a month, or another value Rafael knows from experience.
4. Lucro Presumido: out of v1 (proposal), or included from the start.
