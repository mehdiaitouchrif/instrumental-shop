import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
};

Meta.defaultProps = {
  title: "Instrumental: Musical Instruments Shop",
  description:
    "Shop our selection of instruments & musical equipment. Get the lowest prices & free shipping on most orders.",
  keywords:
    "musical instruments, music gears, guitars, pianos, drums, musical shop, instrumental shop",
};

export default Meta;
