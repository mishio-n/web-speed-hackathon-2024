import { FeatureCard } from '../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../features/feature/hooks/useFeatureList';
import { Flex } from '../../foundation/components/Flex';
import { Space } from '../../foundation/styles/variables';

export const Pickup: React.FC = () => {
  const { data: featureList } = useFeatureList({ query: {} });

  return (
    <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
      {featureList.map((feature) => (
        <FeatureCard key={feature.id} book={feature.book} />
      ))}
    </Flex>
  );
};
