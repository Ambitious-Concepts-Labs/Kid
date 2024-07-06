import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ crumbs }) => {
  return (
    <nav className="bg-gray-100 p-3 rounded-md w-full">
      <ol className="list-reset flex text-gray-600">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && <span className="mx-2 text-gray-400">/</span>}
            {crumb.link ? (
              <Link
                to={crumb.link}
                className="text-blue-600 hover:text-blue-800"
              >
                {crumb.label}
              </Link>
            ) : (
              <span>{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
