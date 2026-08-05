const SESSION_KEY = 'qc_session';

/** Demo organization admin — replace with API role check when backend is ready. */
export const ORGADMIN_DEMO = {
  email: 'admin@heliostravel.io',
  password: 'OrgAdmin123!',
};

/** Demo super admin — replace with API role check when backend is ready. */
export const SUPERADMIN_DEMO = {
  email: 'superadmin@qctool.com',
  password: 'SuperAdmin123!',
};

/** Demo QA lead — replace with API role check when backend is ready. */
export const QALEAD_DEMO = {
  email: 'sana@northwindqa.com',
  password: 'QALead123!',
};

export function saveSession(session, remember = false) {
  const payload = JSON.stringify({
    ...session,
    at: Date.now(),
  });
  if (remember) {
    localStorage.setItem(SESSION_KEY, payload);
    sessionStorage.removeItem(SESSION_KEY);
  } else {
    sessionStorage.setItem(SESSION_KEY, payload);
    localStorage.removeItem(SESSION_KEY);
  }
}

export function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
}

export function isSuperAdminSession(session = getSession()) {
  return session?.role === 'superadmin';
}

export function isOrgAdminSession(session = getSession()) {
  return session?.role === 'orgadmin';
}

export function isQALeadSession(session = getSession()) {
  return session?.role === 'qalead';
}

export function requireOrgAdmin() {
  if (!isOrgAdminSession()) {
    window.location.href = '/login?redirect=orgadmin';
    return false;
  }
  return true;
}

export function requireQALead() {
  if (!isQALeadSession()) {
    window.location.href = '/login?redirect=qalead';
    return false;
  }
  return true;
}

export function tryDemoQALeadLogin(email, password) {
  const normalized = email.trim().toLowerCase();
  if (
    normalized === QALEAD_DEMO.email
    && password === QALEAD_DEMO.password
  ) {
    return {
      email: QALEAD_DEMO.email,
      name: 'Sana Rauf',
      role: 'qalead',
      workspace: 'Northwind QA',
    };
  }
  return null;
}

export function tryDemoOrgAdminLogin(email, password) {
  const normalized = email.trim().toLowerCase();
  if (
    normalized === ORGADMIN_DEMO.email
    && password === ORGADMIN_DEMO.password
  ) {
    return {
      email: ORGADMIN_DEMO.email,
      name: 'Jordan Maes',
      role: 'orgadmin',
      workspace: 'Helios Travel Group',
    };
  }
  return null;
}

export function requireSuperAdmin() {
  if (!isSuperAdminSession()) {
    window.location.href = '/login?redirect=superadmin';
    return false;
  }
  return true;
}

export function tryDemoSuperAdminLogin(email, password) {
  const normalized = email.trim().toLowerCase();
  if (
    normalized === SUPERADMIN_DEMO.email
    && password === SUPERADMIN_DEMO.password
  ) {
    return {
      email: SUPERADMIN_DEMO.email,
      name: 'Zeki Control',
      role: 'superadmin',
    };
  }
  return null;
}
