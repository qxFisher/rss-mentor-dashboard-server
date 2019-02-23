/* eslint-disable prefer-destructuring */
const fs = require('fs');
const XLSX = require('xlsx');
const _ = require('lodash');

const GITHUBREGEX = /http(s)?:\/\/githu?i?b\.com\/(rolling-scopes\/)?([A-z 0-9 _ -]+)\/?/;
const tasksXl = XLSX.readFile('./data/Tasks.xlsx');

const getTaskStatus = (sheet, currentRow) => {
  const fieldMapping = {
    taskName: 'A',
    taskLink: 'B',
    taskStatus: 'C',
  };

  let taskLink = sheet[fieldMapping.taskLink + currentRow];
  if (taskLink) {
    taskLink = sheet[fieldMapping.taskLink + currentRow].v.trim();
  }
  const taskName = sheet[fieldMapping.taskName + currentRow].v.trim();
  const taskStatus = sheet[fieldMapping.taskStatus + currentRow].v.trim();

  const task = {
    taskName,
    taskLink,
    taskStatus,
  };

  return task;
};

const getTasks = (sheet) => {
  const count = XLSX.utils.decode_range(sheet['!ref']).e.r;
  const rows = _.range(2, count + 2);

  return rows.map(row => getTaskStatus(sheet, row));
};

const getMentors = (mentors, pairs) => mentors.map((mentor) => {
  const fullName = `${mentor.Name} ${mentor.Surname}`;
  const students = [];
  pairs.forEach((pair) => {
    if (fullName === pair.interviewer) {
      students.push({ studentGithub: pair['student github'], checkedTasks: [] });
    }
  });

  let githubLink = mentor.GitHub;
  const githubLinkRegex = githubLink.match(GITHUBREGEX);
  if (githubLinkRegex) {
    githubLink = githubLinkRegex[3];
  }
  return {
    mentorName: fullName,
    mentorGithub: githubLink,
    students,
  };
});

const mergeScoreWithMentors = (mentorScore, mentors) => {
  mentorScore.forEach((scoreRow) => {
    let mentorGithub = scoreRow['Ссылка на GitHub ментора в формате: https://github.com/nickname'];
    const githubLinkRegex = mentorGithub.match(GITHUBREGEX);
    if (githubLinkRegex) {
      mentorGithub = githubLinkRegex[3];
    }

    let studentGithub = scoreRow['Ссылка на GitHub студента в формате: https://github.com/nickname'];
    const studGithubLinkRegex = studentGithub.match(GITHUBREGEX);
    if (studGithubLinkRegex) {
      studentGithub = studGithubLinkRegex[3].toLowerCase();
    }

    if (scoreRow['Оценка']) {
      mentors.forEach((mentor) => {
        mentor.students.forEach((student) => {
          const studentGit = student.studentGithub;
          if (studentGit === studentGithub) {
            student.checkedTasks.push(scoreRow['Таск']);
          }
        });
      });
    }
  });
  return mentors;
};

const createJson = (tasks, mentors) => {
  const result = {
    tasks,
    mentors,
  };
  const json = JSON.stringify(result, 0, 2);
  return json;
};

const generate = () => {
  const tasksSheet = tasksXl.Sheets.Sheet1;
  const tasks = getTasks(tasksSheet);

  const mentorStudentsPairsXl = XLSX.readFile('./data/Mentor-students pairs.xlsx');
  const mentorsPairsSheet1 = mentorStudentsPairsXl.Sheets.pairs;
  const mentorsPairsSheet2 = mentorStudentsPairsXl.Sheets['second_name-to_github_account'];

  const mentorPairs = XLSX.utils.sheet_to_json(mentorsPairsSheet1, { header: 2 });
  const mentorSecondName = XLSX.utils.sheet_to_json(mentorsPairsSheet2, { header: 2 });

  const mentorsArr = getMentors(mentorSecondName, mentorPairs);

  const mentorScoreXl = XLSX.readFile('./data/Mentor score.xlsx');
  const mentorScoreSheet = mentorScoreXl.Sheets['Form Responses 1'];
  const mentorScoreData = XLSX.utils.sheet_to_json(mentorScoreSheet, { header: 2 });

  const mentorsWithStudents = mergeScoreWithMentors(mentorScoreData, mentorsArr);

  const json = createJson(tasks, mentorsWithStudents);
  fs.writeFile('./data/data.json', json, 'utf8', () => {});
  return json;
};

module.exports = {
  generate, getTaskStatus, getTasks, getMentors, mergeScoreWithMentors, createJson,
};
