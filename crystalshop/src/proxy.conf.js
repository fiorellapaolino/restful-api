const PROXY_CONFIG = [
  {
      context: [
          "/stock",
          "/client",
],
      target: "http://localhost:5000",
      secure: false
  }
]
