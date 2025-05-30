
import { ModelManager } from '../../database/utils/modelManager.js';
import { MemberQueryManager } from './MemberQueryManager.js';
import { MEMBER_MODEL } from '../../constant/constant.js';

const Member = ModelManager.createModel(MemberQueryManager.createMemberTableQuery, MEMBER_MODEL);

export default Member;
