import { useId } from 'react';

import { useBookList } from '../../features/book/hooks/useBookList';
import { Box } from '../../foundation/components/Box';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { SearchResult } from './internal/SearchResult';

type Props = {
  keyword: string;
};

export const SearchContent: React.FC<Props> = ({ keyword }) => {
  const { data: books } = useBookList({ query: {} });

  const searchResultsA11yId = useId();

  return (
    <Box aria-labelledby={searchResultsA11yId} as="section" maxWidth="100%" py={Space * 2} width="100%">
      <Text color={Color.MONO_100} id={searchResultsA11yId} typography={Typography.NORMAL20} weight="bold">
        検索結果
      </Text>
      {keyword !== '' && <SearchResult books={books} keyword={keyword} />}
    </Box>
  );
};
