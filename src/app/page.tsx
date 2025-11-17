// app/page.tsx

import { LoginForm } from "@/components/LoginForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-96">
        <LoginForm />
      </div>
    </div>
  );
}
