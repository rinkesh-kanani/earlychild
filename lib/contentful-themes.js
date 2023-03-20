import { fetchGraphQL } from './contentful';

const POST_GRAPHQL_THEME_LIST_FIELDS = `
title
slug
banner{
  url
}
`;

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.themeCollection?.items;
}

export async function getAllThemes(preview) {
  const entries = await fetchGraphQL(
    `query {
        themeCollection(preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_THEME_LIST_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntries(entries);
}

export async function getFeaturedThemes(preview) {
  const entries = await fetchGraphQL(
    `query {
        themeCollection(where:{featuredTheme:true},preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_THEME_LIST_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntries(entries);
}
