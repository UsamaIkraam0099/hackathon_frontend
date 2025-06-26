// others
import en from "@/language/en.json";
import { AuthCard } from "@/components";
import { LoginForm } from "../components";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthCard heading={en.login_header}>
        <LoginForm />
      </AuthCard>
    </div>
  );
}
