module.exports = {
  async up(db, client) {
    const courses = await db.collection('courses').find();

    courses.forEach(async ({id, postIds}) => {
      await db.collection('posts').update(
        {
          type: 'COURSE',
          id: {
            $in: postIds,
          },
        },
        {
          $set: {
            courseId: id,
          },
        }
      );
    });
  },

  async down(db, client) {
    await db.collection('posts').update(
      {},
      {
        $unset: {
          courseId: undefined,
        },
      }
    );
  },
};
