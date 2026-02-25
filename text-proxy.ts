// text-proxy.ts
import https from "https";
import { HttpsProxyAgent } from "https-proxy-agent";

async function testGoogle() {
  const proxy = process.env.HTTPS_PROXY;

  console.log("当前 HTTPS_PROXY:", proxy);

  if (!proxy) {
    console.log("❌ 未设置 HTTPS_PROXY");
    process.exit(1);
  }

  const agent = new HttpsProxyAgent(proxy);

  const options = {
    hostname: "www.google.com",
    path: "/",
    method: "GET",
    agent,
    headers: {
      Host: "www.google.com",
      "User-Agent": "NodeProxyTest",
    },
  };

  const req = https.request(options, (res) => {
    console.log("状态码:", res.statusCode);

    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log("返回内容前200字符:");
      console.log(data.slice(0, 200));
    });
  });

  req.on("error", (err) => {
    console.error("❌ 请求失败:", err.message);
  });

  req.end();
}

testGoogle();