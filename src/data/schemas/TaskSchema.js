import {SCHEMAS} from '_constants';

const TaskSchema = {
  primaryKey: 'id',
  name: SCHEMAS.task,
  properties: {
    id: 'int',
    projectID: 'int',
    description: 'string',
    position: 'int',
    dueDateIndex: 'int?',
    completed: {type: 'bool', default: false},
  },
};

export default TaskSchema;
