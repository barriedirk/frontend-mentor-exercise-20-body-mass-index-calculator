import {
  $,
  $$,
  injectBlankBMI,
  injectResultBMI,
  calculateImperialBMI,
  calculateMetricBMI,
  calculateIdealWeightImperialRange,
  calculateMetricIdealWeightRange,
  convertHeightToImperial,
  convertWeightToImperial,
  convertHeightToMetric,
  convertWeightToMetric,
  getFormValues,
  keyDownNumber,
  inputNumber,
} from "./utils.js";

(async () => {
  const optionMeasurementIds = [
    "#bmi__form--option-metric",
    "#bmi__form--option-imperial",
  ];
  const fieldsetIds = [
    "#bmi__form--imperial-measurement",
    "#bmi__form--metric-measurement",
  ];
  const $$formInputText = $$(".bmi__form--input");
  const $form = $("#bmi__form");
  const $bmiMessage = $("#bmi__form--message");

  const calculate = () => {
    const data = getFormValues($form);
    let bmi = 0,
      idealWeightRange = "";

    switch (data["option"]) {
      case "Metric":
        bmi = calculateMetricBMI({
          heightCm: data["height_cm"],
          weightKg: data["weight_kg"],
        });
        idealWeightRange =
          bmi === 0 ? "" : calculateMetricIdealWeightRange(data["height_cm"]);

        break;

      case "Imperial":
        bmi = calculateImperialBMI({
          heightFt: data["height_ft"],
          heightIn: data["height_in"],
          weightSt: data["weight_st"],
          weightLbs: data["weight_lbs"],
        });
        idealWeightRange =
          bmi === 0
            ? ""
            : calculateIdealWeightImperialRange({
                heightFt: data["height_ft"],
                heightIn: data["height_in"],
              });
        break;
    }

    $bmiMessage.innerHTML =
      bmi === 0 ? injectBlankBMI() : injectResultBMI(bmi, idealWeightRange);
  };

  $$formInputText.forEach(($input) => {
    $input.value = "0";

    $input.addEventListener("focus", (evt) => evt.target.select());
    $input.addEventListener("keydown", keyDownNumber);
    $input.addEventListener("input", inputNumber);

    $input.addEventListener("blur", (evt) => {
      const value = evt.target.value?.trim() ?? "0";

      if (value === "") evt.target.value = "0";
    });

    $input.addEventListener("keyup", () => calculate());
  });

  optionMeasurementIds.forEach((key) => {
    $(key).addEventListener("click", (evt) => {
      const value = evt.target.value;
      const data = getFormValues($form);

      switch (value) {
        case "Imperial":
          const { feet, inches } = convertHeightToImperial(data["height_cm"]);
          const { stones, pounds } = convertWeightToImperial(data["weight_kg"]);

          $('input[name="height_ft"]').value = feet;
          $('input[name="height_in"]').value = inches;
          $('input[name="weight_st"]').value = stones;
          $('input[name="weight_lbs"]').value = pounds;

          break;
        case "Metric":
          const heightCm = convertHeightToMetric(
            data["height_ft"],
            data["height_in"]
          );
          const weightKg = convertWeightToMetric(
            data["weight_st"],
            data["weight_lbs"]
          );

          $('input[name="height_cm"]').value = heightCm;
          $('input[name="weight_kg"]').value = weightKg;

          break;
      }

      const fieldset = evt.target.getAttribute("data-fieldset");
      const $fieldset = $(fieldset);

      $$formInputText.forEach(($input) => {
        $input.disabled = true;
      });

      fieldsetIds.forEach((fieldset) => {
        $(fieldset).classList.add("hidden");
      });

      $fieldset.classList.remove("hidden");

      $fieldset.querySelectorAll(".bmi__form--input").forEach(($input) => {
        $input.disabled = false;
      });

      console.log();

      calculate();
    });
  });

  $(optionMeasurementIds[0]).click();
})();
