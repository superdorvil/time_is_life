import {SCHEMAS} from '_constants';

const TaskSchema = {
  primaryKey: 'id',
  name: SCHEMAS.task,
  properties: {
    id: 'int',
    projectID: 'int',
    description: 'string',
    position: 'int',
    // I don't set this null intentionally
    // To do list orders items to the bottom automatically
    // altered due dates automatically get pushed to the to of list
    dueDateIndex: {type: 'int', default: 9999999999999},
    completed: {type: 'bool', default: false},
  },
};

export default TaskSchema;
