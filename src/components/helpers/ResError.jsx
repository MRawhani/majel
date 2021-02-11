import React from "react";
export function ResError(props) {
  const errors = props.errors;

  return (
    errors.length > 0 && (
      <div className="error_label">
        {errors.map((error, i) => (
          <p key={i}>{error.detail}</p>
        ))}
      </div>
    )
  );
}
