import { idbStorage } from 'investira.react.lib';

const storage = idbStorage({ name: 'investira_vc', storeName: 'store_values' });

export default storage;
