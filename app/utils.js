import { useEffect } from "react";
import Airtable from "airtable";

export const AIRTABLE_BASE = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
export const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
export const AIRTABLE = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);

/**
 * @param {() => Promise<void>} cb
 * @param {React.DependencyList} deps
 */
export const useEffectAsync = (cb, deps = undefined) => useEffect(() => void cb(), deps);
