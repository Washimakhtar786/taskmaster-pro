import React from "react";

export const UnauthorizedPage:
  React.FC = () => {
    return (
      <div>
        <h1>
          Unauthorized Access
        </h1>

        <p>
          You do not have
          permission to view this
          page.
        </p>
      </div>
    );
  };