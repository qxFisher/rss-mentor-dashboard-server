/* eslint-disable quote-props */
const jsonGenerator = require('./jsonGenerator');
const {
  pairs, tasks, mentorScore, mentors, testMentor, mentorSecondName,
} = require('./jsonGenerator.test.config');

it('Merge function test', () => {
  const merged = jsonGenerator.mergeScoreWithMentors(mentorScore, mentors);
  const mentor = merged.find(el => el.mentorName === 'Test Mentor1');

  expect(mentor).toEqual(testMentor);
});

it('getMentors function test', () => {
  const mentorsArr = jsonGenerator.getMentors(mentorSecondName, pairs);
  const res = mentorsArr.find(el => el.mentorName === 'Vladislav Kovaliov');
  expect(res).toEqual({
    'mentorGithub': 'vladislavkovaliov',
    'mentorName': 'Vladislav Kovaliov',
    'students': [
      {
        'checkedTasks': [],
        'studentGithub': 'shutya',
      },
      {
        'checkedTasks': [],
        'studentGithub': 'neshutya',
      },
    ],
  });
});

it('Create JSON test 1', () => {
  const jsonString = jsonGenerator.createJson(tasks, mentors);
  expect(jsonString.length).toBe(1078);
});

it('Create JSON test 2', () => {
  const jsonString = jsonGenerator.createJson(tasks, mentors);
  const json = JSON.parse(jsonString);
  const countMentors = json.tasks.length;
  const countTasks = json.tasks.length;

  const res = countMentors + countTasks;
  expect(res).toEqual(4);
});
