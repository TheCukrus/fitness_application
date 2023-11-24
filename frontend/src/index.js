import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { CategoriesProvider } from "./contexts/ContextCategories.js"
import { UserProvider } from "./contexts/ContextUser.js"
import { NotificationProvider } from "./contexts/ContextNotification.js"
import { CartProvider } from "./contexts/ContextCart.js"
import { BrowserRouter as Router } from "react-router-dom"
import "./assets/styles/index.css"
import "bootstrap/dist/css/bootstrap.min.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Router>
      <NotificationProvider>
        <UserProvider>
          <CartProvider>
            <CategoriesProvider>
              <App />
            </CategoriesProvider>
          </CartProvider>
        </UserProvider>
      </NotificationProvider>
  </Router>
)

