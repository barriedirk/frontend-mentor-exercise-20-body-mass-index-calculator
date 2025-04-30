const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

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

  optionMeasurementIds.forEach((key) => {
    $(key).addEventListener("click", (evt) => {
      const fieldset = evt.target.getAttribute("data-fieldset");
      const $fieldset = $(fieldset);

      $$formInputText.forEach(($input) => {
        $input.disabled = true;
      });

      fieldsetIds.forEach((fieldset) => {
        $(fieldset).classList.add("hidden");
      });

      optionMeasurementIds.forEach((option) => {
        const $option = $(option);

        $option.setAttribute("aria-checked", "false");
      });

      $fieldset.classList.remove("hidden");
      evt.target.setAttribute("aria-checked", "true");

      $fieldset.querySelectorAll(".bmi__form--input").forEach(($input) => {
        $input.disabled = false;
      });
    });
  });

  $(optionMeasurementIds[0]).click();
})();
