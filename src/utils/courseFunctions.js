import { mutateFireStoreDoc, updateFireStoreDoc } from "../lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp } from "firebase/firestore";

const createCourse = async (props) => {
  const { currentUser, newCourse, history, user } = props;

  if (currentUser.isTeacher) {
    newCourse.instructor = currentUser.username;
  }

  const ifComplete = (course) => {
    if (
      course.classNum &&
      course.courseName &&
      course.courseInstructor &&
      course.subject &&
      course.gradeLevel
    ) {
      return true;
    }
  };

  if (ifComplete(newCourse)) {
    const uid = uuidv4();
    try {
      await updateFireStoreDoc("courses", uid, {
        ...newCourse,
        createdAt: serverTimestamp(),
        id: uuidv4(),
      });
    } catch (error) {
      console.log({error});
    }
    try {
      await updateFireStoreDoc("users", currentUser.id,
        {
          courses: [...currentUser.courses, uid],
        }
      );
    } catch (error) {
      console.log({error});
    }
    history(`/dashboard/admin/course/${uid}`);
  } else {
    window.alert("Please fill in the required fields");
  }
};

const updateCourse = (props) => {
  const {
    currentUser,
    setCheckUser,
    setEdit,
    setLoading,
    originalCourse,
    updatedCourse,
    setUpdatedCourse,
  } = props;
  const confirm = window.confirm("Confirm to update course?");
  if (confirm) {
    setLoading(true);
    // Axios.put("/course/update", {
    // 	currentUser,
    // 	originalCourse,
    // 	updatedCourse,
    // })
    // 	.then((res) => {
    // 		if (res.data.msg === "Course updated") {
    // 			setCheckUser(false);
    // 		} else {
    // 			setUpdatedCourse(originalCourse);
    // 			setEdit(false);
    // 			setLoading(false);
    // 		}
    // 		window.alert(res.data.msg);
    // 	})
    // 	.catch((err) => console.log(err));
  }
};

const deleteCourse = (props) => {
  const { currentUser, setCheckUser, course, history } = props;

  const confirm = window.confirm("Confirm to delete course?");
  if (confirm) {
    // Axios.delete(`/course/delete/${course._id}`).then((res) => {
    // 	if (res.data.msg === "Course deleted") {
    // 		setCheckUser(false);
    // 		history.push(`/course/${currentUser.username}/all`);
    // 	}
    // 	window.alert(res.data.msg);
    // });
  }
};

const requestCourse = async (props) => {
  const {
    isLoggedin,
    currentUser,
    course,
    setLoading,
    setCheckUser,
    history,
  } = props;

  if (isLoggedin) {
    const confirm = window.confirm("Log in first!");
    if (confirm) {
      history.push("/login");
    }
  } else {
    const confirm = window.confirm("Proceed to request this course?");
    if (confirm) {
      setLoading(true);
      let pendingCourses = currentUser.pendingCourses;
      let exisiting = false;
      if (currentUser.pendingCourses && currentUser.pendingCourses.length > 0) {
        pendingCourses.courses.map((course) => {
          if (course.course_name == course.course_name) exisiting = true;
        });
      }
      if (!exisiting) {
        pendingCourses.push(course);
        try {
          await updateFireStoreDoc("users", currentUser.uid,
            { pendingCourses: [...course] }
          );
        } catch (error) {
          console.log(error);
        }
      }
      // Axios.post("/course/request", { course, currentUser })
      // 	.then((res) => {
      // 		window.alert(res.data.msg);
      // 		if (res.data.msg === "Item has been requested") {
      // 			setCheckUser(false);
      // 			setLoading(false);
      // 		}
      // 	})
      // 	.catch((e) => {
      // 		console.log(e);
      // 	});
    }
  }
};

