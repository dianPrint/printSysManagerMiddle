const initRole = pool => {
    return {
      add: async role => {
        const client = await pool.connect();
        const sqlValue = [];
        const sqlValuePlaceholder = [];
        const sqlQueryStr = Object.keys(role)
          .map((v, i) => {
            sqlValue.push(role[v]);
            sqlValuePlaceholder.push(`$${i + 1}`);
            return v;
          })
          .join(" , ");
        const sqlStr = `INSERT INTO  user_manager."role"(${sqlQueryStr}) VALUES (${sqlValuePlaceholder.join(
          " , "
        )}) RETURNING *`;
        try {
          const res = await client.query(sqlStr, sqlValue);
          return res.rows;
        } finally {
          client.release();
        }
      },
      del: async id => {
        const client = await pool.connect();
        const sqlStr = `DELETE FROM user_manager."role" WHERE id = $1`;
        try {
          const res = await client.query(sqlStr, [id]);
          return res;
        } finally {
          client.release();
        }
      },
      update: async role => {
        if (!role || !role.id) {
          return "no role id";
        }
        console.log("-->");
        const client = await pool.connect();
        const sqlValue = [role.id];
        delete role.id;
        console.log("-->2");
        const sqlQueryStr = Object.keys(role)
          .map((v, i) => {
            sqlValue.push(role[v]);
            return `${v} = $${i + 2}`;
          })
          .join(" , ");
        console.log("-->3 ", `UPDATE user_manager."role" SET ${sqlQueryStr} WHERE id = $1 RETURNING *`);;
        try {
          const res = await client.query(`UPDATE user_manager."role" SET ${sqlQueryStr} WHERE id = $1 RETURNING *`, sqlValue);
          return res.rows;
        } finally {
          client.release();
        }
      },
      get: async (role = {}) => {
        const client = await pool.connect();
        const sqlValue = [];
        const sqlQueryStr =
          Object.keys(role).length !== 0
            ? " WHERE " +
              Object.keys(role)
                .map((v, i) => {
                  sqlValue.push(role[v]);
                  return `${v} = $${i + 1}`;
                })
                .join(" and ")
            : "";
        const sqlStr = `SELECT * FROM user_manager."role" ${sqlQueryStr}`;
        try {
          const res = await client.query(sqlStr, sqlValue);
          return res.rows;
        } finally {
          client.release();
        }
      }
    };
  };
  
  module.exports = initRole;
  