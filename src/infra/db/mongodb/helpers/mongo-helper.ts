import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect () {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    await this.connect(this.uri)
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...rest } = collection
    return Object.assign({}, rest, { id: _id.toString() })
  }
}
