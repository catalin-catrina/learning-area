import { useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4 ">
          <div className={styles.formFieldsUser}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border"
            />
          </div>

          <div className={styles.formFieldsPass}>
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border"
            />
          </div>
        </div>

        <div className={styles.formButton}>
          <button
            type="submit"
            className="px-6 py-4 bg-violet-900 text-gray-100 text-lg text-center"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
