import { RouterProvider } from "@tanstack/react-router";
import { router } from "./4.Routing/router";
import { AuthProvider } from "./2.Context/Auth.context";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
