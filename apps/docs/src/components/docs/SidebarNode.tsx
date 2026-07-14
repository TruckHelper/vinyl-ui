import type { Folder, Item, Node } from 'fumadocs-core/page-tree';

import { styled } from 'styled-system/jsx';

import PageLink from './PageLink';

const GroupLabel = styled('p', {
  base: {
    textStyle: 'body.medium-bold',
    marginTop: '12',
    marginBottom: '4',
    paddingInline: '8',
    color: 'text.soft',
  },
});

export default function SidebarNode({ node, pathname }: { node: Node; pathname: string }) {
  if (node.type === 'separator') {
    return (
      <GroupLabel>{node.name}</GroupLabel>
    );
  }

  if (node.type === 'folder') {
    const folder = node as Folder;

    return (
      <div>
        <GroupLabel>{folder.name}</GroupLabel>
        {folder.index ? (
          <PageLink
            item={folder.index}
            pathname={pathname}
          />
        ) : null}
        {folder.children.map((child, i) => (
          <SidebarNode
            key={i}
            node={child}
            pathname={pathname}
          />
        ))}
      </div>
    );
  }

  return (
    <PageLink
      item={node as Item}
      pathname={pathname}
    />
  );
}
