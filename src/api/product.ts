import type { FilterParams, OrderType, Product, ProductType } from '@/stores/product'
import { api } from './base'

export async function requestGetProducts(params: FilterParams): Promise<Product[]> {
  try {
    const { data } = await api.get('/items', {
      params
    })
    return data
  } catch (error) {
    throw error
  }
}

export async function requestGetFavorites(): Promise<Product[]> {
  try {
    const { data } = await api.get('/favorites?_relations=items')
    return data
  } catch (error) {
    throw error
  }
}

export async function requestCreateFavorite(item_id: number) {
  try {
    const obj = {
      item_id
    }

    const { data } = await api.post('/favorites', obj)

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function requestDeleteFavorite(item_id: number) {
  try {
    const { data } = await api.delete(`/favorites/${item_id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}
export async function requestGetOrders(): Promise<OrderType[]> {
  try {
    const { data } = await api.get('/orders')
    return data
  } catch (error) {
    throw error
  }
}

export async function requestCreateOrder(cart: ProductType[], totalPrice: number) {
  try {
    const { data } = await api.post('/orders', {
      cart,
      totalPrice
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
