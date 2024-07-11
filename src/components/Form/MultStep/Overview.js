import React from "react";
import { columns } from "./Columns";
import DataTableSort from "./DataTableSort";
import { mockCourses } from "../../../constants/mockData";
import useGetAllCourses from "../../../hooks/useGetAllCourses";

export default function Overview({ nextStep, handleChange, values }) {
  const { courses, error, isLoading } = useGetAllCourses();

  const continueStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
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