const searchCourse = (props) => {
  const {
    currentUser = "",
    event,
    setSearchedItems,
    items,
    setItemsSlice,
  } = props;
  setItemsSlice([0, 3]);

  const sortedItems = items.sort((a, b) => {
    const nameA = a.course_name.toUpperCase();
    const nameB = b.course_name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  const filteredItems = sortedItems.filter((filtered) => {
    return filtered.course_name
      .toUpperCase()
      .toString()
      .includes(`${event.target.value.toUpperCase().toString()}`);
  });
  if (event.target.value.length) {
    setSearchedItems(filteredItems);
  } else {
    if (currentUser.isStudent) {
      let unOwnedItems = [];
      sortedItems.forEach((each) => {
        if (
          !currentUser.transactions.some((trans) => {
            if (
              trans.status === "completed" &&
              trans.cart.items.some((s) => {
                return s._id.toString() === each._id.toString();
              })
            ) {
              return true;
            } else {
              return undefined;
            }
          })
        ) {
          unOwnedItems.push(each);
        }
      });
      setSearchedItems(unOwnedItems);
    } else {
      setSearchedItems(sortedItems);
    }
  }
};
const searchStudent = (props) => {
  const { event, setSearchedItems, setSearched, items, setItemsSlice } = props;

  setItemsSlice([0, 10]);

  const sortedItems = items.sort((a, b) => {
    const nameA = a.username.toUpperCase();
    const nameB = b.username.toUpperCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  const filteredItems = sortedItems.filter((filtered) => {
    return filtered.username
      .toUpperCase()
      .toString()
      .includes(`${event.target.value.toUpperCase().toString()}`);
  });

  if (event.target.value.length) {
    setSearchedItems(filteredItems);
    setSearched(true);
  } else {
    setSearchedItems(sortedItems);
    setSearched(false);
  }
};

const approve = async (props) => {
  const { setCheckUser, pendingCourse, history, currentUser } = props;

  const confirm = window.confirm("Approve the request of user?");
  if (confirm) {
    let updatedCourses = currentUser.forPaymentCourses;
    updatedCourses.push(pendingCourse);

    let updatedPendingCourses = [];
    let pendingCourses = currentUser.pendingCourses;
    pendingCourses.forEach((course) => {
      if (course.id !== pendingCourse.id) {
        updatedPendingCourses.push(course);
      }
    });
    await updateFireStoreDoc("users", currentUser.uid,
      {
        forPaymentCourses: updatedCourses,
        pendingCourses: updatedPendingCourses,
      }
    );
    setCheckUser(false);
    history("/dashboard/admin/courses/pending");
  }
};
const deny = async (props) => {
  const { setCheckUser, pendingCourse, history, currentUser } = props;

  const confirm = window.confirm("Deny the request of user?");
  if (confirm) {
    let updatedCourses = currentUser.deniedCourses;
    updatedCourses.push(pendingCourse);

    let updatedPendingCourses = [];
    let pendingCourses = currentUser.pendingCourses;
    pendingCourses.forEach((course) => {
      if (course.id !== pendingCourse.id) {
        updatedPendingCourses.push(course);
      }
    });
    await updateFireStoreDoc("users", currentUser.uid,
      { deniedCourses: updatedCourses, pendingCourses: updatedPendingCourses }
    );
    setCheckUser(false);
    history("/admin/courses/pending");
  }
};

const selectCourse = (props) => {
  const {
    assignedCourse,
    setAssignedCourse,
    setIsAssignedCourseLoading,
    course,
  } = props;
  console.log({ assignedCourse, course });
  setAssignedCourse({ ...course });
  setIsAssignedCourseLoading(false);
};

const assignCourse = async (props) => {
  const {
    currentUser,
    isUserFound,
    assignedCourse,
    setAreCoursesLoaded,
    setLoading,
    setIsUserFound,
    setIsCourseFound,
  } = props;
  const { courseName } = assignedCourse;

  const confirm = window.confirm("Assign course to student?");

  if (confirm) {
    setLoading(true);
    if (courseName && isUserFound) {
      console.log({ props });
      let updatedCourses = currentUser.courses;
      let exisiting = false;
      updatedCourses.map((course) => {
        if (course.courseName == assignedCourse.courseName) exisiting = true;
      });
      if (!exisiting) {
        updatedCourses.push(assignedCourse);
        await mutateFireStoreDoc("users", currentUser.uid, {
          courses: updatedCourses,
        });
        await mutateFireStoreDoc("courses", assignedCourse.id, {
          instructor: currentUser.uid,
        });
      }

      setLoading(true);
      setIsUserFound(false);
      setIsCourseFound(false);
    } else {
      window.alert("Please pick a student.");
    }
  }
};

const assignStudentToCourse = async ({
  currentUser,
  course,
  student,
  setIsAssigningStudent,
  setAssignedCourse,
}) => {
  const confirm = window.confirm(
    `Assign ${student.username} to ${course.course_name}?`
  );

  if (confirm) {

    try {
      // Update student's assigned courses
      const updatedCourses = [...student.courses, course.id];
      await mutateFireStoreDoc("users", student.id, {
        courses: updatedCourses,
      });

      // Update course to include student
      const updatedStudents = [...course.students, student.id];
      await mutateFireStoreDoc("courses", course.id, {
        students: updatedStudents,
      });

      setIsAssigningStudent(false);
      setAssignedCourse({});
      window.alert(
        `Successfully assigned ${student.username} to ${course.course_name}.`
      );
    } catch (error) {
      console.error("Error assigning student to course:", error);
      window.alert(
        "Failed to assign student to course. Please try again later."
      );
      setIsAssigningStudent(false);
    }
  } else {
    setIsAssigningStudent(false);
  }
};

export {
  createCourse,
  updateCourse,
  deleteCourse,
  requestCourse,
  searchCourse,
  searchStudent,
  approve,
  deny,
  selectCourse,
  assignCourse,
  assignStudentToCourse,
};
