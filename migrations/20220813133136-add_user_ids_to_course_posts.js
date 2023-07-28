module.exports = {
  async up(db, client) {
    await db.collection('posts').update(
      {type: 'COURSE'},
      {
        $set: {
          accessedByUserIds: [
            '01EGXMD8378F5TZ8NGP9J8J3TZ',
            '01G7M6H6VDNSV320MP25KKXVXS',
          ],
        },
      }
    );

    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});

    await db.collection('posts').update(
      {},
      {
        $unset: {
          accessedByUserIds: [],
        },
      }
    );
  },
};
