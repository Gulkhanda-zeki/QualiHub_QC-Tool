import { useEffect, useState } from "react";
import { LoginPage } from "./LoginPage";
import { Landing } from "./landing";
import { OrgAdminApp } from "./orgadmin";
import { QALeadApp } from "./qalead";
import { SuperAdminApp } from "./superadmin";
import { getSession, clearSession } from "./shared/auth.js";

export default function App() {
  const [view, setView] = useState<"landing" | "login" | "app" | "orgadmin" | "qalead">("landing");

  useEffect(() => {
    const session = getSession();
    if (session) {
      if (session.role === "orgadmin") setView("orgadmin");
      else if (session.role === "qalead") setView("qalead");
      else setView("app");
      return;
    }

    if (window.location.pathname === "/login") {
      setView("login");
    }
  }, []);

  const handleLogout = () => {
    clearSession();
    setView("login");
  };

  const handleLogin = (session?: unknown) => {
    const role = session && typeof session === "object" && "role" in session
      ? (session as { role?: string }).role
      : undefined;
    if (role === "orgadmin") setView("orgadmin");
    else if (role === "qalead") setView("qalead");
    else setView("app");
  };

  if (view === "landing") {
    return <Landing onLogin={() => setView("login")} />;
  }

  if (view === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onBack={() => setView("landing")}
      />
    );
  }

  if (view === "orgadmin") {
    return <OrgAdminApp onLogout={handleLogout} />;
  }

  if (view === "qalead") {
    return <QALeadApp onLogout={handleLogout} />;
  }

  return <SuperAdminApp onLogout={handleLogout} />;
}
