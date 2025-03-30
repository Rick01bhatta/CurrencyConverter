import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
    const [data, setData] = useState({});
    const apiKey = "a2c2fca7b2416af24001df94";  // Make sure this is your correct API key

    useEffect(() => {
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((res) => {
                if (res.result === "success" && res.conversion_rates) {
                    setData(res.conversion_rates); // Correctly setting the exchange rates
                } else {
                    console.error("API Response Error:", res);
                }
            })
            .catch((error) => console.error("Error fetching currency data:", error));
    }, [baseCurrency]);

    return data;
}

export default useCurrencyInfo;





