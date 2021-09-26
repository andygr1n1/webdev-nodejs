import path from 'path'

export const createPath = (page: string): string => path.resolve(__dirname, '../ejs-views', `${page}.ejs`)
