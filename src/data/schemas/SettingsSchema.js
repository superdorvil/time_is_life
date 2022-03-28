import {SCHEMAS} from '_constants';
import {COLORS} from '_resources';

const SettingsSchema = {
  name: SCHEMAS.settings,
  properties: {
    colorScheme: {type: 'int', default: COLORS.orangeLight},
  },
};

export default SettingsSchema;
