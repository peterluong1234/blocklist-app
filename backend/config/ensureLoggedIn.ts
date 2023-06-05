import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
	user?: JwtPayload;
}


const ensureLoggedIn = (req: CustomRequest, res: Response, next: NextFunction) => {
	if(!req.user) return res.status(401).json('Unauthorized');
	next();
}

export default ensureLoggedIn;