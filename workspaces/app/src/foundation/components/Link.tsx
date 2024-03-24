import { forwardRef } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  to?: string;
} & JSX.IntrinsicElements['a'];

// eslint-disable-next-line react/display-name
export const Link = forwardRef<HTMLAnchorElement, Props>(({ children, to, ...rest }, ref) => {
  return to === undefined ? (
    <a ref={ref} {...rest}>
      {children}
    </a>
  ) : (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <ReactRouterLink ref={ref as any} to={to} {...rest}>
      {children}
    </ReactRouterLink>
  );
});
