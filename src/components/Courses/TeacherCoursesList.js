import React from 'react'
import TeacherCourseCard from "./TeacherCourseCard";

const TeacherCoursesList = ({ items }) => {
    return (
      <div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <TeacherCourseCard
              key={item.courseId}
              id={item.courseId}
              title={item.title}
              imageUrl={item.imageUrl}
              chaptersLength={item.chapters.length}
              price={item.price}
              progress={item.progress}
              category={item?.category?.name}
            />
          ))}
        </div>
        {items.length === 0 && (
          <div className="text-center text-sm text-muted-foreground mt-10">
            No Courses Found
          </div>
        )}
      </div>
    );
}

export default TeacherCoursesList