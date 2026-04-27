const fmt = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtCur = (n) => '$' + fmt(n);

document.getElementById('calcForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.classList.add('hidden');

  const totalAmount = parseFloat(document.getElementById('totalAmount').value);
  const downPercent = parseFloat(document.getElementById('downPaymentPercent').value) || 0;
  const annualRate = parseFloat(document.getElementById('interestRate').value);
  const years = parseInt(document.getElementById('numYears').value);
  const hoa = parseFloat(document.getElementById('hoa').value) || 0;
  const houseInsurance = parseFloat(document.getElementById('houseInsurance').value) || 0;
  const propertyTax = parseFloat(document.getElementById('propertyTax').value) || 0;
  const mortgageInsurance = parseFloat(document.getElementById('mortgageInsurance').value) || 0;
  const utilities = parseFloat(document.getElementById('utilities').value) || 0;
  const others = parseFloat(document.getElementById('others').value) || 0;

  if (!totalAmount || totalAmount <= 0 || isNaN(annualRate) || annualRate < 0 || !years || years <= 0) {
    errorMsg.textContent = 'Please fill in all required fields with valid positive numbers.';
    errorMsg.classList.remove('hidden');
    return;
  }

  const principal = totalAmount * (1 - downPercent / 100);
  const downPayment = totalAmount * (downPercent / 100);
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;

  let piPayment;
  if (annualRate === 0) {
    piPayment = principal / numPayments;
  } else {
    piPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const monthlyExtra = hoa + houseInsurance + propertyTax + mortgageInsurance + utilities + others;
  const monthlyTotal = piPayment + monthlyExtra;

  const body = document.getElementById('amortizationBody');
  body.innerHTML = '';
  let balance = principal;
  let totalMortgage = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  for (let m = 1; m <= numPayments; m++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = piPayment - interestPayment;
    totalInterest += interestPayment;
    totalMortgage += piPayment;
    totalPayment += monthlyTotal;
    balance -= principalPayment;
    if (balance < 0) balance = 0;

    const row = document.createElement('tr');
    row.innerHTML =
      '<td>' + m + '</td>' +
      '<td>' + fmtCur(principalPayment) + '</td>' +
      '<td>' + fmtCur(interestPayment) + '</td>' +
      '<td>' + fmtCur(totalMortgage) + '</td>' +
      '<td>' + fmtCur(totalPayment) + '</td>' +
      '<td>' + fmtCur(balance) + '</td>';
    body.appendChild(row);
  }

  // Add mortgage info row (down payment + total loan amount) before table data
  const mortgageInfo = document.getElementById('mortgageInfo');
  mortgageInfo.innerHTML = `
    <div class="info-row">
      <span class="info-label">Down Payment</span>
      <span class="info-value">${fmtCur(downPayment)}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Total Loan Amount</span>
      <span class="info-value">${fmtCur(principal)}</span>
    </div>
  `;

  document.getElementById('monthlyPayment').textContent = fmtCur(monthlyTotal);
  document.getElementById('piPayment').textContent = fmtCur(piPayment);
  document.getElementById('totalPaymentDisplay').textContent = fmtCur(totalPayment);
  document.getElementById('totalInterestDisplay').textContent = fmtCur(totalInterest);

  document.getElementById('resultCard').classList.remove('hidden');
});
