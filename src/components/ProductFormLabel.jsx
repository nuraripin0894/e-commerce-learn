import PropTypes from "prop-types";

import capitalize from "lodash/capitalize";

function ProductFormLabel({ name, textLabel, customClassName, children }) {
  const text = textLabel || capitalize(name);
  return (
    <label
      htmlFor={name}
      className={
        customClassName || "block text-sm font-medium text-gray-700 mb-1"
      }
    >
      {children || text}
    </label>
  );
}

ProductFormLabel.propTypes = {
  name: PropTypes.string.isRequired,
  textLabel: PropTypes.string,
  customClassName: PropTypes.string,
  children: PropTypes.element,
};

export default ProductFormLabel;
