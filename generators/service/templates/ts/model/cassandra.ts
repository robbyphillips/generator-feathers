// See https://express-cassandra.readthedocs.io/en/latest/schema/
// for more of what you can do here.
import { Application } from '../declarations';

export default function (app: Application): any {
  const models = app.get('models');
  const <%= camelName %> = models.loadSchema('<%= camelName %>', {
    table_name: '<%= snakeName %>',
    fields: {
      id: 'int',
      text: {
        type: 'text',
        rule: {
          required: true
        }
      }
    },
    key: ['id'],
    custom_indexes: [
      {
        on: 'text',
        using: 'org.apache.cassandra.index.sasi.SASIIndex',
        options: {}
      }
    ],
    options: {
      timestamps: true
    }
  }, function (err: any) {
    if (err) throw err;
  });

  <%= camelName %>.syncDB(function (err: any) {
    if (err) throw err;
  });

  return <%= camelName %>;
}
