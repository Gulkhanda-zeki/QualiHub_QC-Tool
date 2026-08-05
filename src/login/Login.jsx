/* QCTool Login — extracted from QC Tool_Project */
import { useState, useEffect } from 'react';
import './login.css';
import {
  saveSession,
  tryDemoSuperAdminLogin,
  tryDemoOrgAdminLogin,
  tryDemoQALeadLogin,
} from '../shared/auth.js';
import { BrandLogo } from '../shared/BrandLogo.jsx';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 16 18" fill="currentColor" aria-hidden="true">
      <path d="M13.02 9.48c-.02-2.17 1.77-3.21 1.85-3.27-1.01-1.47-2.58-1.67-3.14-1.7-1.34-.14-2.62.79-3.3.79-.68 0-1.73-.77-2.85-.75-1.47.02-2.82.85-3.58 2.16-1.53 2.65-.39 6.57 1.1 8.72.73 1.06 1.6 2.25 2.74 2.21 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.86.69 1.18-.02 1.93-1.08 2.65-2.14.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.31-.89-2.33-3.53zm-2.19-6.5c.6-.73 1.01-1.74.89-2.75-.87.04-1.92.58-2.54 1.31-.56.65-1.05 1.69-.92 2.69.97.07 1.96-.5 2.57-1.25z" />
    </svg>
  );
}

function AiChatbotAnim() {
  return (
    <div className="qc-login__bot" aria-hidden="true">
      <div className="qc-login__bot-orbits">
        <span />
        <span />
        <span />
      </div>
      <div className="qc-login__bot-panel">
        <div className="qc-login__bot-head">
          <span className="qc-login__bot-avatar">
            <i className="ph ph-robot" />
          </span>
          <div>
            <strong>QC Assistant</strong>
            <em>Online · scoring live</em>
          </div>
          <span className="qc-login__bot-pulse" />
        </div>
        <div className="qc-login__bot-msgs">
          <p className="qc-login__bot-msg qc-login__bot-msg--in">
            Review call #4192 for refund disclosure.
          </p>
          <p className="qc-login__bot-msg qc-login__bot-msg--out">
            Found miss at 02:14 — citation ready.
          </p>
          <p className="qc-login__bot-msg qc-login__bot-msg--in qc-login__bot-msg--typing">
            <span /><span /><span />
          </p>
        </div>
      </div>
    </div>
  );
}

