import { useState } from "react";
import Tax from "./components/Tax";
import Faq from "./components/Faq";

const emptyValues = {
  earnings: "",
  hours: 0,
  miles: 0,
  tax: false,
};

const defaultErrors = {
  earnings: false,
  hours: false,
  mileage: false,
};

const faqs = [
  {
    title: "My first title",
    description: "Description ak,jhd",
  },
  {
    title: "My second title",
    description: "Description",
  },
  {
    title: "My third title",
    description: "Description",
  },
];

function App() {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState(defaultErrors);

  function handle(key, value) {
    setValues((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function calculateEarnings(vals) {
    let finalVal = Number(vals.earnings);
    //insurance is 90p per hour worked//
    const insuranceCost = vals.hours * 0.9;
    //per mile is 13p//
    const miles = vals.miles * 0.13;

    finalVal = finalVal - insuranceCost - miles;

    if (vals.tax && finalVal > 0) {
      finalVal = finalVal * 0.8;
    }
    return {
      netEarnings: finalVal.toFixed(2),
      netMiles: (finalVal / vals.miles).toFixed(2),
      netHours: (finalVal / vals.hours).toFixed(2),
    };
  }

  function submit() {
    if (values.hours < 1) {
      setErrors((prev) => ({
        ...prev,
        hours: "You must enter at least 1 hour.",
      }));
    }
    if (values.miles < 1) {
      setErrors((prev) => ({
        ...prev,
        miles: "You must enter at least 1 mile.",
      }));
    }
    if (!values.earnings) {
      setErrors((prev) => ({
        ...prev,
        earnings: "You must enter net earnings.",
      }));
    }

    if (!values.earnings || values.hours < 1 || values.miles < 1) {
      return; // EXIT THE FUNCTION -- STOP
    }

    setErrors(defaultErrors);
    const amount = calculateEarnings(values);
    setValues(emptyValues);
    localStorage.setItem("amount", JSON.stringify(amount));
  }

  const localExpenses = JSON.parse(localStorage.getItem("amount")) || {};

  return (
    <div className="sm:px-12 md:px-20 lg:px-40 xl:px-56 2xl:px-96 px-4 pt-4">
      <div className="max-w-[700px] mx-auto mb-6">
        <h1 className="font-bold text-xl">Uber earnings calculator</h1>
        <p className="block text-sm font-medium leading-6 text-gray-900">
          Tool to calculate earnings from uber
        </p>
      </div>
      <div className="max-w-[700px] mx-auto flex flex-col gap-y-4">
        <div>
          <label
            htmlFor="net-earnings"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Net earnings
          </label>
          <div className="mt-2 flex rounded-md shadow-sm">
            <span className="font-semibold inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
              £
            </span>
            <input
              type="text"
              value={values.earnings}
              id="net-earnings"
              onChange={(e) => handle("earnings", e.target.value)}
              className={`${
                errors.earnings ? "ring-red-500" : "ring-gray-300"
              } block px-3 w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            />
          </div>
          {errors.earnings && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.earnings}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="hours-worked"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Hours worked
          </label>
          <div className="mt-2 flex rounded-md shadow-sm">
            <input
              type="number"
              value={values.hours}
              id="hours-worked"
              onChange={(e) => handle("hours", e.target.valueAsNumber)}
              className={`${
                errors.hours ? "ring-red-500" : "ring-gray-300"
              } px-3 block w-full min-w-0 flex-1 rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            />
            <span className="font-bold inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
              Hours
            </span>
          </div>
          {errors.hours && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.hours}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="miles"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Mileage
          </label>
          <div className="mt-2 flex rounded-md shadow-sm">
            <input
              type="number"
              value={values.miles}
              id="miles"
              onChange={(e) => handle("miles", e.target.valueAsNumber)}
              className={`${
                errors.miles ? "ring-red-500" : "ring-gray-300"
              } px-3 block w-full min-w-0 flex-1 rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            />
            <span className="inline-flex font-bold items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
              Miles
            </span>
          </div>
          {errors.miles && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.miles}
            </span>
          )}
        </div>
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="tax"
              aria-describedby="tax-description"
              name="tax"
              type="checkbox"
              checked={values.tax}
              onChange={(e) => handle("tax", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label
              htmlFor="tax-description"
              className="font-medium text-gray-900"
            >
              Tax
            </label>
            <p id="tax-description" className="text-gray-500">
              Applies - 20% tax to your earnings
            </p>
          </div>
        </div>
        <button
          className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={submit}
        >
          Calculate
        </button>
      </div>
      <div className="max-w-[700px] mx-auto">
        <Tax
          hourlyEarnings={localExpenses.netHours}
          netEarnings={localExpenses.netEarnings}
          mileageEarnings={localExpenses.netMiles}
        />
      </div>
      <div className="max-w-[700px] mx-auto">
        <Faq items={faqs} />
      </div>
    </div>
  );
}

export default App;
