import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.AIRTABLE_API_KEY;

if (!apiKey) {
  throw new Error("Missing AIRTABLE_API_KEY");
}

export default apiKey;
