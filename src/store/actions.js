import * as types from './mutation-types'

export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit(types.INDEX_DATA, {
      id: product.id
    })
  }
}
