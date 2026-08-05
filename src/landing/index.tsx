import type { ComponentType } from "react";
import { Landing as LandingImpl } from "./Landing.jsx";

type Props = {
  onLogin?: () => void;
};

/** Typed bridge for the extracted QC Tool_Project landing page. */
export function Landing({ onLogin }: Props) {
  const Impl = LandingImpl as unknown as ComponentType<Props>;
  return <Impl onLogin={onLogin} />;
}
