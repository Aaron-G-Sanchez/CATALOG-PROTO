import { DataTypes, Model, Sequelize } from 'sequelize'
import { db } from '../db/connect'
import type { User } from '@catalog/types'

export const UserModel = db.define<Model<User>>(
  'users',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: false }
)
