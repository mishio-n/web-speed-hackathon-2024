import { Suspense, useMemo } from 'react';

import type { GetBookListResponse } from '@wsh-2024/schema/src/api/books/GetBookListResponse';

import { BookListItem } from '../../../features/book/components/BookListItem';
import { Flex } from '../../../foundation/components/Flex';
import { Text } from '../../../foundation/components/Text';
import { Color, Typography } from '../../../foundation/styles/variables';

type Props = {
  books: GetBookListResponse;
  keyword: string;
};

export const SearchResult: React.FC<Props> = ({ books, keyword }) => {
  const relatedBooks = useMemo(() => {
    if (keyword === '') {
      return books;
    }
    return books.filter((book) => {
      return book.name.includes(keyword) || book.nameRuby.includes(keyword);
    });
  }, [books, keyword]);

  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      <Suspense
        fallback={
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            「{keyword}」を検索中...
          </Text>
        }
      >
        {relatedBooks.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
        {relatedBooks.length === 0 && (
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            関連作品は見つかりませんでした
          </Text>
        )}
      </Suspense>
    </Flex>
  );
};
