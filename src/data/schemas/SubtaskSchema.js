import {SCHEMAS} from '_constants';

const SubtaskSchema = {
  name: SCHEMAS.subtask,
  properties: {
    description: 'string',
    completed: {type: 'bool', default: false},
  },
};

export default SubtaskSchema;
