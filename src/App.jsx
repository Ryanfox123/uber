import { useState } from "react";

const emptyValues = {
  earnings: "",
  hours: 0,
  miles: 0,
  tax: false,
};
function App() {
  const [values, setValues] = useState(emptyValues);
  const [amount, setAmount] = useState(0);

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

    return finalVal.toFixed(2);
  }

  function submit() {
    if (!values.earnings || values.hours < 1 || values.miles < 1) {
      return;
    }

    setAmount(calculateEarnings(values));
    setValues(emptyValues);
  }

  return (
    <main className="w-full pt-4">
      <div className="mx-auto bg-slate-300 flex flex-col gap-y-4 w-max border-2 border-gray-700 px-6 py-2">
        <h1 className="text-xl underline font-bold">
          Uber earnings calculator
        </h1>
        <div className="flex flex-col">
          <label htmlFor="earnings">Earnings: </label>
          <div className="border-2 border-gray-700 flex">
            <div className="px-3 py-1 font-bold border-gray-700 bg-gray-700 text-white">
              £
            </div>
            <input
              id="earnings"
              type="text"
              className="w-full outline-none px-2"
              value={values.earnings}
              onChange={(e) => handle("earnings", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="earnings">Hours worked: </label>
          <div className="border-2 border-gray-700 flex">
            <input
              id="earnings"
              type="number"
              className="w-full outline-none px-2"
              value={values.hours}
              onChange={(e) => handle("hours", e.target.valueAsNumber)}
            />
            <div className="px-3 py-1 font-bold border-gray-700 bg-gray-700 text-white">
              hours
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="earnings">Mileage: </label>
          <div className="border-2 border-gray-700 flex">
            <input
              id="earnings"
              type="number"
              className="w-full outline-none px-2"
              value={values.miles}
              onChange={(e) => handle("miles", e.target.valueAsNumber)}
            />
            <div className="px-3 py-1 font-bold border-gray-700 bg-gray-700 text-white">
              miles
            </div>
          </div>
        </div>
        <div className="flex gap-x-5">
          <label htmlFor="tax">Tax: </label>
          <input
            id="tax"
            type="checkbox"
            className="border-2 border-gray-700"
            checked={values.tax}
            onChange={(e) => handle("tax", e.target.checked)}
          />
        </div>
        <button
          className="border-2  border-gray-700 bg-gray-700 text-white hover:text-black hover:bg-white"
          onClick={submit}
        >
          Calculate
        </button>
      </div>
      <div className="mx-auto bg-slate-300 flex flex-col gap-y-4 w-max border-2 border-gray-700 px-6 py-2 mt-5">
        <p>
          You have earned:
          <span className="text-red-600 text-xl font-semibold italic">
            £{amount}
          </span>
        </p>
      </div>
    </main>
  );
}

export default App;
