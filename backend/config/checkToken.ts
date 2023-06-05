import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import env from "../src/util/validateEnv";

interface CustomRequest extends Request {
	user?: JwtPayload;
}

const checkToken = (req: CustomRequest, res: Response, next: NextFunction) => {
	let token = req.header('Authorization')

	if (token) {
		token = token.replace('Bearer ', '');
		// console.log(token)
		const decoded: JwtPayload = jwt.verify(token, env.SECRET) as JwtPayload;
		console.log(decoded.user);
		req.user = decoded.user
	}
	next();

}

export default checkToken;