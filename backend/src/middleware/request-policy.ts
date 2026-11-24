export const CORS_METHODS = ['GET', 'HEAD', 'POST'] as const;
export const CORS_METHOD_SET = new Set<string>(CORS_METHODS);
export const HTTP_METHODS = new Set<string>([...CORS_METHODS, 'OPTIONS']);
export const HTTP_METHODS_HEADER = [...HTTP_METHODS].join(', ');
export const CORS_METHODS_HEADER = CORS_METHODS.join(', ');
