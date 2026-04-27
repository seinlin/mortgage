This is a single-page Mortgage Calculator web app. Here's what it does:

### Input

Users enter loan details via a form with two sections:

1. Mortgage Details — Purchase price, down payment percentage, annual interest rate, and loan term in years.
2. Monthly Costs (Optional) — HOA, house insurance, property tax, mortgage insurance, utilities, and other recurring costs.

### Calculation

On submit, the JS (js/script.js) computes:

- Down payment and loan principal from the purchase price.
- Monthly Principal & Interest using the standard amortization formula:
  P × [r(1+r)^n] / [(1+r)^n - 1] (with a zero-rate edge case handled).
- Monthly total by adding all optional costs on top of P&I.

### Output

A results card appears showing:

| Section | Content |
|---|---|
| Mortgage info | Down payment amount + total loan amount |
| Summary tiles | Monthly payment, Principal & Interest, total payment over life of loan, total interest paid |
| Amortization table | A month-by-month breakdown with columns: Month, Principal paid, Interest paid, cumulative mortgage paid, cumulative total payment, and remaining balance |

### Styling

The CSS (style/main.css) provides a clean, card-based responsive layout — two-column grid on desktop, single-column on mobile, with a sticky table header and horizontal scroll for the amortization table.
