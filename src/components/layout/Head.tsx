import { Helmet } from 'react-helmet-async';

interface HeadProps {
  title?: string;
}

const Head = ({ title = 'Fitta' }: HeadProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="desc" />
      </Helmet>
    </>
  );
};

export default Head;
