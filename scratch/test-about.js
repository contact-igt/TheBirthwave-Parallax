const http = require("http");

http.get("http://localhost:3000/about", (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    const idx = data.indexOf('id="clinic-location"');
    if (idx !== -1) {
      console.log(data.substring(idx - 50, idx + 2500));
    } else {
      console.log("NOT FOUND");
    }
  });
});
