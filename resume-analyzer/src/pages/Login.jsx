import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
const [form, setForm] = useState({
email: "",
password: "",
});

const [msg, setMsg] = useState("");

const navigate = useNavigate();

// Input change
const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

// Form submit
const handleSubmit = async (e) => {
e.preventDefault();
setMsg("");

try {
const response = await api.post("/auth/login", form);


console.log("Login response:", response.data);

// Save token
localStorage.setItem("token", response.data.token);

// Save userId only if backend returns the user object
if (response.data.user?.id) {
  localStorage.setItem("userId", response.data.user.id);
} else if (response.data.user?._id) {
  localStorage.setItem("userId", response.data.user._id);
}

setMsg("Login successful!");

setTimeout(() => {
  navigate("/");
}, 1000);


} catch (error) {
console.error("Login error:", error.response?.data || error.message);


setMsg(
  error.response?.data?.message || "Login failed"
);


}
};


return ( <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> <h1 className="text-2xl font-bold mb-4">Login</h1>


  <form
    className="bg-white p-6 rounded shadow-md w-full max-w-sm"
    onSubmit={handleSubmit}
  >
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="email"
      >
        Email
      </label>

      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        name="email"
        type="email"
        placeholder=" Enter yourEmail"
        value={form.email}
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        Password
      </label>

      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
    </div>

    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      type="submit"
    >
      Login
    </button>
  </form>

  {msg && (
    <p className="mt-4 text-center text-red-500">
      {msg}
    </p>
  )}
</div>


);
}
