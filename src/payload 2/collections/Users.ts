import type { CollectionConfig, Access } from 'payload'

type UserRole = 'admin' | 'editor'

interface PayloadUser {
  id: string
  email: string
  role?: UserRole
}

// Helper function to check if user is admin
const isAdmin: Access = ({ req: { user } }) => {
  const payloadUser = user as PayloadUser | null
  return payloadUser?.role === 'admin'
}

// Helper function to check if user is self or admin
const isAdminOrSelf: Access = ({ req: { user } }) => {
  const payloadUser = user as PayloadUser | null
  if (!payloadUser) return false
  if (payloadUser.role === 'admin') return true
  return {
    id: {
      equals: payloadUser.id,
    },
  }
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Benutzer',
    plural: 'Benutzer',
  },
  auth: {
    // Account lockout after 5 failed login attempts
    maxLoginAttempts: 5,
    // Lock account for 30 minutes after max attempts
    lockTime: 30 * 60 * 1000, // 30 minutes in milliseconds
    // Token expiration
    tokenExpiration: 7200, // 2 hours
    // Verify email is optional but recommended
    verify: false,
  },
  // Access Control - Only admins can create users, no public registration
  access: {
    // Only admins can create new users - NO PUBLIC REGISTRATION
    create: isAdmin,
    // Admins can read all, others only themselves
    read: isAdminOrSelf,
    // Admins can update all, others only themselves
    update: isAdminOrSelf,
    // Only admins can delete users
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'email',
    group: 'System',
    description: 'CMS-Benutzer und Zugriffsrechte',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rolle',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'editor',
    },
  ],
}
