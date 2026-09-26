const http = require("http");
const { getUsers } = require("./user-controller");
const { getProducts } = require("./products-controller");
const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });

    res.end("Welcome to the homepage!\n");
  }

  else if (req.url === "/api/users" && req.method === "GET") {
    const users = getUsers();

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(users));
  }
  
  else if (req.url === "/api/products" && req.method === "GET") {
    const products = getProducts();

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(products));
  } 


    else if (req.url === "/send-products" && req.method === "POST") { 

    let body = ""; 
     
    req.on("data", (chunk) => {     
        body += chunk.toString(); 
    }); 
 
    req.on("end", () => { 

        const product = JSON.parse(body); 

        console.log("Received product:", product);

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "Product received successfully",
            product: product
        }));
    });   
} 


  else  {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
