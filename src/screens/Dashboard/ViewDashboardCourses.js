import React from "react";
// import { getDashboardCourses } from "@/actions/getDashboardCourses";
import CoursesList from "../../components/Courses/CoursesList";
// import { auth } from "@clerk/nextjs";
// import { CheckCircle, Clock } from "lucide-react";
// import { redirect } from "next/navigation";
import InfoCard from "../../components/Dashboard/InfoCard";
import { CiClock2 } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import Layout from "../../components/Dashboard/Layout";

const Dashboard = () => {
//   const { userId } = auth();

//   if (!userId) return redirect("/");

//   const { completedCourses, coursesInProgress } = await getDashboardCourses(
//     userId
    //   );
    const completedCourses = [];
    const coursesInProgress = [];
    return (
      <Layout>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard
              icon={CiClock2}
              label={"In Progress"}
              numberOfItems={coursesInProgress.length}
            />
            <InfoCard
              icon={FaCheckCircle}
              label={"Completed"}
              numberOfItems={completedCourses.length}
              variant="success"
            />
          </div>
          <CoursesList items={[...coursesInProgress, ...completedCourses]} />
        </div>
      </Layout>
    );
};

export default Dashboard;
