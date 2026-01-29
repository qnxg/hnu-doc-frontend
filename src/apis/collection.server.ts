import type { Collection } from "@/src/models/collection"
import request from "@/src/lib/server"

export async function getCollections() {
  return await request.get<Collection[]>("/collection")
}
