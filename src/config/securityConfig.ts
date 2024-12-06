import rateLimit from 'express-rate-limit';
import cors from 'cors';

const corsOptions = {
    origin: 'http://your-frontend-domain.com',
    optionsSuccessStatus: 200,
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

export { corsOptions, limiter };
