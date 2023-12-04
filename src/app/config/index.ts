import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  local_database: process.env.LOCAL_DATABASE,
  bcrypt_salt: process.env.BCRYPT_SALT_ROUNDS,
};
