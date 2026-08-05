import { styled } from 'styled-system/jsx';

export type PropDef = {
  type: string;
  default?: string;
  description?: string;
};

const Table = styled('table', {
  base: {
    textStyle: 'body.small-normal',
    marginBlock: '16',
    width: '100%',
    borderCollapse: 'collapse',
  },
});

const Th = styled('th', {
  base: {
    textStyle: 'body.small-bold',
    paddingBlock: '10',
    paddingInline: '12',
    borderBottom: '1px solid',
    borderColor: 'layout.default-line',
    color: 'text.heading',
    backgroundColor: 'layout.table-header',
    textAlign: 'left',
  },
});

const Td = styled('td', {
  base: {
    verticalAlign: 'top',
    paddingBlock: '10',
    paddingInline: '12',
    borderBottom: '1px solid',
    borderColor: 'layout.default-line',
    color: 'text.default',
  },
});

const Code = styled('code', {
  base: {
    textStyle: 'body.small-normal',
    fontFamily: 'mono',
    backgroundColor: 'layout.bg-light-gray',
    paddingBlock: '2',
    paddingInline: '4',
    borderRadius: '0.4rem',
    whiteSpace: 'pre-wrap',
    color: 'text.accent-primary',
  },
});

const PropName = styled('code', {
  base: {
    textStyle: 'body.small-bold',
    fontFamily: 'mono',
    color: 'text.heading',
  },
});

export default function PropsTable({ type }: { type: Record<string, PropDef> }) {
  const rows = Object.entries(type);

  return (
    <Table>
      <thead>
      <tr>
        <Th>Prop</Th>
        <Th>Type</Th>
        <Th>Default</Th>
        <Th>Description</Th>
      </tr>
      </thead>
      <tbody>
      {rows.map(([name, def]) => (
        <tr key={name}>
          <Td>
            <PropName>{name}</PropName>
          </Td>
          <Td>
            <Code>{def.type}</Code>
          </Td>
          <Td>{def.default ? <Code>{def.default}</Code> : '—'}</Td>
          <Td>{def.description ?? ''}</Td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}
