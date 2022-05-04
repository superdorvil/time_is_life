import {SCHEMAS} from '_constants';

const ProjectSchema = {
  primaryKey: 'id',
  name: SCHEMAS.project,
  properties: {
    id: 'int',
    description: 'string',
    position: 'int',
    completed: {type: 'bool', default: false},
    deleted: {type: 'bool', default: false},
    timerActive: {type: 'bool', default: false},
    timerStartTime: 'date?',
    totalSecondsWorked: {type: 'int', default: 0},
    thisWeeksSecondsWorked: {type: 'int', default: 0},
    thisWeeksSecondsGoal: {type: 'int', default: 0},
  },
};

export default ProjectSchema;
