module.exports = {
  async up(db) {
    await db.collection('post_contents').update(
      {},
      {
        $set: {
          likes: 0,
        },
      }
    );
  },

  async down(db) {
    await db.collection('post_contents').update(
      {},
      {
        $unset: {
          likes: undefined,
        },
      }
    );
  },
};
