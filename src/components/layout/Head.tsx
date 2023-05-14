import { Helmet } from 'react-helmet-async';

const DEFAULT_TITLE = 'Fitta';
const DEFAULT_DESC = 'desc';
// const DEFAULT_IMAGE = '/meta-image.png';

interface HeadProps {
  title?: string;
  description?: string;
}

const Head = ({ title, description }: HeadProps) => {
  const pageTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const pageDesc = description ?? DEFAULT_DESC;
  return (
    <>
      <Helmet>
        {/* OG */}
        <meta property="og:locale" content="ko_KR" />
        {/* <meta property="og:url" content={pageURL} /> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:site_name" content={pageTitle} />
        <meta property="og:desciption" content={pageDesc} />
        {/* <meta property="og:image" content={pageImage} /> */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta property="og:image:alt" content={pageTitle} />

        {/* twitter */}
        <meta property="twitter:card" content={pageDesc} />
        <meta property="twitter:description" content={pageDesc} />

        {/* default */}
        <title>{pageTitle}</title>
        <meta name="description" content="desc" />
        {/* <meta name="keywords" content={pageKeywords} /> */}
        {/* <link rel="canonical" href={pageURL} /> */}
      </Helmet>
    </>
  );
};

export default Head;
