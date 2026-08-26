tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#3867DB",
        secondary: "#0B237F",
      },
    },
    fontFamily: {
      clashdisplay: ["Clash Display", "sans-serif"],
      grotesk: ["Clash Grotesk", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
  },
};

const countries = [
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "India", flag: "🇮🇳" },
  { name: "Other", flag: "" },
];

countries.forEach((c) => {
  const label = document.createElement("label");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = c.name;
  if (c.name === "Other") {
    checkbox.id = "country-other-checkbox";

    const input = document.createElement("input");
    input.type = "text";
    input.id = "country-other-input";
    input.placeholder = "Please specify";
    input.classList.add("hidden");

    input.classList.add(
      "hidden",
      "border",
      "rounded",
      "px-2",
      "py-1",
      "text-sm",
    );

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(c.flag + " " + c.name));
    label.appendChild(input);
    corridors.appendChild(label);
    return;
  }

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(c.flag + " " + c.name));

  corridors.appendChild(label);
});

const otherCountryCheckbox = document.getElementById("country-other-checkbox");
const otherCountryInput = document.getElementById("country-other-input");

otherCountryCheckbox.addEventListener("change", () => {
  if (otherCountryCheckbox.checked) {
    otherCountryInput.classList.remove("hidden");
    otherCountryInput.focus();
  } else {
    otherCountryInput.classList.add("hidden");
    otherCountryInput.value = "";
  }
});

["fname", "cemail", "cwebsite"].forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener("input", () => {
    el.classList.toggle("filled", el.value.trim().length > 0);
  });
});

const ta = document.getElementById("comments");
ta.addEventListener("input", () => {
  ta.classList.toggle("filled", ta.value.trim().length > 0);
});

const otherCheckbox = document.getElementById("pm-other-checkbox");
const otherInput = document.getElementById("pm-other-input");

otherCheckbox.addEventListener("change", () => {
  if (otherCheckbox.checked) {
    otherInput.classList.remove("hidden");
    otherInput.focus();
  } else {
    otherInput.classList.add("hidden");
    otherInput.value = "";
  }
});

const getSelectedCheckboxById = (wrapperId) => {
  const checked = document.querySelectorAll(
    `${wrapperId} input[type="checkbox"]:checked`,
  );
  const values = [];
  checked.forEach((cb) => {
    const otherInputId =
      wrapperId === "#corridors" ? "country-other-input" : "pm-other-input";
    if (cb.value === "Other") {
      const otherVal = document.getElementById(otherInputId).value.trim();

      if (otherVal) {
        values.push(otherVal); // push custom value
      }
    } else {
      values.push(cb.value);
    }
  });

  return values;
};
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validateForm = (data) => {
  let isValid = true;

  if (!data.fullName) {
    showError(document.getElementById("fname"), "Full name is required");
    isValid = false;
  }

  if (!data.email) {
    showError(document.getElementById("cemail"), "Email is required");
    isValid = false;
  } else if (!isValidEmail(data.email)) {
    showError(document.getElementById("cemail"), "Invalid email");
    isValid = false;
  }

  if (!data.website.length) {
    showError(document.getElementById("cwebsite"), "Website URL is required");
    isValid = false;
  } else if (!isValidURL(data.website)) {
    showError(document.getElementById("cwebsite"), "Invalid URL");
    isValid = false;
  }

  const otherCountryChecked = document.getElementById(
    "country-other-checkbox",
  ).checked;
  const otherCountryValue = document
    .getElementById("country-other-input")
    .value.trim();

  if (!otherCountryChecked && !data.corridors.length) {
    showError(document.getElementById("corridors"), "Country is required");
    isValid = false;
  }

  if (otherCountryChecked && !otherCountryValue) {
    showError(
      document.getElementById("corridors"),
      "Please specify other country",
    );
    isValid = false;
  }

  const otherPaymentMethodChecked =
    document.getElementById("pm-other-checkbox").checked;
  const otherPaymentMethodValue = document
    .getElementById("pm-other-input")
    .value.trim();
  if (!otherPaymentMethodChecked && !data.paymentMethods.length) {
    showError(
      document.getElementById("payment-methods"),
      "Select at least one payment method",
    );
    isValid = false;
  }

  if (otherPaymentMethodChecked && !otherPaymentMethodValue) {
    showError(
      document.getElementById("payment-methods"),
      "Please specify other payment method",
    );
    isValid = false;
  }

  return isValid;
};

const clearErrors = () => {
  document.querySelectorAll(".error-text").forEach((el) => el.remove());
  document
    .querySelectorAll(".error-border")
    .forEach((el) => el.classList.remove("error-border"));
};

const showError = (element, message) => {
  const span = document.createElement("span");
  span.className = "error-text text-red-500 text-sm mt-1 block";
  span.innerText = message;

  element.classList.add("error-border", "border-red-500");

  // append after input/select
  element.parentElement.appendChild(span);
};

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", async () => {
  clearErrors();
  const formData = {
    fullName: document.getElementById("fname").value.trim(),
    email: document.getElementById("cemail").value.trim(),
    website: document.getElementById("cwebsite").value.trim(),
    corridors: getSelectedCheckboxById("#corridors"),
    paymentMethods: getSelectedCheckboxById("#payment-methods"),
    comments: document.getElementById("comments").value.trim(),
  };

  const isValid = validateForm(formData);
  if (!isValid) return;
  showLoader(true);

  try {
    // Get reCAPTCHA token
    const token = await grecaptcha.execute(
      "6LfMM9osAAAAAOXy4z2BtN2KfHKN07TTeUZ8Z9li",
      {
        action: "submit",
      },
    );

    // attach token
    formData.recaptchaToken = token;
    formData.countries = formData.corridors;
    delete formData.corridors;

    const res = await fetch("https://ramp-service.prod.pay3.app/leads-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = res ? await res.json() : null;
    if (!result || (result && result.error)) {
      const errorMsg = result ? result.error : "Something went wrong.";
      showError(document.getElementById("comments"), errorMsg);
    } else {
      showSuccess();
    }
  } catch (err) {
    console.error("reCAPTCHA error:", err);
  } finally {
    showLoader(false);
  }
});

const showSuccess = () => {
  const formSuccessScreen = document.getElementById("form-success");
  const form = document.getElementById("form");
  formSuccessScreen.classList.remove("hidden");
  form.classList.add("hidden");
};

const originalText = submitBtn.innerHTML;
const showLoader = (bool = false) => {
  submitBtn.disabled = true;

  if (bool) {
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing...
    `;
    submitBtn.classList.add("opacity-50", "cursor-not-allowed");
  } else {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
};
