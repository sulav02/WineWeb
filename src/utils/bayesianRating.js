/**
 * Computes the Bayesian average rating for an item.
 *
 * @param {number} R - The average rating for the item (link).
 * @param {number} v - The number of ratings for the item.
 * @param {number} C - The global average rating across all items.
 * @param {number} m - The minimum number of votes required to reduce uncertainty (default: 5).
 * @returns {number} The Bayesian average score.
 */
export const computeBayesianRating = (R, v, C, m = 5) => {
    return (v / (v + m)) * R + (m / (v + m)) * C;
  };