import { useState } from "react";
import InputBox from "./components/INputBox";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";
import "./App.css";

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("USD"); // Ensured uppercase for API consistency
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const CurrencyInfo = useCurrencyInfo(from) || {};
  const options = CurrencyInfo && typeof CurrencyInfo === "object" ? Object.keys(CurrencyInfo) : [];

  const Swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount); // Fix: Now correctly swaps the converted amount
  };

  const convert = () => {
    if (CurrencyInfo[to]) {
      setConvertedAmount(amount * CurrencyInfo[to]); // Fix: Ensures valid multiplication
    } else {
      setConvertedAmount(0); // Prevent NaN issues
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)} 
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={Swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to} 
                amountDisable
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
