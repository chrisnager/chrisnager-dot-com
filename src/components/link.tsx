import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

export default function Link({ children, href }) {
  if (href.startsWith('/')) {
    return <GatsbyLink to={href}>{children}</GatsbyLink>;
  }

  const onPage = href.startsWith('#');

  return (
    <a
      {...{ href }}
      rel={onPage ? null : 'noopener noreferrer'}
      target={onPage ? null : '_blank'}
    >
      {children}
    </a>
  );
}
