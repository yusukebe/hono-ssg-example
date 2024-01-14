import { Shop } from './types'

const BASE_URL = 'https://ramen-api.dev'

export const getShops = async (): Promise<Shop[]> => {
  const url = new URL('/shops', BASE_URL)
  const res = await fetch(url)
  const { shops } = (await res.json()) as { shops: Shop[] }
  return shops
}

export const getShop = async (id: string): Promise<Shop | undefined> => {
  const url = new URL(`/shops/${id}`, BASE_URL)
  const res = await fetch(url)
  if (!res.ok) return undefined
  const { shop } = (await res.json()) as { shop: Shop }
  return shop
}
