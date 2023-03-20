import { fetchGraphQL } from './contentful';

const POST_GRAPHQL_QUOTES_FIELDS = `
title
inspirationText
mindfulPlayTimeText
milestoneText
earlybirdMilestone
date
`;

function extractPostEntry(fetchResponse) {
  return fetchResponse?.data?.quotesCollection?.items?.[0];
}

export async function getQuote(slug, preview) {
  const entries = await fetchGraphQL(
    `query {
        quotesCollection(order:date_DESC,limit:1,preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_QUOTES_FIELDS}
        }
      }
    }`,
    preview,
  );

  return extractPostEntry(entries);
}
