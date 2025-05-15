export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const timeSlot = [
  "10:0 - 10:45",
  "10:45 - 11:30",
  "11:30 - 12:15",
  "12:15 - 1:0",
  "2:0 - 2:45",
  "2:45 - 3:30",
  "3:30 - 4:15",
];
interface IClassRoomList {
  name: String;
  grade: Number;
  classroom_id: Number;
  section: String[];
}

export const ClassRoomList: IClassRoomList[] = [
  { name: "I", grade: 1, classroom_id: 1001, section: ["A", "B", "C", "D"] },
  { name: "II", grade: 2, classroom_id: 1002, section: ["A"] },
  { name: "III", grade: 3, classroom_id: 1003, section: ["A", "B", "C"] },
  { name: "IV", grade: 4, classroom_id: 1004, section: ["A", "B"] },
  { name: "V", grade: 5, classroom_id: 1005, section: ["A", "B"] },
  { name: "VI", grade: 6, classroom_id: 1006, section: ["A", "B"] },
  { name: "VII", grade: 7, classroom_id: 1007, section: ["A", "B"] },
  { name: "VIII", grade: 8, classroom_id: 1008, section: ["A", "B"] },
  { name: "IX", grade: 9, classroom_id: 1009, section: ["A", "B"] },
  { name: "X", grade: 10, classroom_id: 1010, section: ["A", "B"] },
  // {name: 'X (A)', grade:1,classroom_id:'class_X_A'},
  // {name: 'X (B)', classroom_id:'class_X_B'},
  // {name: 'X (Science Lab)', classroom_id:'class_X_science_lab'},
  // {name: 'Computer Lab', classroom_id:'class_computer_lab'}
];

export const ClassBasedSubjectList = [
  {
    name: "Senior KG",
    grade: 0,
    section: ["A", "B"],
    subject: [
      "English",
      "Hindi",
      "Marathi",
      "Science",
      "Mathematics",
      "Drawing",
    ],
  },
  {
    name: "I",
    grade: 1,
    section: ["A", "B", "C", "D"],
    subject: [
      "English",
      "Hindi",
      "Marathi",
      "Science",
      "Mathematics",
      "History",
      "Geography",
      "Drawing",
    ],
  },
  {
    name: "II",
    grade: 2,
    section: ["A", "B", "C", "D"],
    subject: [
      "English",
      "Hindi",
      "Marathi",
      "Science",
      "Mathematics",
      "History",
      "Geography",
      "Drawing",
      "Economics",
    ],
  },
  {
    name: "III",
    grade: 3,
    section: ["A", "B", "C", "D"],
    subject: [
      "English",
      "Hindi",
      "Marathi",
      "Science",
      "Mathematics",
      "History",
      "Geography",
      "Drawing",
      "Economics",
    ],
  },
  {
    name: "IV",
    grade: 4,
    section: ["A", "B", "C", "D"],
    subject: [
      "English",
      "Hindi",
      "Marathi",
      "Science",
      "Mathematics",
      "History",
      "Geography",
      "Drawing",
      "Economics",
    ],
  },
  {
    name: "V",
    grade: 5,
    section: ["A", "B", "C", "D"],
    subject: [
      "English",
      "Hindi",
      "Marathi",
      "Science",
      "Mathematics",
      "History",
      "Geography",
      "Drawing",
      "Economics",
    ],
  },
];
