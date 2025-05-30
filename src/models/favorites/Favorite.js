
import { ModelManager } from '../../database/utils/modelManager.js';
import { FavoritesQueryManager } from './FavoriteQueryManager.js';
import { FAVORITE_MODEL } from '../../constant/constant.js';

const Favorite = ModelManager.createModel(FavoritesQueryManager.createFavouriteTableQuery, FAVORITE_MODEL);

export default Favorite;
