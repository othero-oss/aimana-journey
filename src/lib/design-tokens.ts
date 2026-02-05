/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA DESIGN SYSTEM - Design Tokens
 * AI-First Journey Platform
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Single source of truth for all design tokens.
 * These values are used in both Tailwind config and CSS variables.
 */

// ─────────────────────────────────────────────────────────────────────────────
// COLOR PALETTE
// ─────────────────────────────────────────────────────────────────────────────

export const colors = {
  // Primary Brand Colors
  aimana: {
    navy: '#0A1628',           // Primary dark - backgrounds, headers, text
    navyLight: '#0F2847',      // Lighter navy for hover states
    blue: '#3B6B8C',           // Secondary blue - links, accents
    blueLight: '#4A8DB7',      // Lighter blue for gradients
    teal: '#4ECDC4',           // Primary accent - CTAs, highlights, success
    tealLight: '#6EE7DF',      // Lighter teal for hover states
    mint: '#50D9B3',           // Alternative accent color
  },

  // Journey Phase Colors
  phase: {
    plan: '#3B6B8C',           // PLANEJAR - Blue
    planBg: 'rgba(59, 107, 140, 0.1)',
    planBorder: 'rgba(59, 107, 140, 0.2)',

    execute: '#4ECDC4',        // EXECUTAR - Teal
    executeBg: 'rgba(78, 205, 196, 0.1)',
    executeBorder: 'rgba(78, 205, 196, 0.3)',

    manage: '#0A1628',         // GERIR - Navy
    manageBg: 'rgba(10, 22, 40, 0.1)',
    manageBorder: 'rgba(10, 22, 40, 0.2)',
  },

  // Status Colors
  status: {
    success: '#4ECDC4',        // Teal
    successBg: 'rgba(78, 205, 196, 0.1)',

    warning: '#F8A325',        // Orange
    warningBg: 'rgba(248, 163, 37, 0.1)',

    error: '#E8384F',          // Red
    errorBg: 'rgba(232, 56, 79, 0.1)',

    pending: '#9CA3AF',        // Gray
    pendingBg: 'rgba(156, 163, 175, 0.1)',

    info: '#3B6B8C',           // Blue
    infoBg: 'rgba(59, 107, 140, 0.1)',
  },

  // Surface Colors (backgrounds, cards)
  surface: {
    white: '#FFFFFF',
    light: '#F6F8FA',
    hover: '#F1F3F5',
    border: '#E5E7EB',
    borderStrong: '#D1D5DB',
    dark: '#0A1628',
    darkHover: '#0F2847',
  },

  // Text Colors
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
    link: '#3B6B8C',
    linkHover: '#4A8DB7',
  },

  // Neutral Grays
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY
// ─────────────────────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],        // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],       // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
    '5xl': ['3rem', { lineHeight: '1' }],           // 48px
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SPACING & SIZING
// ─────────────────────────────────────────────────────────────────────────────

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// BORDERS & RADIUS
// ─────────────────────────────────────────────────────────────────────────────

export const borderRadius = {
  none: '0',
  sm: '0.25rem',     // 4px
  DEFAULT: '0.5rem', // 8px
  md: '0.5rem',      // 8px
  lg: '0.75rem',     // 12px
  xl: '1rem',        // 16px
  '2xl': '1.5rem',   // 24px
  full: '9999px',
} as const;

