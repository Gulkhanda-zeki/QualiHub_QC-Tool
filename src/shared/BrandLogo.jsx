import './brand.css';

const ICON_SRC = '/landing/qualihub-logo-icon-nav.png';

/** @typedef {'inherit' | 'light' | 'dark'} BrandLogoTone */

/**
 * Shared QC Tool brand mark — icon + wordmark.
 * @param {{ size?: number; tone?: BrandLogoTone; className?: string; showWordmark?: boolean; nameClassName?: string }} props
 */
export function BrandLogo({
  size = 40,
  tone = 'inherit',
  className = '',
  showWordmark = true,
  nameClassName = '',
}) {
  const rootClass = ['qc-brand', `qc-brand--${tone}`, className].filter(Boolean).join(' ');

  return (
    <span className={rootClass} style={{ '--brand-size': `${size}px` }}>
      <img
        src={ICON_SRC}
        alt=""
        className="qc-brand__mark"
        width={size}
        height={size}
        decoding="async"
      />
      {showWordmark && (
        <span className={['qc-brand__name', nameClassName].filter(Boolean).join(' ')}>
          <span className="qc-brand__qc">QC</span>
          <span className="qc-brand__tool"> Tool</span>
        </span>
      )}
    </span>
  );
}
