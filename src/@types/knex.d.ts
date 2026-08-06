/* eslint-disable @typescript-eslint/no-unused-vars */
 import { knex } from 'knex'
   declare module 'knex/types/tables.js' {
  export interface Tables {
    transactions: {
      id: string
      title: string
      price: number
      type: 'income' | 'outcome'
      category: string
      created_at: Date
      session_id?: string
    }
  }
}