# Web Request Lifecycle

The Web Request Lifecycle describes what happens when a user enters a URL in a browser and requests a web page or resource from a server.

## Lifecycle Overview

The request goes through several steps:

**Browser → URL → DNS → IP → HTTP Request → Web Server → Backend Application → Response → Browser**

---

## 1. Browser

The process starts when the user opens a web browser such as Chrome, Firefox, or Edge.

The user enters a URL in the browser's address bar and presses Enter.

Example:

```text
https://example.com
```

## 2. URL
**A URL can contain different parts such as:**
- Protocol: https
- Domain: example.com
- Path: /products

## 3. DNS
DNS is responsible for finding the IP address associated with the domain name.
## 4. IP
The IP address identifies the destination server that the browser needs to communicate with.
## 5. HTTP Request
The request tells the server what the client wants. 

HTTP requests can use different methods, such as:
- GET 
- POST 
- PUT 
- DELETE 
## 6. WEb Server
The Web Server receives the HTTP request.

Its job can include receiving requests, serving static files, and forwarding requests to the backend application when necessary.
## 7. Backend Application
If the request requires application logic, the Web Server passes it to the Backend Application.
## 8. Response
After processing the request, the server sends an HTTP response back to the browser.
## 9.Browser
Finally, the response reaches the browser.

The browser processes the received data and displays the requested content to the user.

