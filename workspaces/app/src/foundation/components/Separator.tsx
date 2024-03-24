import { Color } from '../styles/variables';

export const Separator: React.FC = () => {

  return (
    <div style={{
      borderTopColor:  Color.MONO_30,
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      width: '100%',
    }}/>
  );
};
