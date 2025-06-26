// others
import en from "@/language/en.json";
import { AuthCard } from "@/components";
import { RegisterForm } from "../components";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthCard heading={en.register_header}>
        <RegisterForm />
      </AuthCard>
    </div>
  );
}
