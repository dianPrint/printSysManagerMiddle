const initUser_role = pool => {
    return {
      add: async user_role => {
        const client = await pool.connect();
        const sqlValue = [];
        const sqlValuePlaceholder = [];
        const sqlQueryStr = Object.keys(user_role)
          .map((v, i) => {
            sqlValue.push(user_role[v]);
            sqlValuePlaceholder.push(`$${i + 1}`);
            return v;
          })
          .join(" , ");
        const sqlStr = `INSERT INTO  user_manager."user_role"(${sqlQueryStr}) VALUES (${sqlValuePlaceholder.join(
          " , "
        )}) RETURNING *`;
        try {
          const res = await client.query(sqlStr, sqlValue);
          return res.rows;
        } finally {
          client.release();
        }
      },
      del: async (userid, roleid ) => {
        const client = await pool.connect();
        const sqlStr = `DELETE FROM user_manager."user_role" WHERE userid = $1 AND roleid roleid = $2 `;
        try {
          const res = await client.query(sqlStr, [userid, roleid]);
          return res;
        } finally {
          client.release();
        }
      },
      get: async (userid) => {
        const client = await pool.connect();
        const sqlStr = `SELECT * FROM user_manager."user_role" WHERE userid = $1`;
        try {
          const res = await client.query(sqlStr, [userid]);
          return res.rows;
        } finally {
          client.release();
        }
      }
    };
  };
  
  module.exports = initUser_role;
  