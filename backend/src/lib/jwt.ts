import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

/**
 * JWT configuration interface
 */
export interface JWTConfig {
  secret: string;
  expiresIn?: string | number;
}

/**
 * JWT token payload interface
 */
export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

/**
 * Type guard to check if a value is a valid time string format
 */
function isValidTimeString(value: string): boolean {
  const timeRegex = /^(\d+)([smhd])?$/i;
  return timeRegex.test(value);
}

/**
 * Type guard to check if a string is a valid number
 */
function isNumericString(value: string): boolean {
  const numberRegex = /^\d+$/;
  return numberRegex.test(value);
}

/**
 * Validates and returns JWT configuration from environment variables
 * @throws {Error} If JWT_SECRET is not set
 */
export function getJWTConfig(): JWTConfig {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }

  // Validate secret strength
  if (secret.length < 32) {
    throw new Error(
      'JWT_SECRET must be at least 32 characters long. ' +
      'Run "npm run generate:jwt-secret" to generate a secure secret.'
    );
  }

  const expiresIn = process.env.JWT_EXPIRES_IN;
  
  // If expiresIn is 'never' or empty, token won't expire
  const config: JWTConfig = {
    secret,
  };

  if (expiresIn && expiresIn !== 'never' && expiresIn.trim() !== '') {
    config.expiresIn = expiresIn;
  }

  return config;
}

/**
 * Creates sign options for JWT token generation
 * Validates and normalizes expiresIn to ensure type safety
 * Returns a properly typed SignOptions object
 */
function createSignOptions(expiresIn?: string | number): SignOptions | undefined {
  if (!expiresIn) {
    return undefined;
  }

  // Handle number type
  if (typeof expiresIn === 'number') {
    if (expiresIn > 0) {
      return { expiresIn: expiresIn as number };
    }
    return undefined;
  }

  // Handle string type
  if (typeof expiresIn === 'string') {
    const trimmed = expiresIn.trim();
    
    if (trimmed === '' || trimmed === 'never') {
      return undefined;
    }

    // Check if it's a valid time string (e.g., "7d", "24h", "3600s")
    if (isValidTimeString(trimmed)) {
      // jsonwebtoken accepts string values like "7d", "24h", etc. for expiresIn
      // TypeScript's SignOptions.expiresIn accepts string values that match time patterns
      return { expiresIn: trimmed as SignOptions['expiresIn'] };
    }
    
    // Check if it's a number as string
    if (isNumericString(trimmed)) {
      const numValue = parseInt(trimmed, 10);
      if (!isNaN(numValue) && numValue > 0) {
        return { expiresIn: numValue };
      }
    }
  }

  return undefined;
}

/**
 * Generates a JWT token with the given payload
 * @param payload - Token payload data
 * @param config - JWT configuration (optional, will use environment variables if not provided)
 * @returns JWT token string
 * @throws {Error} If JWT_SECRET is not configured
 */
export function generateToken(
  payload: TokenPayload,
  config?: JWTConfig
): string {
  const jwtConfig = config || getJWTConfig();
  const signOptions = createSignOptions(jwtConfig.expiresIn);

  if (signOptions) {
    return jwt.sign(payload, jwtConfig.secret, signOptions);
  }

  return jwt.sign(payload, jwtConfig.secret);
}

/**
 * Safely gets a property from an object
 */
function getProperty(obj: object, key: string): unknown {
  return Object.prototype.hasOwnProperty.call(obj, key) ? (obj as Record<string, unknown>)[key] : undefined;
}

/**
 * Type guard to validate token payload structure
 * Fully type-safe without unsafe assertions
 */
function isTokenPayload(payload: unknown): payload is TokenPayload {
  if (typeof payload !== 'object' || payload === null) {
    return false;
  }

  const id = getProperty(payload, 'id');
  const email = getProperty(payload, 'email');
  const role = getProperty(payload, 'role');

  return (
    typeof id === 'string' &&
    typeof email === 'string' &&
    typeof role === 'string' &&
    id.length > 0 &&
    email.length > 0 &&
    role.length > 0
  );
}

/**
 * Verifies and decodes a JWT token
 * @param token - JWT token string
 * @param config - JWT configuration (optional, will use environment variables if not provided)
 * @returns Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
export function verifyToken(
  token: string,
  config?: JWTConfig
): TokenPayload {
  const jwtConfig = config || getJWTConfig();
  
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    
    // Type guard to ensure decoded is an object
    if (typeof decoded !== 'object' || decoded === null) {
      throw new Error('Invalid token payload structure');
    }

    // Use type guard to validate payload structure
    if (!isTokenPayload(decoded)) {
      throw new Error('Invalid token payload structure');
    }

    // TypeScript now knows decoded is TokenPayload
    return decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired');
    }
    if (error instanceof jwt.NotBeforeError) {
      throw new Error('Token not active');
    }
    throw error;
  }
}

/**
 * Validates JWT environment variables at startup
 * Call this during application initialization
 */
export function validateJWTEnv(): void {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error(
      'JWT_SECRET environment variable is required. ' +
      'Please set it in your environment variables. ' +
      'Run "npm run generate:jwt-secret" to generate a secure secret.'
    );
  }

  // Validate secret strength
  if (secret.length < 32) {
    throw new Error(
      `JWT_SECRET is too short (${secret.length} characters). ` +
      'It must be at least 32 characters long for security. ' +
      'Run "npm run generate:jwt-secret" to generate a secure secret.'
    );
  }

  // Warn if secret looks weak (common patterns)
  const weakPatterns = [
    /^password/i,
    /^secret/i,
    /^jwt/i,
    /^token/i,
    /^key$/i,
    /^123/,
    /^admin/i,
  ];

  if (weakPatterns.some(pattern => pattern.test(secret))) {
    console.warn(
      '⚠️  Warning: JWT_SECRET appears to be weak. ' +
      'Consider using a cryptographically random secret. ' +
      'Run "npm run generate:jwt-secret" to generate a secure secret.'
    );
  }

  const expiresIn = process.env.JWT_EXPIRES_IN;
  if (expiresIn && expiresIn !== 'never') {
    // Validate expiresIn format
    const trimmed = expiresIn.trim();
    
    if (trimmed !== '' && !isValidTimeString(trimmed) && !isNumericString(trimmed)) {
      console.warn(
        `Warning: JWT_EXPIRES_IN format "${expiresIn}" may be invalid. ` +
        'Expected format: number (seconds) or string like "7d", "24h", "3600s". ' +
        'Use "never" for no expiration.'
      );
    }
  }
}
