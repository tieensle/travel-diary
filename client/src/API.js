//@ts-nocheck
const API_URL = "http://localhost:5000";

async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}
async function createLogEntry(entry) {
  const apiKey = entry.apiKey;
  delete entry.apiKey;
  const response = await fetch(`${API_URL}/api/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify(entry),
  });
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  throw json;
  //? this is second method ?
  // const err = new Error(json.message);
  // err.response = json;
  // throw err;
}
export { listLogEntries, createLogEntry };
