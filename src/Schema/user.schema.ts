import { mysqlTable, int, varchar , boolean, date } from "drizzle-orm/mysql-core"

export const user = mysqlTable('users', {
  id: int().autoincrement().primaryKey(),
  username : varchar({length:50}).notNull(),
  email:  varchar({length:50}).notNull().unique(),
  password:  varchar({length:255}).notNull() , 
  isOnline:boolean().notNull().default(false) , 
  RefreshToken : varchar({length:255}) , 
  RefreshTokenExpiry : date() , 
  picture_url :  varchar({length:255}) , 
  picture_id :  varchar({length:255})
});
