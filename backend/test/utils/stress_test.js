import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  stages: [
    { duration: "1m", target: 5500 }, // simulate ramp-up of traffic from 1 to 500 users over 1 minute.
    { duration: "3m", target: 5500 }, // stay at 500 users for 3 minutes
    { duration: "1m", target: 0 }, // ramp-down to 0 users
  ],

  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
  },
};

const url = "https://api.fastnote.space/api/documents";
const access_token = "";
export default function () {
  let headers = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  let res = http.get(url, headers);
  check(res, { "status was 200": (r) => r.status == 200 }); // verify the response status
  check(res, { "status was 400": (r) => r.status == 400 }); // verify the response status

  sleep(1);
}
