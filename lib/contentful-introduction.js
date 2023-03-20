import { fetchGraphQL } from './contentful';

const POST_GRAPHQL_INTRODUCTION_LIST_FIELDS = `
title
slug
caption
step
banner{
    url
}
`;

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.introductionCollection?.items;
}

export async function getIntroductions(preview) {
  const entries = await fetchGraphQL(
    `query {
        introductionCollection(preview: ${preview ? 'true' : 'false'},order:step_ASC) {
        items {
          ${POST_GRAPHQL_INTRODUCTION_LIST_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntries(entries);
}
