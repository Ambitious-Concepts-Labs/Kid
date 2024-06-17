import React, { useEffect } from "react";
import { columns } from "./Columns";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import DataTableSort from "./DataTableSort";

export default function Overview({ nextStep, handleChange, values }) {
  const [courses, setCourses] = React.useState([]);
  const getAllCourses = async () => {
    const dataArr = [];
    const querySnapshot = await getDocs(collection(db, "courses"));
    querySnapshot.forEach((course) => {
      const obj = { ...course.data(), courseId: course.id };
      dataArr.push(obj);
    });
    setCourses(dataArr);

    console.log(dataArr);
  };
  useEffect(() => {
    getAllCourses();
  }, []);

  console.log({ courses });

  const continueStep = (e) => {
    e.preventDefault();
    nextStep();
  };
  // Mock data for columns and rows
  const mockColumns = [
    {
      header: "Title",
      accessor: "title",
    },
    // Add more column definitions as needed
  ];

  const mockData = [
    {
      id: 1,
      title: "Course 1",
    },
    {
      id: 2,
      title: "Course 2",
    },
    // Add more data as needed
  ];
  const mockData2 = [
    {
      id: 0,
      amount: 100,
      title: "Course 1",
      status: "published",
      email: "example@email.com",
      instructor: "John Doe",
      num_of_students: 100,
      grade_level: "Grade 1",
      subject: "Math",
      price: 100,
      isPublished: "true",
      },
      {
          id: 1,
          amount: 200,
          title: "Course 2",
          status: "published",
          email: "",
            instructor: "Jane Doe",
          num_of_students: 200,
          grade_level: "Grade 2",
          subject: "Science",
          price: 200,
          isPublished: "true",
      },
      {
            id: 2,
            amount: 300,
            title: "Course 3",
            status: "published",
            email: "",
            instructor: "John Doe",
            num_of_students: 300,
            grade_level: "Grade 3",
            subject: "English",
            price: 300,
            isPublished: "true",
        },
        {
            id: 3,
            amount: 400,
            title: "Course 4",
            status: "published",
            email: "",
            instructor: "Jane Doe",
            num_of_students: 400,
            grade_level: "Grade 4",
            subject: "History",
            price: 400,
            isPublished: "true",
        },
        {
            id: 4,
            amount: 500,
            title: "Course 5",
            status: "published",
            email: "",
            instructor: "John Doe",
            num_of_students: 500,
            grade_level: "Grade 5",
            subject: "Geography",
            price: 500,
            isPublished: "true",
      },
      {
            id: 5,
            amount: 600,
            title: "Course 6",
            status: "published",
            email: "",
            instructor: "Jane Doe",
            num_of_students: 600,
            grade_level: "Grade 6",
            subject: "Art",
            price: 600,
            isPublished: "true",
      },
        {
                id: 6,
                amount: 700,
                title: "Course 7",
                status: "published",
                email: "",
                instructor: "John Doe",
                num_of_students: 700,
                grade_level: "Grade 7",
                subject: "Music",
                price: 700,
                isPublished: "true",
        },
        {
                id: 7,
                amount: 800,
                title: "Course 8",
                status: "published",
                email: "",
                instructor: "Jane Doe",
                num_of_students: 800,
                grade_level: "Grade 8",
                subject: "Physical Education",
                price: 800,
                isPublished: "true",
        },
        {
                id: 8,
                amount: 900,
                title: "Course 9",
                status: "published",
                email: "",
                instructor: "John Doe",
                num_of_students: 900,
                grade_level: "Grade 9",
                subject: "Computer Science",
                price: 900,
                isPublished: "true",
        },
      {
          id: 9,
          amount: 1000,
          title: "Course 10",
          status: "published",
          email: "",
          instructor: "Jane Doe",
          num_of_students: 1000,
          grade_level: "Grade 10",
          subject: "Physics",
          price: 1000,
          isPublished: "true",
      }
            
  ];

  return (
    <>
      <div>Overview</div>
      <button onClick={continueStep}>Next</button>
      {/* <DataTable data={mockData2} columns={columns} /> */}
      <DataTableSort data={[...mockData2, ...courses]} columns={columns} />
    </>
  );
}
