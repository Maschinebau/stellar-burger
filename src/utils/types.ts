
export type TUser = {
  readonly name?: string
  readonly email?: string
  readonly password?: string
}

export type TIngredient = {
  index?: number | undefined
  dragId?: string | undefined
  readonly _id: string
  readonly name: string
  readonly type: string
  readonly proteins: number
  readonly fat: number
  readonly carbohydrates: number
  readonly calories: number
  readonly price: number
  readonly image: string
  readonly image_mobile: string
  readonly image_large: string
  readonly __v: number
}

type TOrderOwner = {
  readonly name: string
  readonly email: string
  readonly createdAt: string
  readonly updatedAt: string
}

export type TOrderResponse = {
  readonly success: boolean
  readonly name: string
  readonly order: TOrder
}

export type TOrder = {
  readonly ingredients: TIngredient[]
  readonly _id: string
  readonly owner: TOrderOwner
  readonly status: string
  readonly name: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly number: number
  readonly price: number
}
