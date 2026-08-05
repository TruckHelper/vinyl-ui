import type { MDXComponents } from 'mdx/types';

import Badge from '../docs/Badge';
import Callout from '../docs/Callout';
import CodeBlock from '../docs/CodeBlock';
import Palette from '../docs/Palette';
import Preview from '../docs/Preview';
import PropsTable from '../docs/PropsTable';
import Section from '../docs/Section';
import SelectDemo from '../docs/SelectDemo';
import Swatch from '../docs/Swatch';

import Code from './Code';

import A from './elements/A';
import Blockquote from './elements/Blockquote';
import H2 from './elements/H2';
import H3 from './elements/H3';
import H4 from './elements/H4';
import Hr from './elements/Hr';
import Li from './elements/Li';
import Ol from './elements/Ol';
import P from './elements/P';
import Table from './elements/Table';
import Td from './elements/Td';
import Th from './elements/Th';
import Ul from './elements/Ul';

const baseComponents: MDXComponents = {
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  a: A,
  code: Code,
  pre: CodeBlock,
  blockquote: Blockquote,
  hr: Hr,
  table: Table,
  th: Th,
  td: Td,
  Preview,
  PropsTable,
  Callout,
  Badge,
  Section,
  Swatch,
  Palette,
  SelectDemo,
  TypeTable: PropsTable,
};

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...baseComponents,
    ...components,
  };
}
