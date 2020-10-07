/* eslint-disable */
const autocannon = require("autocannon")

const cannon = autocannon(
  {
    url: "http://localhost:3000/api/v1/pijasdioas",
    connections: 10,
    pipelining: 1,
    amount: 1000,
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0",
      Accept: "*/*",
      "Accept-Language": "en-GB,ar-EG;q=0.5",
      "content-type": "application/json",
      authorization: "Bearer 0000",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
  },
  console.log
)

cannon.on("reqError", console.log)
