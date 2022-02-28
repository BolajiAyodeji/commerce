import type { CommercelayerConfig } from '../index'
import { Product } from '@vercel/commerce/types/product'
import { GetProductOperation } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import data from '../../data.json'

export default function getProductOperation({
  commerce,
}: OperationContext<any>) {
  async function getProduct<T extends GetProductOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<CommercelayerConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    return {
      product: data.products.find(({ slug }) => slug === variables!.slug),
    }
  }

  return getProduct
}