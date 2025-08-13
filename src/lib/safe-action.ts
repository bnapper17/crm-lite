import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'


export const actionClient = createSafeActionClient({
    defineMetadataSchema() {
        return z.object({
            actionName: z.string()
        })
    },
    handleServerError(e, utils) {
        const { clientInput, metadata } = utils
        console.log(e.message)
        console.log(clientInput)
        console.log(metadata.actionName)
        
        return e.message
    }
})