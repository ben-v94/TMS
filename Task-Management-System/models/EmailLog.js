import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const EmailLog = sequelize.define('EmailLog', {
  recipient_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  task_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'Tasks',
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  sender_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
}, {
  tableName: 'email_logs',
  underscored: true,
  timestamps: true,
});

export default EmailLog;
