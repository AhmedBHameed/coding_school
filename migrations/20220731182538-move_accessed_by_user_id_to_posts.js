module.exports = {
  async up(db, client) {
    const courses = await db.collection('courses').find().toArray();

    await db.collection('posts').update(
      {},
      {
        $set: {
          accessedByUserIds: [],
        },
      }
    );

    const promises = courses.map(async (course) => {
      await db.collection('posts').updateOne(
        {id: {$in: course.postIds}},
        {
          $set: {
            accessedByUserIds: course.accessedByUserIds,
          },
        }
      );
    });

    await db.collection('courses').update(
      {},
      {
        $unset: {
          accessedByUserIds: [],
        },
      }
    );

    await Promise.all(promises);

    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});

    const courses = await db.collection('courses').find().toArray();

    await db.collection('courses').update(
      {},
      {
        $set: {
          accessedByUserIds: [],
        },
      }
    );

    const promises = courses.map(async (course) => {
      await db.collection('posts').updateOne(
        {id: {$in: course.postIds}},
        {
          $unset: {
            accessedByUserIds: [],
          },
        }
      );
    });

    await Promise.all(promises);
  },
};
