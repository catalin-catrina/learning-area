import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Alert, Button, buttonClasses, Checkbox, Input, LabelNote } from "../../../shared/ui";
import { useAuth } from "../hooks/useAuth";
import AuthCard, { AuthDivider } from "./AuthCard";

type Form = { firstName: string; lastName: string; email: string; phone: string; password: string };
type Errors = Partial<Record<keyof Form | "adult", string>>;

const empty: Form = { firstName: "", lastName: "", email: "", phone: "", password: "" };

function validate(f: Form, adult: boolean): Errors {
  const e: Errors = {};
  if (!f.firstName.trim()) e.firstName = "Enter your first name";
  if (!f.lastName.trim()) e.lastName = "Enter your last name";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address";
  // same rule as the API: digits, spaces, dashes, brackets, optional leading +
  if (!/^\+?[\d\s().-]{7,20}$/.test(f.phone.trim())) e.phone = "Enter a phone number, e.g. +40 721 555 014";
  if (f.password.length < 8) e.password = "Use at least 8 characters";
  if (!adult) e.adult = "You must be 18 or over to buy alcohol";
  return e;
}

// Design 9c. First + last name are joined into the account's one `name`;
// the phone is required by the API (the courier uses it).
const Register = () => {
  const [form, setForm] = useState<Form>(empty);
  const [adult, setAdult] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const { handleRegister, loading, error } = useAuth();
  const location = useLocation();

  const set = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(form, adult);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    handleRegister({
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
    });
  };

  return (
    <AuthCard title="Create an account" intro="One account for orders, favorites and saved addresses.">
      {error && (
        <Alert title="We couldn't create your account">
          {error === "Email or phone number already in use"
            ? "That email or phone number already has an account. Try signing in instead."
            : error}
        </Alert>
      )}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="First name" autoComplete="given-name" value={form.firstName} onChange={set("firstName")} error={errors.firstName} />
          <Input label="Last name" autoComplete="family-name" value={form.lastName} onChange={set("lastName")} error={errors.lastName} />
        </div>
        <Input label="Email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
        <Input
          label={<>Phone <LabelNote>for the courier</LabelNote></>}
          type="tel"
          autoComplete="tel"
          placeholder="+40 721 555 014"
          value={form.phone}
          onChange={set("phone")}
          error={errors.phone}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          hint="At least 8 characters. A short sentence works well."
          value={form.password}
          onChange={set("password")}
          error={errors.password}
        />
        <Checkbox
          label={<>I'm 18 or over<span className="text-muted"> · required to buy alcohol</span></>}
          checked={adult}
          onChange={(e) => setAdult(e.target.checked)}
          error={errors.adult}
        />
        <Button type="submit" loading={loading} className="w-full">
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>
      <AuthDivider>Already have an account?</AuthDivider>
      <Link to="/login" state={location.state} className={buttonClasses({ variant: "secondary", className: "w-full" })}>
        Sign in
      </Link>
    </AuthCard>
  );
};

export default Register;
