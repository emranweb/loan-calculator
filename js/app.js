//lorm UI
const form = document.querySelector("form");
//loan header
const loan_header = document.querySelector(".loan__header");
const loader = document.querySelector(".loan__loader");
const result = document.querySelector(".loan__result");

// event listener to this form
form.addEventListener("submit", showLoader);

//show loader
function showLoader(e) {
  loader.style.display = "block";
  result.style.display = "none";
  setTimeout(loanCalculator, 1500);
  e.preventDefault();
}

//loan calculator function
function loanCalculator() {
  //form input UI
  const loanAmount = document.querySelector("#la");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  //results UI
  const monthlyPayment = document.querySelector("#mp");
  const totalPayment = document.querySelector("#tp");
  const totalInterest = document.querySelector("#ti");

  //calculate the loan amount
  const calAmount = parseFloat(loanAmount.value);
  //calculate the interest
  const calInt = parseFloat(interest.value) / 100 / 12;
  //calculate the year
  const calYear = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calInt, calYear);

  //calculate the monthly
  const monthly = (calAmount * x * calInt) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calYear).toFixed(2);
    totalInterest.value = ((monthly * calYear) - calAmount).toFixed(2);
    loader.style.display = "none";
    result.style.display = "block";
  } else {
    //show the error
    showError("Wrong Number");
  }

}

//error function

function showError(error) {
  loader.style.display = "none";
  result.style.display = "none";
  const h4 = document.createElement("h4");
  h4.className = "danger";
  h4.appendChild(document.createTextNode(error));
  loan_header.appendChild(h4);

  setTimeout(clearError, 3000);
}

//claer error

function clearError() {
  document.querySelector(".loan__header h4").remove();
}