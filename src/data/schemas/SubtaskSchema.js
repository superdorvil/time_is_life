import {SCHEMAS} from '_constants';

const SubtaskSchema = {
  name: SCHEMAS.subtask,
  properties: {
    description: 'string',
    position: {type: 'int', default: 0},
    completed: {type: 'bool', default: false},
  },
};

export default SubtaskSchema;
