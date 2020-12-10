let courses = [
    {
        text: "CMPE131",
        grade: 95,
        session: 1,
        semester: 'Fall-2020',
        professor: "Dr. A",
        id: "id1",
        time: 'Thr/Fri'
    },
    {
        text: "BIO10",
        grade: 40,
        session: 3,
        semester: 'Fall-2020',
        professor: "Dr. B",
        id: "id2",
        time: 'Thr/Fri'
    },
    {
        text: "CS146",
        grade: 80,
        session: 1,
        semester: 'Fall-2020',
        professor: "Staff",
        id: "id3",
        time: 'Tue'
    },
    {
        text: "CS149",
        grade: 30,
        session: 2,
        semester: 'Fall-2020',
        professor: "Dr. D",
        id: "id4",
        time: 'Mon/Wed'
    },
    {
        text: "CMPE120",
        grade: 70,
        session: 2,
        semester: 'Fall-2020',
        professor: "Staff",
        id: "id5",
        time: 'Mon/Wed'
    },
    {
        text: "CMPE151",
        grade: 90,
        session: 1,
        semester: 'Fall-2020',
        professor: "Dr. F",
        id: "id6",
        time: 'Tue/Thur'
    }
]

let todo = [
    {
      text: "CMPE151: Homework 7",
      due: 0,
      done: false
    },
    {
      text: "CS146: Extra credits",
      due: 4,
      done: false
    },
    {
        text: "BIO10: Research Paper",
        due: 6,
        done: false
    }
  ]

module.exports = {courses, todo}