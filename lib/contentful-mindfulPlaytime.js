import { fetchGraphQL } from './contentful';

const POST_GRAPHQL_QUOTES_FIELDS = `
caption
date
`;

function extractPostEntry(fetchResponse) {
  return fetchResponse?.data?.mindfulPlaytimeCollection?.items?.[0];
}

export async function getMindfulPlaytime(slug, preview) {
  const entries = await fetchGraphQL(
    `query {
        mindfulPlaytimeCollection(order:date_DESC,limit:1,preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_QUOTES_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntry(entries);
}
