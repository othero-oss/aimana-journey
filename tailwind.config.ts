/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA DESIGN SYSTEM - Tailwind Configuration
 * AI-First Journey Platform
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { Config } from 'tailwindcss';
import {
  colors,
  typography,
  borderRadius,
  shadows,
  animations,
} from './src/lib/design-tokens';

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ─────────────────────────────────────────────────────────────────────
      // COLORS
      // ─────────────────────────────────────────────────────────────────────
      colors: {
        // Primary Brand - Aimana Palette
        aimana: {
          navy: colors.aimana.navy,
          'navy-light': colors.aimana.navyLight,
          blue: colors.aimana.blue,
          'blue-light': colors.aimana.blueLight,
          teal: colors.aimana.teal,
          'teal-light': colors.aimana.tealLight,
          mint: colors.aimana.mint,
        },

        // Navy scale (dark theme backgrounds)
        navy: {
          600: '#1A3050',
          700: '#122240',
          800: '#0F2847',
          900: '#0A1628',
          950: '#060E1A',
        },

        // Journey Phase Colors
        phase: {
          plan: colors.phase.plan,
          'plan-bg': colors.phase.planBg,
          'plan-border': colors.phase.planBorder,
          execute: colors.phase.execute,
          'execute-bg': colors.phase.executeBg,
          'execute-border': colors.phase.executeBorder,
          manage: colors.phase.manage,
          'manage-bg': colors.phase.manageBg,
          'manage-border': colors.phase.manageBorder,
        },

        // Status Colors
        status: {
          success: colors.status.success,
          'success-bg': colors.status.successBg,
          warning: colors.status.warning,
          'warning-bg': colors.status.warningBg,
          error: colors.status.error,
          'error-bg': colors.status.errorBg,
          pending: colors.status.pending,
          'pending-bg': colors.status.pendingBg,
          info: colors.status.info,
          'info-bg': colors.status.infoBg,
        },

        // Surface Colors
        surface: {
          DEFAULT: colors.surface.white,
          light: colors.surface.light,
          hover: colors.surface.hover,
          border: colors.surface.border,
          'border-strong': colors.surface.borderStrong,
          dark: colors.surface.dark,
          'dark-hover': colors.surface.darkHover,
        },

        // Text Colors
        text: {
          DEFAULT: colors.text.primary,
          secondary: colors.text.secondary,
          muted: colors.text.muted,
          inverse: colors.text.inverse,
          link: colors.text.link,
          'link-hover': colors.text.linkHover,
        },

        // Gray Scale
        gray: colors.gray,
      },

      // ─────────────────────────────────────────────────────────────────────
      // TYPOGRAPHY
      // ─────────────────────────────────────────────────────────────────────
      fontFamily: {
        sans: typography.fontFamily.sans,
        mono: typography.fontFamily.mono,
      },

      fontSize: typography.fontSize,

      fontWeight: {
        normal: typography.fontWeight.normal,
        medium: typography.fontWeight.medium,
        semibold: typography.fontWeight.semibold,
        bold: typography.fontWeight.bold,
      },

      letterSpacing: typography.letterSpacing,

      // ─────────────────────────────────────────────────────────────────────
      // BORDERS & RADIUS
      // ─────────────────────────────────────────────────────────────────────
      borderRadius: borderRadius,

      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        2: '2px',
        3: '3px',
        4: '4px',
      },

      // ─────────────────────────────────────────────────────────────────────
      // SHADOWS
      // ─────────────────────────────────────────────────────────────────────
      boxShadow: {
        sm: shadows.sm,
        DEFAULT: shadows.DEFAULT,
        md: shadows.md,
        lg: shadows.lg,
        xl: shadows.xl,
        card: shadows.card,
        'card-hover': shadows.cardHover,
        sidebar: shadows.sidebar,
        dropdown: shadows.dropdown,
        modal: shadows.modal,
        'teal-glow': shadows.tealGlow,
        'blue-glow': shadows.blueGlow,
        none: shadows.none,
      },

      // ─────────────────────────────────────────────────────────────────────
      // BACKGROUND IMAGES (Gradients)
      // ─────────────────────────────────────────────────────────────────────
      backgroundImage: {
        'gradient-header': 'linear-gradient(135deg, #0A1628 0%, #0F2847 100%)',
        'gradient-header-extended': 'linear-gradient(135deg, #0A1628 0%, #3B6B8C 100%)',
        'gradient-celebration': 'linear-gradient(135deg, #0A1628 0%, #3B6B8C 50%, #4ECDC4 100%)',
        'gradient-primary': 'linear-gradient(135deg, #4ECDC4 0%, #3B6B8C 100%)',
        'gradient-teal': 'linear-gradient(135deg, #4ECDC4 0%, #50D9B3 100%)',
        'gradient-blue': 'linear-gradient(135deg, #3B6B8C 0%, #4A8DB7 100%)',
        'gradient-journey': 'linear-gradient(90deg, #0A1628 0%, #3B6B8C 50%, #4ECDC4 100%)',
        'gradient-subtle-light': 'linear-gradient(180deg, #FFFFFF 0%, #F6F8FA 100%)',
        'gradient-subtle-dark': 'linear-gradient(180deg, #0A1628 0%, #0F2847 100%)',
      },

      // ─────────────────────────────────────────────────────────────────────
      // ANIMATIONS
      // ─────────────────────────────────────────────────────────────────────
      keyframes: animations.keyframes,

      animation: {
        float: animations.animation.float,
        'slide-up': animations.animation.slideUp,
        'slide-down': animations.animation.slideDown,
        'slide-in': animations.animation.slideIn,
        'fade-in': animations.animation.fadeIn,
        'pulse-slow': animations.animation.pulseSlow,
        spin: animations.animation.spin,
      },

      // ─────────────────────────────────────────────────────────────────────
      // TRANSITIONS
      // ─────────────────────────────────────────────────────────────────────
      transitionDuration: {
        fast: '150ms',
        DEFAULT: '200ms',
        slow: '300ms',
        slower: '500ms',
      },

      // ─────────────────────────────────────────────────────────────────────
      // Z-INDEX
      // ─────────────────────────────────────────────────────────────────────
      zIndex: {
        hide: '-1',
        docked: '10',
        dropdown: '1000',
        sticky: '1100',
        banner: '1200',
        overlay: '1300',
        modal: '1400',
        popover: '1500',
        toast: '1700',
        tooltip: '1800',
      },
    },
  },
  plugins: [],
} satisfies Config;
