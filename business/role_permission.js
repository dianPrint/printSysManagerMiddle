const initRole_Permission = pool => {
    return {
      add: async role_Permission => {
        const client = await pool.connect();
        const sqlValue = [];
        const sqlValuePlaceholder = [];
        const sqlQueryStr = Object.keys(role_Permission)
          .map((v, i) => {
            sqlValue.push(role_Permission[v]);
            sqlValuePlaceholder.push(`$${i + 1}`);
            return v;
          })
          .join(" , ");
        const sqlStr = `INSERT INTO  user_manager."role_permission"(${sqlQueryStr}) VALUES (${sqlValuePlaceholder.join(
          " , "
        )}) RETURNING *`;
        try {
          const res = await client.query(sqlStr, sqlValue);
          return res.rows;
        } finally {
          client.release();
        }
      },
      del: async (roleid, permissionid) => {
        const client = await pool.connect();
        const sqlStr = `DELETE FROM user_manager."role_permission" WHERE roleid = $1 AND roleid permissionid = $2 `;
        try {
          const res = await client.query(sqlStr, [roleid, permissionid]);
          return res;
        } finally {
          client.release();
        }
      },
      get: async (roleid) => {
        const client = await pool.connect();
        const sqlStr = `SELECT * FROM user_manager."role_permission" WHERE roleid = $1`;
        try {
          const res = await client.query(sqlStr, [roleid]);
          return res.rows;
        } finally {
          client.release();
        }
      }
    };
  };
  
  module.exports = initRole_Permission;
  