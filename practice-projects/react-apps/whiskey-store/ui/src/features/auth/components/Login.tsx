import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Alert, Button, buttonClasses, Input } from "../../../shared/ui";
import { useAuth } from "../hooks/useAuth";
import AuthCard, { AuthDivider } from "./AuthCard";

// Designs 9a / 9b. ("Forgot password?" and "Keep me signed in" are post-release.)
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading, error } = useAuth();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  const wrongCredentials = !!error;

  return (
    <AuthCard title="Sign in" intro="Track orders, keep your favorites and check out faster.">
      {wrongCredentials && (
        <Alert title="That email and password don't match.">Check for typos and try again.</Alert>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          value={email}
          aria-invalid={wrongCredentials || undefined}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          aria-invalid={wrongCredentials || undefined}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" loading={loading} className="w-full">
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      <AuthDivider>New to Dramshop?</AuthDivider>
      {/* keep "where they came from", so signing up also returns them there */}
      <Link to="/register" state={location.state} className={buttonClasses({ variant: "secondary", className: "w-full" })}>
        Create an account
      </Link>
    </AuthCard>
  );
};

export default Login;
