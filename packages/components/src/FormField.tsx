import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { Label } from './Label';
import { Text } from './Text';

export type FormFieldProps = {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

/** Label + control + optional soft hint (form helpers use soft muted on site). */
export function FormField({ id, label, hint, children, className }: FormFieldProps) {
  const classes = ['minco-field', className].filter(Boolean).join(' ');
  const hintId = hint ? `${id}-hint` : undefined;

  const control = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const el = child as ReactElement<{ id?: string; 'aria-describedby'?: string }>;
    return cloneElement(el, {
      id: el.props.id ?? id,
      'aria-describedby': hintId ?? el.props['aria-describedby'],
    });
  });

  return (
    <div className={classes}>
      <Label htmlFor={id}>{label}</Label>
      {control}
      {hint ? (
        <Text as="p" size="sm" tone="soft" id={hintId} className="minco-field__hint">
          {hint}
        </Text>
      ) : null}
    </div>
  );
}
