const initUser = pool => {
  return {
    add: async user => {
      const client = await pool.connect();
      const sqlValue = [];
      const sqlValuePlaceholder = [];
      const sqlQueryStr = Object.keys(user)
        .map((v, i) => {
          sqlValue.push(user[v]);
          sqlValuePlaceholder.push(`$${i + 1}`);
          return v;
        })
        .join(" , ");
      const sqlStr = `INSERT INTO  user_manager."user"(${sqlQueryStr}) VALUES (${sqlValuePlaceholder.join(
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
      const sqlStr = `DELETE FROM user_manager."user" WHERE id = $1`;
      try {
        const res = await client.query(sqlStr, [id]);
        return res;
      } finally {
        client.release();
      }
    },
    update: async user => {
      if (!user || !user.id) {
        return "no user id";
      }
      console.log("-->");
      const client = await pool.connect();
      const sqlValue = [user.id];
      delete user.id;
      console.log("-->2");
      const sqlQueryStr = Object.keys(user)
        .map((v, i) => {
          sqlValue.push(user[v]);
          return `${v} = $${i + 2}`;
        })
        .join(" , ");
      console.log("-->3 ", `UPDATE user_manager."user" SET ${sqlQueryStr} WHERE id = $1 RETURNING *`);;
      try {
        const res = await client.query(`UPDATE user_manager."user" SET ${sqlQueryStr} WHERE id = $1 RETURNING *`, sqlValue);
        return res.rows;
      } finally {
        client.release();
      }
    },
    get: async (user = {}) => {
      const client = await pool.connect();
      const sqlValue = [];
      const sqlQueryStr =
        Object.keys(user).length !== 0
          ? " WHERE " +
            Object.keys(user)
              .map((v, i) => {
                sqlValue.push(user[v]);
                return `${v} = $${i + 1}`;
              })
              .join(" and ")
          : "";
      const sqlStr = `SELECT * FROM user_manager."user" ${sqlQueryStr}`;
      try {
        const res = await client.query(sqlStr, sqlValue);
        return res.rows;
      } finally {
        client.release();
      }
    }
  };
};

module.exports = initUser;
