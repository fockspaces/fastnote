import { healthCheck, lambdaHealthCheck } from "../../../controllers/healthCheck";
import httpMocks from "node-mocks-http";

describe("Health Check Controller", () => {
  it("should return 200 status and success message", () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/lambda',
      headers: {
        "x-forwarded-for": "127.0.0.1"
      },
      query: {
        message: "Test message"
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    lambdaHealthCheck(req, res, next);
    const data = JSON.parse(res._getData());

    expect(res.statusCode).toBe(200);
    expect(data).toEqual({ message: "Test message" });
  });

  it("should return 200 status and OK status for healthCheck", () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    healthCheck(req, res, next);
    const data = JSON.parse(res._getData());

    expect(res.statusCode).toBe(200);
    expect(data).toEqual({ status: "OK" });
  });
});
