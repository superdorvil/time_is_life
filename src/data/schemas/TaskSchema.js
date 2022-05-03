import {SCHEMAS, UTILS} from '_constants';

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
    dueDateIndex: {type: 'int', default: UTILS.nullDueDate},
    subtasks: "Subtask[]",
    completed: {type: 'bool', default: false},
    deleted: {type: 'bool', default: false},
    repeatType: {type: 'string', default: 'never'},
    repeatValue: {type: 'int', default: 0},
    important: {type: 'bool', default: false},
  },
};

export default TaskSchema;
