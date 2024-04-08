export const rateLimitConfig = {
	// https://www.npmjs.com/package/express-rate-limit
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 100, // limit each IP to 100 requests per windowMs
};
