import React from "react";
import { columns } from "./Columns";
import DataTableSort from "./DataTableSort";
import { mockCourses } from "../../../constants/mockData";
import useGetAllCourses from "../../../hooks/useGetAllCourses";

export default function Overview({ nextStep, handleChange, values }) {
 const courses = useGetAllCourses();

  const continueStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <>
      <div>Overview</div>
      <DataTableSort
        continueStep={continueStep}
        data={[...mockCourses, ...courses]}
        columns={columns}
      />
    </>
  );
}
