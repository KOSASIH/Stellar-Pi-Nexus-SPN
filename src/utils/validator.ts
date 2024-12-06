import { body, validationResult } from 'express-validator';

export const validateTransaction = [
    body('accountId').isString().notEmpty(),
    body('amount').isNumeric().isFloat({ gt: 0 }),
    body('currency').isString().notEmpty(),
];

export const validateRequest = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
