export const $ = (selector) => document.querySelector(selector);

export const $$ = (selector) => document.querySelectorAll(selector);

export const injectBlankBMI = () => {
  return `
    <h3
      class="bmi__form--message-title font-semibold"
      id="bmi__form--message-title"
    >
      Welcome!
    </h3>
    <p class="bmi__form--message-description">
      Enter your height and weight and you’ll see your BMI result here
    </p>
  `;
};

export const injectResultBMI = (bmi, idealWeightRange) => {
  let categoryMessage = "";

  if (bmi < 18.5) {
    categoryMessage = "underweight";
  } else if (bmi < 25) {
    categoryMessage = "a healthy weight";
  } else if (bmi < 30) {
    categoryMessage = "overweight";
  } else {
    categoryMessage = "in the obese range";
  }

  const msgSuggests = `Your BMI suggests you’re ${categoryMessage}. Your ideal weight is between <span class="font-semibold">${idealWeightRange}</span>.`;

  return `
<div class="bmi__form--message-groups flex">
  <div class="bmi__form--message-group flex-column-wrapper">
    <h4 class="bmi__form--message-bmi-is font-semibold">
      Your BMI is...
    </h4>
    <h3
      class="bmi__form--message-bmi font-semibold"
      id="bmi__form--message-title"
    >
      ${bmi.toFixed(1)}
    </h3>
  </div>
  <div class="bmi__form--message-group">
    <p class="bmi__form--message-detail">${msgSuggests}</p>
  </div>
</div>`;
};

export const calculateImperialBMI = ({
  heightFt,
  heightIn,
  weightSt,
  weightLbs,
}) => {
  const totalHeightIn = heightFt * 12 + heightIn;
  const totalWeightLbs = weightSt * 14 + weightLbs;

  const bmi = (totalWeightLbs * 703) / totalHeightIn ** 2;

  return bmi === Infinity || Number.isNaN(bmi) ? 0 : bmi;
};

export const calculateMetricBMI = ({ heightCm, weightKg }) => {
  const heightM = heightCm / 100;
  const bmi = weightKg / heightM ** 2;

  return bmi === Infinity || Number.isNaN(bmi) ? 0 : bmi;
};

export const calculateIdealWeightImperialRange = ({ heightFt, heightIn }) => {
  const totalHeightIn = heightFt * 12 + heightIn;

  // Calculate weight range in pounds using BMI limits
  const minWeightLbs = (18.5 * totalHeightIn ** 2) / 703;
  const maxWeightLbs = (24.9 * totalHeightIn ** 2) / 703;

  // Convert to stones and pounds
  function toStonesPounds(lbs) {
    const stones = Math.floor(lbs / 14);
    const pounds = Math.round(lbs % 14);
    return `${stones}st ${pounds}lbs`;
  }

  return `${toStonesPounds(minWeightLbs)} - ${toStonesPounds(maxWeightLbs)}`;
};

export const calculateMetricIdealWeightRange = (heightCm) => {
  const height_m = heightCm / 100;

  // BMI range for healthy weight
  const minBMI = 18.5;
  const maxBMI = 24.9;

  // Calculate weight range in kg
  const minWeightKg = minBMI * height_m ** 2;
  const maxWeightKg = maxBMI * height_m ** 2;

  // Round to 1 decimal place
  const minRounded = minWeightKg.toFixed(1);
  const maxRounded = maxWeightKg.toFixed(1);

  return `${minRounded}kg - ${maxRounded}kg`;
};

export const convertHeightToImperial = (heightCm) => {
  const totalInches = heightCm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  return { feet, inches };
};

export const convertWeightToImperial = (weightKg) => {
  const totalPounds = weightKg * 2.20462;
  const stones = Math.floor(totalPounds / 14);
  const pounds = Math.round(totalPounds % 14);

  return { stones, pounds };
};

export const convertHeightToMetric = (feet, inches) => {
  const totalInches = feet * 12 + inches;
  const heightCm = totalInches * 2.54;

  return Math.round(heightCm).toFixed(0);
};

export const convertWeightToMetric = (stones, pounds) => {
  const totalPounds = stones * 14 + pounds;
  const weightKg = totalPounds / 2.20462;

  return Math.round(weightKg * 10) / 10;
};

export const getFormValues = ($form) => {
  const dataForm = new FormData($form);

  return Array.from(dataForm.entries()).reduce((acc, [key, value]) => {
    acc[key] = key === "option" ? value : Number(value);

    return acc;
  }, {});
};

export const keyDownNumber = (e) => {
  const allowedKeys = [
    "Backspace",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
    "Home",
    "End",
  ];
  const decimalsAllowed = parseInt(
    e.target.getAttribute("data-decimals") || "0",
    10
  );
  const value = e.target.value;
  const isCtrl = e.ctrlKey || e.metaKey;
  const isAllSelected =
    e.target.selectionStart === 0 && e.target.selectionEnd === value.length;

  if (
    allowedKeys.includes(e.key) || // Allow control keys
    isCtrl // Allow Ctrl+C, Ctrl+V, etc.
  ) {
    return;
  }

  // Allow one dot if decimals > 0 and not already present
  if (e.key === "." && decimalsAllowed > 0 && !value.includes(".")) {
    return;
  }

  // Allow digits
  if (/^\d$/.test(e.key)) {
    // Prevent multiple leading zeros
    // if (value === "0" && e.key === "0") {
    //   e.preventDefault();
    // }

    // Prevent multiple leading zeros
    if (value === "0" && e.key === "0" && !isAllSelected) {
      e.preventDefault();
      return;
    }

    // Prevent leading zero before non-dot (e.g. "01")
    // if (value === "0" && e.key !== ".") {
    //   e.preventDefault();
    // }

    // Prevent leading zero before non-dot (e.g. "01") unless all selected
    if (value === "0" && e.key !== "." && !isAllSelected) {
      e.preventDefault();
      return;
    }

    // Prevent more decimals than allowed
    // if (value.includes(".")) {
    //   const [intPart, decPart] = value.split(".");
    //   if (
    //     decPart.length >= decimalsAllowed &&
    //     e.target.selectionStart > value.indexOf(".")
    //   ) {
    //     e.preventDefault();
    //   }
    // }

    // Prevent more decimals than allowed
    if (value.includes(".")) {
      const [intPart, decPart] = value.split(".");
      const cursorPos = e.target.selectionStart;
      const dotIndex = value.indexOf(".");

      if (
        cursorPos > dotIndex && // Cursor is in decimal part
        decPart.length >= decimalsAllowed &&
        e.target.selectionStart === e.target.selectionEnd // Not replacing selection
      ) {
        e.preventDefault();
        return;
      }
    }

    return;
  }

  // Block everything else
  e.preventDefault();
};

export const inputNumber = (e) => {
  const decimalsAllowed = parseInt(
    e.target.getAttribute("data-decimals") || "0",
    10
  );
  let val = e.target.value;

  // Remove all non-digit and dot characters
  val = val.replace(/[^0-9.]/g, "");

  // Only keep the first dot
  const firstDot = val.indexOf(".");
  if (firstDot !== -1) {
    const intPart = val.slice(0, firstDot);
    let decPart = val.slice(firstDot + 1).replace(/\./g, "");

    if (decimalsAllowed >= 0) {
      decPart = decPart.slice(0, decimalsAllowed);
    }

    val = intPart + "." + decPart;
  }

  // Remove leading zeros unless followed by dot
  val = val.replace(/^0+(?!\.)/, "");

  e.target.value = val;
};
