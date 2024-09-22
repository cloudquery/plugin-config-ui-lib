import React, { FC, ReactNode } from 'react';

import List, { ListProps } from '@mui/material/List';

/**
 * @public
 */
export interface TreeGroupProps extends ListProps {
  children: ReactNode;
}

const _TreeGroup: FC<TreeGroupProps> = ({ children, ...props }) => {
  return (
    <List role="group" {...props}>
      {children}
    </List>
  );
};

/**
 * This component is used for grouping tree nodes inside a `TreeNode`.
 *
 * @public
 */
export const TreeGroup = React.memo(_TreeGroup);
