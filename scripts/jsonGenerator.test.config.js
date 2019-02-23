/* eslint-disable quote-props */
const mentorScore = [
  {
    Timestamp: 43408.591869571756,
    'Ссылка на GitHub ментора в формате: https://github.com/nickname': 'github1',
    'Ссылка на GitHub студента в формате: https://github.com/nickname': 'StudentGit1',
    'Таск': 'Code Jam "CV"',
    'Ссылка на Pull Request': 'https://github.com/Meearlyam/rsschool-codejam1-cv/pull/1',
    'Оценка': 50,
    'Комментарий к оценке': 'Good parts: using only English;\nBad parts: merged without a review;',
  },
  {
    Timestamp: 43408,
    'Ссылка на GitHub ментора в формате: https://github.com/nickname': 'github2',
    'Ссылка на GitHub студента в формате: https://github.com/nickname': 'StudentGit11',
    'Таск': 'Code Jam "CV"',
    'Ссылка на Pull Request': 'https://github.com/Meearlyam/rsschool-codejam1-cv/pull/1',
    'Оценка': 100,
    'Комментарий к оценке': 'Good parts',
  },
];

const mentors = [
  {
    mentorName: 'Test Mentor1',
    mentorGithub: 'github1',
    students: [{ studentGithub: 'StudentGit1', checkedTasks: [] },
      { studentGithub: 'StudentGit2', checkedTasks: [] },
    ],
  },
  {
    mentorName: 'Test Mentor2',
    mentorGithub: 'github2',
    students: [{ studentGithub: 'StudentGit11', checkedTasks: [] },
      { studentGithub: 'StudentGit22', checkedTasks: [] },
    ],
  },
];

const testMentor = {
  mentorName: 'Test Mentor1',
  mentorGithub: 'github1',
  students: [
    { studentGithub: 'StudentGit1', checkedTasks: ['Code Jam "CV"'] },
    { studentGithub: 'StudentGit2', checkedTasks: [] },
  ],
};

const mentorSecondName = [
  {
    Name: 'Vladislav',
    Surname: 'Kovaliov',
    City: 'Минск',
    Count: 2,
    GitHub: 'https://github.com/vladislavkovaliov/',
  },
  {
    Name: 'Sergeh',
    Surname: 'Korotkin',
    City: 'Минск',
    Count: 5,
    GitHub: 'https://github.com/korotkin',
  },
];

const pairs = [
  { interviewer: 'Vladislav Kovaliov', 'student github': 'shutya' },
  { interviewer: 'Vladislav Kovaliov', 'student github': 'neshutya' },
  { interviewer: 'Sergeh Korotkin', 'student github': 'dgekaa' },
];

const tasks = [
  {
    taskName: 'Code Jam "CV"',
    taskLink: 'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/codejam-cv.md',
    taskStatus: 'Checked',
  },
  {
    taskName: 'Code Jam "CoreJS"',
    taskLink: 'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/codejam-corejs.md',
    taskStatus: 'Checked',
  },
];

module.exports = {
  pairs, tasks, mentorScore, mentors, testMentor, mentorSecondName,
};
