process.env.MYSQL_URI = "mysql://user:password@127.0.0.1:3306/dbrew_test";
process.env.NODE_ENV = "test";

const test = require("node:test");
const assert = require("node:assert/strict");
const { app } = require("../app");
const fs = require("node:fs");
const path = require("node:path");

let server;
let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", () => {
      baseUrl = `http://127.0.0.1:${server.address().port}`;
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test("health endpoint responds without exposing framework metadata", async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
  assert.equal(response.headers.get("x-powered-by"), null);
});

test("contact endpoint rejects incomplete payload before touching the database", async () => {
  const response = await fetch(`${baseUrl}/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Rockwell" }),
  });
  assert.equal(response.status, 400);
});

test("registration rejects weak passwords", async () => {
  const response = await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username: "rockwell", email: "rockwell@example.com", password: "short" }),
  });
  assert.equal(response.status, 400);
});

test("portfolio entry point exposes the core journeys", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "..", "client", "index.html"), "utf8");
  for (const expected of ["product-grid", "contact-form", "login-form", "register-form", "cart-dialog"]) {
    assert.match(html, new RegExp(`id=\\"${expected}\\"`));
  }
});
