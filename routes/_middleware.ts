import authMiddleware from '../services/authMW.ts'
import loggingMiddleware from '../services/loggingMW.ts'
export const handler = [authMiddleware, loggingMiddleware]
