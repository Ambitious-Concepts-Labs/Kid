import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { addItem, removeItem, sendInvoice } from "../../utils/invoiceFunctions";
import * as Papa from "papaparse";
import Layout from "../../components/Dashboard/Layout";
import useGetAllUsers from "../../hooks/useGetAllUsers";

const NewInvoiceForm = lazy(() => import("../../components/Form/Invoice/NewInvoiceForm"));

const NewInvoice = (props) => {
  const { currentUser } = props;
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({});
  const [selectedInput, setSelectedInput] = useState("");
  const [inputFilter, setInputFilter] = useState("");
  const [showStudentResults, setShowStudentResults] = useState(false);
  const [focused, setFocused] = useState({});
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [isStudentFound, setIsStudentFound] = useState(false);
  const [areStudentsLoaded, setAreStudentsLoaded] = useState(false);
  const { users } = useGetAllUsers();

  const [assignedCourse, setAssignedCourse] = useState({
    student: { username: "" },
  });
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    _id: "",
    user: {},
    manualDateAdded: "",
    cart: { items: [], total_quantity: 0, total_price: 0 },
  });

  useEffect(() => {
    let unmounted = false;

    const readCsv = () => {
      fetch("data.csv")
        .then((response) => response.text())
        .then((responseText) => {
          const data = Papa.parse(responseText, {
            complete: function(results) {
              const res = results.data
                .map((data) => ({
                  _id: data[0],
                  price: data[20],
                  name: data[19],
                }))
                .slice(0, 100)
                .sort((a, b) =>
                  a.name.toUpperCase() < b.name.toUpperCase()
                    ? -1
                    : a.name.toUpperCase() > b.name.toUpperCase()
                    ? 1
                    : 0
                );
              setProductIds(res);
            },
          });
          return data;
        });
    };

    if (!unmounted) {
      readCsv();
      setLoading(false);
    }

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    if (selectedInput) {
      const inputFilter = (textbox) => {
        const events = [
          "input",
          "keydown",
          "keyup",
          "mousedown",
          "mouseup",
          "select",
          "contextmenu",
          "drop",
        ];
        events.forEach((event) => {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(
              this.oldSelectionStart,
              this.oldSelectionEnd
            );
          } else {
            this.value = "";
          }
        });
      };
      setInputFilter(document.querySelector(`#${selectedInput}`), inputFilter);
    }
  }, [selectedInput]);

  const handleSelectedStudent = (student) => {
    setShowStudentResults(false);
    if (student.username !== assignedCourse.student.username) {
      setSelectedStudent(student);
      setIsStudentFound(true);
      setAssignedCourse({ student });
      document.getElementById("assigned-student").value = student.username;
    }
  };

  const handleAssignedStudent = (e) => {
    setShowStudentResults(true);
    setIsStudentFound(false);
    setFilteredStudents(
      students.filter((s) =>
        s.username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setAssignedCourse({
      ...assignedCourse,
      student: { username: e.target.value },
    });
  };

    useEffect(() => {
      if (loading) {
        const getData = async () => {
          if (!areStudentsLoaded) {
            const getStudents = async () => {
              const studentsData = [];
              try {
                users.forEach((doc) => {
                  if (doc.isStudent) {
                    studentsData.push(doc);
                  }
                });
                setStudents(studentsData);
                setAreStudentsLoaded(true);
                setLoading(false);
              } catch (error) {
                console.error("Error fetching students: ", error);
              }
            };
            getStudents();
          }
        };
        getData();
      }
    }, [loading, areStudentsLoaded]);

    useEffect(() => {
      if (focused && focused !== "assigned-student") {
        setShowStudentResults(false);
      }
    }, [focused]);


  console.log("New filteredStudents", filteredStudents, selectedStudent);
  if (!currentUser) return <h1>Loading...</h1>;
  if (!currentUser.isAdmin) history("/dashboard");
  if (!loading) {
    return (
      <Layout>
        <div className="container mx-auto py-4 overflow-auto">
          <Suspense fallback={<div>Loading...</div>}>
          <NewInvoiceForm 
            productIds={productIds}
            newInvoice={newInvoice}
            setNewInvoice={setNewInvoice}
            assignedCourse={assignedCourse}
            setAssignedCourse={setAssignedCourse}
            handleAssignedStudent={handleAssignedStudent}
            handleSelectedStudent={handleSelectedStudent}
            showStudentResults={showStudentResults}
            filteredStudents={filteredStudents}
            selectedStudent={selectedStudent}
            isStudentFound={isStudentFound}
            currentUser={currentUser}
            addItem={addItem}
            removeItem={removeItem}
            sendInvoice={sendInvoice}
            />
          </Suspense>
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default NewInvoice;
