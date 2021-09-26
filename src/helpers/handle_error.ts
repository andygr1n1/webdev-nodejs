/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { createPath } from './create_path'
export const handleError = (res: any, error: any) => {
    res.render(createPath('error'), { title: 'error' })
    console.log('error:::', error)
}
