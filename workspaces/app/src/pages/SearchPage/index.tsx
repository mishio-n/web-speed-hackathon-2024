import { Suspense, useCallback, useEffect, useState } from 'react';

import { Box } from '../../foundation/components/Box';
import { Space } from '../../foundation/styles/variables';

import { Input } from './internal/Input';
import { SearchContent } from './searchContent';

export const SearchPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [keyword, setKeyword] = useState('');

  const onChangedInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    [setKeyword],
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box px={Space * 2}>
      <Input disabled={!isClient} onChange={onChangedInput} />
      <Suspense fallback={null}>
        <SearchContent keyword={keyword} />
      </Suspense>
    </Box>
  );
};
