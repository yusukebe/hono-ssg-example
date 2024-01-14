export type Photo = {
  name: string
  url: string
  width: number
  height: number
  authorId?: string
  author?: Author
}

export type Shop = {
  id: string
  name?: string
  photos?: Photo[]
}

export type Author = {
  id: string
  name: string
  url: string
}