function LoginPromoPanel() {
  return (
    <aside className="qc-login__promo">
      <div className="qc-login__promo-bg" aria-hidden="true">
        <div className="qc-login__promo-aurora" />
        <div className="qc-login__promo-grid" />
      </div>

      <div className="qc-login__promo-inner">
        <div className="qc-login__bot-stage">
          <AiChatbotAnim />
        </div>

        <div className="qc-login__promo-brand">
          <span className="qc-login__promo-logo">
            <BrandLogo tone="dark" size={52} showWordmark={false} />
          </span>
          <div className="qc-login__promo-copy">
            <h2>A unified hub for smarter quality assurance decisions</h2>
            <p>
              QCTool is your QA command center — forensic scoring, compliance checkpoints,
              and cited evidence on every call.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function LoginPage({ onLogin, onBack } = {}) {
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [entered, setEntered] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    requestAnimationFrame(() => setEntered(true));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('redirect') === 'superadmin') setEmail('superadmin@qctool.com');
    if (params.get('redirect') === 'orgadmin') setEmail('admin@heliostravel.io');
    if (params.get('redirect') === 'qalead') setEmail('sana@northwindqa.com');
  }, []);

  function switchMode(next) {
    setMode(next);
    setError('');
    setSuccess('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  function handleSubmitPressStart() {
    if (loading) return;
    setPressing(true);
  }

  function handleSubmitPressEnd() {
    window.setTimeout(() => setPressing(false), 120);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'signup') {
      if (!name.trim() || !email.trim() || !password || !confirmPassword) {
        setError('Fill in all fields to create your account.');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!acceptTerms) {
        setError('Accept the Terms & Conditions to continue.');
        return;
      }

      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 700));
        setSuccess('Account request submitted. Your workspace admin will send an invite shortly.');
        setPassword('');
        setConfirmPassword('');
        setAcceptTerms(false);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim(), password, remember }),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        const session = {
          email: data.email || email.trim(),
          name: data.name || data.email || email.trim(),
          role: data.role || 'user',
        };
        saveSession(session, remember);
        if (typeof onLogin === 'function') onLogin(session);
        return;
      }

      const demo = tryDemoSuperAdminLogin(email, password)
        || tryDemoOrgAdminLogin(email, password)
        || tryDemoQALeadLogin(email, password);
      if (demo) {
        saveSession(demo, remember);
        if (typeof onLogin === 'function') onLogin(demo);
        return;
      }

      if (res.status === 401) {
        setError('Invalid email or password. Try again or contact your admin.');
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data.detail || data.message || 'Unable to sign in right now. Please try again.');
    } catch {
      const demo = tryDemoSuperAdminLogin(email, password)
        || tryDemoOrgAdminLogin(email, password)
        || tryDemoQALeadLogin(email, password);
      if (demo) {
        saveSession(demo, remember);
        if (typeof onLogin === 'function') onLogin(demo);
        return;
      }
      setError('Cannot reach the sign-in service. Check your connection or try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`qc-login${loading ? ' is-loading' : ''}`}>
      <div className="qc-login__shell">
        <section className={`qc-login__form-panel${entered ? ' is-entered' : ''}${loading ? ' is-loading' : ''}`}>
          <header className="qc-login__header qc-login__reveal" style={{ '--reveal-i': 0 }}>
            <a
              href="#home"
              className="qc-login__logo"
              onClick={(ev) => {
                ev.preventDefault();
                if (typeof onBack === 'function') onBack();
              }}
            >
              <BrandLogo tone="light" size={32} className="qc-brand--lg" />
            </a>
          </header>

          <div className="qc-login__body">
            <div className="qc-login__intro qc-login__reveal" style={{ '--reveal-i': 1 }}>
              <h1>{mode === 'signup' ? 'Create your QCTool account' : 'Welcome to QCTool'}</h1>
              <p>
                {mode === 'signup'
                  ? 'Set up access for your QA workspace. An admin will confirm your invite.'
                  : 'Start your experience with QCTool by signing in or signing up.'}
              </p>
            </div>

            <div
              className="qc-login__mode qc-login__reveal"
              role="tablist"
              aria-label="Authentication mode"
              style={{ '--reveal-i': 2 }}
            >
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'signin'}
                className={`qc-login__mode-btn${mode === 'signin' ? ' is-active' : ''}`}
                onClick={() => switchMode('signin')}
              >
                Sign In
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'signup'}
                className={`qc-login__mode-btn${mode === 'signup' ? ' is-active' : ''}`}
                onClick={() => switchMode('signup')}
              >
                Sign Up
              </button>
            </div>

            <form className="qc-login__form" onSubmit={handleSubmit} noValidate>
              {error ? (
                <div className="qc-login__error" role="alert">{error}</div>
              ) : null}
              {success ? (
                <div className="qc-login__success" role="status">{success}</div>
              ) : null}

              {mode === 'signup' ? (
                <div className="qc-login__field qc-login__reveal" style={{ '--reveal-i': 3 }}>
                  <label htmlFor="login-name">Full Name<span aria-hidden="true">*</span></label>
                  <div className="qc-login__input-wrap">
                    <i className="ph ph-user qc-login__input-icon" aria-hidden="true" />
                    <input
                      id="login-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(ev) => setName(ev.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>
              ) : null}

              <div className="qc-login__field qc-login__reveal" style={{ '--reveal-i': mode === 'signup' ? 4 : 3 }}>
                <label htmlFor="login-email">Email Address<span aria-hidden="true">*</span></label>
                <div className="qc-login__input-wrap">
                  <i className="ph ph-envelope-simple qc-login__input-icon" aria-hidden="true" />
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="qc-login__field qc-login__reveal" style={{ '--reveal-i': mode === 'signup' ? 5 : 4 }}>
                <label htmlFor="login-password">Password<span aria-hidden="true">*</span></label>
                <div className="qc-login__input-wrap qc-login__password">
                  <i className="ph ph-lock qc-login__input-icon" aria-hidden="true" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    placeholder={mode === 'signup' ? 'Create a password' : 'Enter your password'}
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    className="qc-login__toggle-pw"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={`ph ${showPassword ? 'ph-eye-slash' : 'ph-eye'}`} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {mode === 'signup' ? (
                <div className="qc-login__field qc-login__reveal" style={{ '--reveal-i': 6 }}>
                  <label htmlFor="login-confirm-password">Confirm Password<span aria-hidden="true">*</span></label>
                  <div className="qc-login__input-wrap qc-login__password">
                    <i className="ph ph-lock-key qc-login__input-icon" aria-hidden="true" />
                    <input
                      id="login-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(ev) => setConfirmPassword(ev.target.value)}
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      className="qc-login__toggle-pw"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      <i className={`ph ${showConfirmPassword ? 'ph-eye-slash' : 'ph-eye'}`} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ) : null}

              {mode === 'signin' ? (
                <div className="qc-login__row qc-login__reveal" style={{ '--reveal-i': 5 }}>
                  <label className="qc-login__remember">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(ev) => setRemember(ev.target.checked)}
                      disabled={loading}
                    />
                    Remember me
                  </label>
                  <a href="#" className="qc-login__forgot" onClick={(ev) => ev.preventDefault()}>
                    Forgot password?
                  </a>
                </div>
              ) : (
                <div className="qc-login__row qc-login__reveal" style={{ '--reveal-i': 7 }}>
                  <label className="qc-login__remember">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(ev) => setAcceptTerms(ev.target.checked)}
                      disabled={loading}
                    />
                    I agree to the Terms &amp; Privacy Policy
                  </label>
                </div>
              )}

              <button
                type="submit"
                className={`qc-login__submit qc-login__reveal${loading ? ' is-loading' : ''}${pressing ? ' is-pressing' : ''}`}
                style={{ '--reveal-i': mode === 'signup' ? 8 : 6 }}
                disabled={loading}
                onMouseDown={handleSubmitPressStart}
                onMouseUp={handleSubmitPressEnd}
                onMouseLeave={() => setPressing(false)}
                onTouchStart={handleSubmitPressStart}
                onTouchEnd={handleSubmitPressEnd}
              >
                {loading ? <span className="qc-login__submit-spinner" aria-hidden="true" /> : null}
                <span className="qc-login__submit-label">
                  {loading
                    ? (mode === 'signup' ? 'Creating account…' : 'Signing in…')
                    : (mode === 'signup' ? 'Create Account' : 'Sign In')}
                </span>
              </button>
            </form>

            <div className="qc-login__divider qc-login__reveal" style={{ '--reveal-i': mode === 'signup' ? 9 : 7 }}>
              <span>Or continue with</span>
            </div>

            <div className="qc-login__social qc-login__reveal" style={{ '--reveal-i': mode === 'signup' ? 10 : 8 }}>
              <button type="button" className="qc-login__social-icon" disabled={loading} aria-label="Continue with Google">
                <GoogleIcon />
              </button>
              <button type="button" className="qc-login__social-icon" disabled={loading} aria-label="Continue with Apple">
                <AppleIcon />
              </button>
            </div>
          </div>

          <footer className="qc-login__legal">
            <span>Copyright © 2026 QCTool Enterprises LTD.</span>
            <span className="qc-login__legal-links">
              <a href="#terms" onClick={(ev) => ev.preventDefault()}>Terms &amp; Conditions</a>
              <a href="#privacy" onClick={(ev) => ev.preventDefault()}>Privacy &amp; Policy</a>
            </span>
          </footer>
        </section>

        <LoginPromoPanel />
      </div>
    </div>
  );
}