export const borderWidth = {
  DEFAULT: '1px',
  0: '0',
  2: '2px',
  3: '3px',
  4: '4px',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SHADOWS
// ─────────────────────────────────────────────────────────────────────────────

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',

  // Custom Aimana shadows
  card: '0 1px 3px rgba(0, 0, 0, 0.08)',
  cardHover: '0 4px 12px rgba(0, 0, 0, 0.15)',
  sidebar: '2px 0 8px rgba(0, 0, 0, 0.1)',
  dropdown: '0 4px 16px rgba(0, 0, 0, 0.12)',
  modal: '0 20px 40px rgba(0, 0, 0, 0.2)',

  // Glow effects
  tealGlow: '0 0 20px rgba(78, 205, 196, 0.3)',
  blueGlow: '0 0 20px rgba(59, 107, 140, 0.3)',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TRANSITIONS & ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────

export const transitions = {
  duration: {
    fast: '150ms',
    DEFAULT: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  timing: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export const animations = {
  keyframes: {
    float: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-10px)' },
    },
    slideUp: {
      from: { transform: 'translateY(10px)', opacity: '0' },
      to: { transform: 'translateY(0)', opacity: '1' },
    },
    slideDown: {
      from: { transform: 'translateY(-10px)', opacity: '0' },
      to: { transform: 'translateY(0)', opacity: '1' },
    },
    slideIn: {
      from: { transform: 'translateX(-10px)', opacity: '0' },
      to: { transform: 'translateX(0)', opacity: '1' },
    },
    fadeIn: {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' },
    },
    spin: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
  },
  animation: {
    float: 'float 6s ease-in-out infinite',
    slideUp: 'slideUp 0.3s ease-out',
    slideDown: 'slideDown 0.3s ease-out',
    slideIn: 'slideIn 0.2s ease-out',
    fadeIn: 'fadeIn 0.2s ease-out',
    pulseSlow: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    spin: 'spin 1s linear infinite',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// GRADIENTS
// ─────────────────────────────────────────────────────────────────────────────

export const gradients = {
  // Background gradients
  header: 'linear-gradient(135deg, #0A1628 0%, #0F2847 100%)',
  headerExtended: 'linear-gradient(135deg, #0A1628 0%, #3B6B8C 100%)',
  celebration: 'linear-gradient(135deg, #0A1628 0%, #3B6B8C 50%, #4ECDC4 100%)',

  // Accent gradients
  primary: 'linear-gradient(135deg, #4ECDC4 0%, #3B6B8C 100%)',
  teal: 'linear-gradient(135deg, #4ECDC4 0%, #50D9B3 100%)',
  blue: 'linear-gradient(135deg, #3B6B8C 0%, #4A8DB7 100%)',

  // Progress/Journey gradient
  journey: 'linear-gradient(90deg, #0A1628 0%, #3B6B8C 50%, #4ECDC4 100%)',

  // Subtle gradients for backgrounds
  subtleLight: 'linear-gradient(180deg, #FFFFFF 0%, #F6F8FA 100%)',
  subtleDark: 'linear-gradient(180deg, #0A1628 0%, #0F2847 100%)',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Z-INDEX SCALE
// ─────────────────────────────────────────────────────────────────────────────

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// BREAKPOINTS
// ─────────────────────────────────────────────────────────────────────────────

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT-SPECIFIC TOKENS
// ─────────────────────────────────────────────────────────────────────────────

export const components = {
  // Sidebar
  sidebar: {
    width: '280px',
    widthCollapsed: '72px',
    background: colors.aimana.navy,
    itemPadding: '0.5rem 1rem',
    itemRadius: '0.5rem',
  },

  // Cards
  card: {
    padding: '1.5rem',
    radius: '0.75rem',
    shadow: shadows.card,
    shadowHover: shadows.cardHover,
  },

  // Buttons
  button: {
    heightSm: '2rem',      // 32px
    heightMd: '2.5rem',    // 40px
    heightLg: '3rem',      // 48px
    paddingXSm: '0.75rem', // 12px
    paddingXMd: '1rem',    // 16px
    paddingXLg: '1.5rem',  // 24px
    radius: '0.5rem',
  },

  // Inputs
  input: {
    height: '2.5rem',      // 40px
    paddingX: '0.75rem',   // 12px
    radius: '0.5rem',
    borderColor: colors.surface.border,
    focusRing: `0 0 0 2px rgba(78, 205, 196, 0.2)`,
  },

  // Badges
  badge: {
    paddingX: '0.625rem',  // 10px
    paddingY: '0.25rem',   // 4px
    radius: '9999px',
    fontSize: '0.75rem',   // 12px
  },

  // Progress
  progress: {
    height: '0.5rem',      // 8px
    radius: '9999px',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  borderWidth,
  shadows,
  transitions,
  animations,
  gradients,
  zIndex,
  breakpoints,
  components,
} as const;

export default designTokens;
