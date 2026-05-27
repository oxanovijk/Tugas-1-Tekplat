import bcrypt from 'bcryptjs'
import { pool } from '../config/db.js'

const name = process.env.ADMIN_NAME ?? 'Superadmin HiddenGem'
const email = (process.env.ADMIN_EMAIL ?? 'admin@hiddengem.local').toLowerCase()
const password = process.env.ADMIN_PASSWORD ?? 'Admin123!'

if (password.length < 8) {
  throw new Error('ADMIN_PASSWORD must contain at least 8 characters')
}

const passwordHash = await bcrypt.hash(password, 12)

await pool.execute(
  `INSERT INTO users (name, email, password_hash, role, approval_status)
   VALUES (?, ?, ?, "superadmin", "approved")
   ON DUPLICATE KEY UPDATE
     name = VALUES(name),
     password_hash = VALUES(password_hash),
     role = "superadmin",
     approval_status = "approved"`,
  [name, email, passwordHash],
)

await pool.end()

console.log(`Superadmin ready: ${email}`)
