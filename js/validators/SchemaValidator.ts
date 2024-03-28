import { NextFunction, Request, Response } from 'express'
import { Schema } from 'joi'

export const validate = (schema: Schema, property:  string) => (req: Request, res: Response, next: NextFunction) => {
    const typedProperty = property === 'query' ? req.query : req.body
    const { error } = schema.validate(typedProperty)
    if (error) {
        const { details } = error
        const message = details.map(i => i.message).join(',')
        res.status(400).json({
            message: message
        })
    }
    next()
}