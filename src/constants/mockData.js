// Mock data for columns and rows
export const mockColumns = [
  {
    header: "Title",
    accessor: "title",
  },
  // Add more column definitions as needed
];

export const mockCourses = [
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
  },
];

export const mockFetchChapter = async (courseId, chapterId) => {
  // Mock data fetching logic
  return {
    id: chapterId,
    courseId: courseId,
    title: "Sample Chapter Title",
    description: "Sample Chapter Description",
    videoUrl: "https://sample-videos.com/video123.mp4",
    isPublished: false,
    muxData: { playbackId: "samplePlaybackId" },
  };
};

export const mockSearchCourses = [
  {
    courseId: 1,
    title: "Course Title 1",
    imageUrl: "https://via.placeholder.com/150",
    price: 100,
    progress: null,
    category: { id: 1, name: "Development" },
    chapters: [],
  },
  {
    courseId: 2,
    title: "Course Title 2",
    imageUrl: "https://via.placeholder.com/150",
    price: 200,
    progress: 30,
    category: { id: 2, name: "Business" },
    chapters: [{}, {}],
  },
  {
    courseId: 3,
    title: "Course Title 3",
    imageUrl: "https://via.placeholder.com/150",
    price: 150,
    progress: null,
    category: { id: 3, name: "Finance" },
    chapters: [],
  },
  {
    courseId: 4,
    title: "Course Title 4",
    imageUrl: "https://via.placeholder.com/150",
    price: 50,
    progress: 100,
    category: { id: 4, name: "Design" },
    chapters: [],
  },
];

export const mockSidebarCourse = {
  id: "course1",
  title: "Sample Course",
  chapters: [
    {
      id: "chapter1",
      title: "Chapter 1",
      isFree: true,
      userProgress: [{ isCompleted: true }],
    },
    {
      id: "chapter2",
      title: "Chapter 2",
      isFree: false,
      userProgress: [{ isCompleted: false }],
    },
  ],
};

export const mockPurchase = { courseId: mockSidebarCourse.id };

// Mock function to replace the getChapter action
export const getChapter = async ({ userId, chapterId, courseId }) => {
  // Mock data fetching
  return {
    chapter: {
      title: "Chapter Title",
      isFree: true,
      description: "Chapter Description",
    },
    course: { price: 100 },
    muxData: { playbackId: "playback-id" },
    attachments: [{ id: 1, url: "#", name: "Attachment 1" }],
    nextChapter: { id: "next-chapter-id" },
    userProgress: { isCompleted: false },
    purchase: { id: "purchase-id" },
  };
};
