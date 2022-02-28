import { HookFetcher } from '@vercel/commerce/utils/types'
import type { Product } from '@vercel/commerce/types/product'
import data from '../data.json'
import { useCustomer } from '../customer'

const defaultOpts = {}

export type Wishlist = {
  items: [
    {
      variant_id: number
      product_id: number
      id: number
      product: Product
    }
  ]
}

export interface UseWishlistOptions {
  includeProducts?: boolean
}

export interface UseWishlistInput extends UseWishlistOptions {
  customerId?: number
}

export const fetcher: HookFetcher<Wishlist | null, UseWishlistInput> = () => {
  return null
}

export function extendHook(
  customFetcher: typeof fetcher,
  // swrOptions?: SwrOptions<Wishlist | null, UseWishlistInput>
  swrOptions?: any
) {
  const useWishlist = ({ includeProducts }: UseWishlistOptions = {}) => {
    const { data: customer } = useCustomer()
    const getWishlist =
      typeof localStorage !== 'undefined' && localStorage.getItem('wishlist')
    if (getWishlist && customer?.email && data.products.length > 0) {
      const wishlist = JSON.parse(getWishlist)
      const items = wishlist.map((wishlist: string, id: number) => {
        const [product] = data.products.filter((p) =>
          wishlist.startsWith(p.id)
        ) as any
        const [variant] = product?.variants
        return {
          variant_id: variant?.id,
          product_id: product?.id,
          id,
          product,
        }
      })
      return { data: { items } }
    }
    return { data: null }
  }

  useWishlist.extend = extendHook

  return useWishlist
}

export default extendHook(fetcher)