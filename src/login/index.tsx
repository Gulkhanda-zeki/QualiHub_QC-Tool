import type { ComponentType } from "react";
import { LoginPage as LoginImpl } from "./Login.jsx";

type Props = {
  onLogin?: (session?: unknown) => void;
  onBack?: () => void;
};

/** Typed bridge for the extracted QC Tool_Project login page. */
export function LoginPage({ onLogin, onBack }: Props) {
  const Impl = LoginImpl as unknown as ComponentType<Props>;
  return <Impl onLogin={onLogin} onBack={onBack} />;
}
