import React from "react";
// import { ArrowUpDown, MoreHorizontal, Pencil } from "react-icons/lucide";

// Custom Button component
const Button = ({ children, onClick, variant, className }) => {
  const baseStyle = "px-4 py-2 rounded-md";
  const variantStyle =
    variant === "ghost"
      ? "border border-gray-400 text-gray-600"
      : "bg-blue-500 text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      {children}
    </button>
  );
};

// Custom Badge component
const Badge = ({ children, className }) => (
  <span
    className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${className}`}
  >
    {children}
  </span>
);

// Custom Dropdown components
const DropdownMenu = ({ children }) => (
  <div className="relative inline-block text-left">{children}</div>
);

const DropdownMenuTrigger = ({ children, asChild }) => (
  <div className="inline-block">{children}</div>
);

const DropdownMenuContent = ({ children, align }) => (
  <div
    className={`absolute ${
      align === "end" ? "right-0" : "left-0"
    } mt-2 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
  >
    {children}
  </div>
);

const DropdownMenuItem = ({ children }) => (
  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
    {children}
  </div>
);
export const columns = [
  {
    accessorKey: "instructor",
    header: "Instructor",
  },
  {
    accessorKey: "num_of_students",
    header: "Num of Students",
  },
  {
    accessorKey: "grade_level",
    header: "Grade Level",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "isPublished",
    header: "Published",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              {/* <MoreHorizontal className="h-4 w-4" /> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <a href={`/dashboard/courses/${id}`}>
              <DropdownMenuItem>
                {/* <Pencil className="h-4 w-4 mr-2" /> */}
                Edit
              </DropdownMenuItem>
            </a>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
// export const columns = [
//   {
//     accessorKey: "title",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Title
//           {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
//         </Button>
//       );
//     },
//   },
//   {
//     accessorKey: "price",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Price
//           {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
//         </Button>
//       );
//     },
//     cell: ({ row }) => {
//       const price = parseFloat(row.getValue("price") || "0");
//       const formatted = price;
//       return <div className="font-medium">{formatted}</div>;
//     },
//   },
//   {
//     accessorKey: "isPublished",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Published
//           {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
//         </Button>
//       );
//     },
//     cell: ({ row }) => {
//       const isPublished = row.getValue("isPublished") || false;

//       return (
//         <Badge className={cn("bg-slate-500", isPublished && "bg-sky-700")}>
//           {isPublished ? "Published" : "Draft"}
//         </Badge>
//       );
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const { id } = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-4 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               {/* <MoreHorizontal className="h-4 w-4" /> */}
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <a href={`/courses/${id}`}>
//               <DropdownMenuItem>
//                 {/* <Pencil className="h-4 w-4 mr-2" /> */}
//                 Edit
//               </DropdownMenuItem>
//             </a>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];
