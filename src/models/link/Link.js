
import { ModelManager } from '../../database/utils/modelManager.js';
import { LinkQueryManager } from './LinkQueryManager.js';
import { LINK_MODEL } from '../../constant/constant.js';

const Link = ModelManager.createModel(LinkQueryManager.createLinkTableQuery, LINK_MODEL);

export default Link;
