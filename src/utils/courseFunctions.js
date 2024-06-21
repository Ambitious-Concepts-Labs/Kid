import { db } from "../lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

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
      await setDoc(doc(db, "courses", uid), {
        ...newCourse,
        createdAt: serverTimestamp(),
        id: uuidv4(),
      });
    } catch (error) {
      console.log({error});
    }
    try {
      await setDoc(
        doc(db, "users", currentUser.id),
        {
          courses: [...currentUser.courses, uid],
        },
        { merge: true }
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
          await setDoc(
            doc(db, "users", "5oZ5ta0mgbZSEqCNXftJ"),
            { pendingCourses: [...course] },
            { merge: true }
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
    let updatedCourses = currentUser.courses;
    pendingCourse.status = "for payment";
    updatedCourses.push(pendingCourse);

    let updatedPendingCourses = [];
    let pendingCourses = currentUser.pendingCourses;
    pendingCourses.forEach((course) => {
      if (course._id !== pendingCourse._id) {
        updatedPendingCourses.push(course);
      }
    });
    await setDoc(
      doc(db, "users", "5oZ5ta0mgbZSEqCNXftJ"),
      { courses: updatedCourses, pendingCourses: updatedPendingCourses },
      { merge: true }
    );
    setCheckUser(false);
    history("/dashboard/admin/pendingcourses");
    // Axios.put("/admin/approvecourse", { pendingCourse }).then((res) => {
    // 	window.alert(res.data.msg);
    // 	if (res.data.msg === "Approval successful") {
    // 		setCheckUser(false);
    // 		history.push("/admin/pendingcourses");
    // 	}
    // });
  }
};
const deny = async (props) => {
  const { setCheckUser, pendingCourse, history, currentUser } = props;

  const confirm = window.confirm("Deny the request of user?");
  if (confirm) {
    let updatedCourses = currentUser.courses;
    pendingCourse.status = "cancelled";
    updatedCourses.push(pendingCourse);

    let updatedPendingCourses = [];
    let pendingCourses = currentUser.pendingCourses;
    pendingCourses.forEach((course) => {
      if (course._id !== pendingCourse._id) {
        updatedPendingCourses.push(course);
      }
    });
    await setDoc(
      doc(db, "users", "5oZ5ta0mgbZSEqCNXftJ"),
      { courses: updatedCourses, pendingCourses: updatedPendingCourses },
      { merge: true }
    );
    setCheckUser(false);
    history("/admin/pendingcourses");
    // Axios.put("/admin/denycourse", { pendingCourse }).then((res) => {
    // 	window.alert(res.data.msg);
    // 	if (res.data.msg === "Course request denied") {
    // 		setCheckUser(false);
    // 		history.push("/admin/pendingcourses");
    // 	}
    // });
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
    setAreUsersLoaded,
    setAreCoursesLoaded,
    setLoading,
    setIsUserFound,
    setIsCourseFound,
  } = props;
  const { course_name } = assignedCourse;

  const confirm = window.confirm("Assign course to student?");

  if (confirm) {
    setLoading(true);
    if (course_name && isUserFound) {
      console.log({ props });
      let updatedCourses = currentUser.courses;
      let exisiting = false;
      updatedCourses.map((course) => {
        if (course.course_name == assignedCourse.course_name) exisiting = true;
      });
      if (!exisiting) {
        updatedCourses.push(assignedCourse);
        await updateDoc(
          doc(db, "users", currentUser.uid),
          { courses: updatedCourses }
        );
      }
      setLoading(true);
      setAreUsersLoaded(false);
      setAreCoursesLoaded(false);
      setIsUserFound(false);
      setIsCourseFound(false);
    } else {
      window.alert("Please pick a student.");
    }
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
};
