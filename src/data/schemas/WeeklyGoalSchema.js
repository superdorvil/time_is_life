import {SCHEMAS} from '_constants';

const WeeklyGoalSchema = {
  name: SCHEMAS.weeklyGoal,
  properties: {
    weekIndex: 'int',
    weeklyGoalSeconds: 'int', // FIXME:: Change to hours???
    projectID: 'int',
  },
};

export default WeeklyGoalSchema;
