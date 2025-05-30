
import { ModelManager } from '../../database/utils/modelManager.js';
import { RatingQueryManager } from './RatingQueryManager.js';
import { RATING_MODEL } from '../../constant/constant.js';

const Rating = ModelManager.createModel(RatingQueryManager.createRatingTableQuery, RATING_MODEL);

export default Rating;
