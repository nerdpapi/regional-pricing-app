
import axios from "axios";
import { SUPPORTED_CURRENCIES, IPSTACK_API_URL, IPSTACK_API_KEY } from "../config/currency.js";
const currencyFromCountry = (countryCode) => {
  if (!countryCode) return "INR";
  const upper = countryCode.toUpperCase();
  return SUPPORTED_CURRENCIES[upper] || "INR";
};

export const detectLocation = async (req, res, next) => {
  try {
    if (req.query.currency) {
      req.userCurrency = req.query.currency.toUpperCase();
      console.log(`💰 Currency from query: ${req.userCurrency}`);
      return next();
    }

    const ip = req.query.ip;
    console.log("🌍 Real Client IP:", ip);

    if (!ip) {
      req.userCurrency = "INR";
      return next();
    }

    const { data } = await axios.get(
      `${IPSTACK_API_URL}/${ip}?access_key=${IPSTACK_API_KEY}`
    );

    console.log("📦 Geo API Response:", data);

    const countryCode = data.country_code;
    req.userCountry = countryCode;
    req.userCurrency = currencyFromCountry(countryCode);

    console.log(`✅ ${countryCode} → ${req.userCurrency}`);
    next();
  } catch (err) {
    console.warn("⚠️ Geo lookup failed:", err.message);
    req.userCurrency = "INR";
    next();
  }
};
