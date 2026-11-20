/**
 * @jest-environment node
 */

const baseUrl = "http://127.0.0.1:8000/LAMPAPI";

async function postJson(endpoint, payload) {
  const response = await fetch(`${baseUrl}/${endpoint}.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(5000)
  });

  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toContain("application/json");

  return response.json();
}

test("a color added through the API can be retrieved for the same user", async () => {
  const color = `Blue-${Date.now()}`;
  const userId = 1;

  const addResult = await postJson("AddColor", { color, userId });
  expect(addResult).toEqual({ error: "" });

  const searchResult = await postJson("SearchColors", {
    search: color,
    userId
  });

  expect(searchResult).toEqual({
    results: [color],
    error: ""
  });
}, 15000);