export const HeroImage: React.FC = () => {

  return (
    <div
      style={{
        aspectRatio: '16 / 9',
        width: '100%',
      }}
    >
      <img
        alt="Cyber TOON"
        src="/assets/helloImage.webp"
        style={{
          display: 'inline-block',
          width: '100%',
        }}
      />
    </div>
  );
};
