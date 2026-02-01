/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import React, { MouseEventHandler, ReactNode } from 'react';
import styles from "./Typography.module.css";

const allowedElements = ['h1', 'h2', 'h3', 'h4', 'p', 'span', 'div', 'a'] as const;
const variants = ['h1', 'h2', 'h3', 'h4', 'body', 'para', 'chip'] as const;

type El = typeof allowedElements[number];
export type TypographyVariant = typeof variants[number];

// New responsive value type
type ResponsiveValue<T> = T | {
  mobile?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

export interface TypographyProps {
  children?: string | ReactNode;

  /** HTML Element to use (h1, h2, h3, p, span, div, a) */
  el?: El;

  /** Typography variant based on ChargeMate design system */
  variant?: TypographyVariant;

  /** Custom color - can use CSS variables or hex/rgb */
  color?: string;

  /** Font weight (300, 400, 500, 600, 700) */
  weight?: 300 | 400 | 500 | 600 | 700;

  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';

  /** Maximum number of lines before truncating with ellipsis */
  maxLines?: number;

  /** Text decoration */
  textDecoration?: React.CSSProperties['textDecoration'];

  /** Line height - supports responsive values */
  lineHeight?: ResponsiveValue<number>;

  /** Letter spacing - supports responsive values */
  letterSpacing?: ResponsiveValue<number>;

  /** For anchor tags */
  href?: string;

  /** Title attribute for hover tooltip */
  title?: string;

  /** Click handler */
  onClick?: MouseEventHandler<HTMLElement>;

  /** Additional CSS class names */
  className?: string;

  /** Inline styles */
  style?: React.CSSProperties;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      el,
      variant = 'para',
      color,
      weight,
      align,
      maxLines,
      textDecoration,
      lineHeight,
      letterSpacing,
      href,
      title,
      onClick,
      className = '',
      style
    },
    ref
  ) => {
    // Auto-select element based on variant if not specified
    const getDefaultElement = (): El => {
      if (el) return el;
      switch (variant) {
        case 'h1': return 'h1';
        case 'h2': return 'h2';
        case 'h3': return 'h3';
        case 'h4': return 'h4';
        case 'body': return 'p';
        case 'para': return 'p';
        case 'chip': return 'span';
        default: return 'p';
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let Tag: any = getDefaultElement();

    // Map variant to CSS class
    const variantClass = variant ? styles[`${variant}-txt`] : '';

    // Combine font weight class if specified
    const weightClass = weight ? styles[`font-${weight}`] : '';

    // Build className string
    const combinedClassName = [
      variantClass,
      weightClass,
      className
    ].filter(Boolean).join(' ');

    // Helper to check if value is responsive object
    const isResponsive = <T,>(value: ResponsiveValue<T> | undefined): value is Exclude<ResponsiveValue<T>, T> => {
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    };

    // Build CSS custom properties for responsive values
    const cssVariables: Record<string, string> = {};

    if (lineHeight !== undefined) {
      if (isResponsive(lineHeight)) {
        if (lineHeight.mobile !== undefined) cssVariables['--line-height-mobile'] = `${lineHeight.mobile}px`;
        if (lineHeight.sm !== undefined) cssVariables['--line-height-sm'] = `${lineHeight.sm}px`;
        if (lineHeight.md !== undefined) cssVariables['--line-height-md'] = `${lineHeight.md}px`;
        if (lineHeight.lg !== undefined) cssVariables['--line-height-lg'] = `${lineHeight.lg}px`;
        if (lineHeight.xl !== undefined) cssVariables['--line-height-xl'] = `${lineHeight.xl}px`;
        if (lineHeight['2xl'] !== undefined) cssVariables['--line-height-2xl'] = `${lineHeight['2xl']}px`;
      }
    }

    if (letterSpacing !== undefined) {
      if (isResponsive(letterSpacing)) {
        if (letterSpacing.mobile !== undefined) cssVariables['--letter-spacing-mobile'] = `${letterSpacing.mobile}rem`;
        if (letterSpacing.sm !== undefined) cssVariables['--letter-spacing-sm'] = `${letterSpacing.sm}rem`;
        if (letterSpacing.md !== undefined) cssVariables['--letter-spacing-md'] = `${letterSpacing.md}rem`;
        if (letterSpacing.lg !== undefined) cssVariables['--letter-spacing-lg'] = `${letterSpacing.lg}rem`;
        if (letterSpacing.xl !== undefined) cssVariables['--letter-spacing-xl'] = `${letterSpacing.xl}rem`;
        if (letterSpacing['2xl'] !== undefined) cssVariables['--letter-spacing-2xl'] = `${letterSpacing['2xl']}rem`;
      }
    }

    // Build inline styles
    const combinedStyle: React.CSSProperties = {
      color,
      textAlign: align,
      textDecoration,
      // Use simple values if not responsive
      lineHeight: (lineHeight !== undefined && !isResponsive(lineHeight)) ? `${lineHeight}px` : undefined,
      letterSpacing: (letterSpacing !== undefined && !isResponsive(letterSpacing)) ? `${letterSpacing}rem` : undefined,
      cursor: onClick || href ? 'pointer' : undefined,
      ...(maxLines && {
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }),
      ...cssVariables,
      ...style
    };

    // Add responsive class if needed
    const hasResponsiveLineHeight = lineHeight !== undefined && isResponsive(lineHeight);
    const hasResponsiveLetterSpacing = letterSpacing !== undefined && isResponsive(letterSpacing);
    const responsiveClass = (hasResponsiveLineHeight || hasResponsiveLetterSpacing) ? styles.responsive : '';

    const finalClassName = [combinedClassName, responsiveClass].filter(Boolean).join(' ');

    return (
      // eslint-disable-next-line react-hooks/static-components
      <Tag
        ref={ref}
        className={finalClassName}
        style={combinedStyle}
        title={title}
        href={href}
        onClick={onClick}
      >
        {children}
      </Tag>
    );
  }
);

Typography.displayName = 'Typography';

export default Typography;