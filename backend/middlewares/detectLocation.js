// middleware/detectLocation.js
import axios from "axios";
import { SUPPORTED_CURRENCIES, IPSTACK_API_URL, IPSTACK_API_KEY } from "../config/currency.js";

const getClientIp = (req) => {
  const xff = req.headers["x-forwarded-for"];
  if (xff) return xff.split(",")[0].trim();
  return req.socket.remoteAddress;
};

const currencyFromCountry = (countryCode) => {
  if (!countryCode) return "USD";
  const upper = countryCode.toUpperCase();
  return SUPPORTED_CURRENCIES[upper] || "USD";
};

export const detectLocation = async (req, res, next) => {
  try {
    // 🔹 If currency is provided manually via query
    if (req.query.currency) {
      req.userCurrency = req.query.currency.toUpperCase();
      console.log(`💰 Currency from query: ${req.userCurrency}`);
      return next();
    }

    // 🔹 Detect client IP
    const ip = getClientIp(req);
    console.log(`🌍 Detected client IP: ${ip}`);

    const url = `${IPSTACK_API_URL}/${ip}?access_key=${IPSTACK_API_KEY}`;
    console.log(`🌐 Fetching geo info from: ${url}`);

    const { data } = await axios.get(url);

    console.log("📦 Geo API response:", data);

    const countryCode = data.country || data.country_code;
    req.userCountry = countryCode;
    req.userCurrency = currencyFromCountry(countryCode);

    console.log(`✅ User country: ${req.userCountry}`);
    console.log(`💱 User currency: ${req.userCurrency}`);

    next();
  } catch (err) {
    console.warn("⚠️ IP detection failed:", err.message);
    req.userCurrency = "USD"; // fallback
    next();
  }
};
