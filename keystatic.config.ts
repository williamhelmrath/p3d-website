import { config, fields, collection } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

const ENV = import.meta.env.MODE;
const isProduction = ENV === 'production';

export default config({
  storage: isProduction ? {
    kind: 'github',
    repo: {
      owner: 'williamhelmrath',
      name: 'p3d-website',
    }
  } : {
    kind: 'local',
  },

  collections: {
    docs: collection({
      label: 'Docs',
      path: 'src/content/docs/docs/**',
      slugField: 'title',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          description: 'Optional. Shown in page metadata and search results.',
        }),
        tableOfContents: fields.checkbox({
          label: 'Show table of contents',
          defaultValue: true,
        }),
        content: fields.mdx({
          label: 'Content',
          extension: 'mdx',
          components: {
            GoogleDoc: block({
              label: 'Google Doc',
              schema: {
                src: fields.url({ label: 'Document URL' }),
                isEditable: fields.checkbox({
                  label: 'Show "Edit this document" link',
                  defaultValue: true,
                }),
              },
            }),
            RemoteMd: block({
              label: 'Remote Markdown',
              schema: {
                src: fields.url({ label: 'Raw markdown URL' }),
              },
            }),
          },
        }),
      },
    }),
  },
});
