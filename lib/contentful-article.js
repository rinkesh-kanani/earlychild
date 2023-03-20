import { fetchGraphQL } from './contentful';

const POST_GRAPHQL_ARTICLE_LIST_FIELDS = `
title
slug
link
body{
    json
}
banner{
    url
}
tag{
    title
    slug
}
`;

const POST_GRAPHQL_ARTICLE_TAG_FIELDS = `
title
slug
`;

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.articleCollection?.items;
}

function extractArticleTagPostEntries(fetchResponse) {
  return fetchResponse?.data?.articleTagCollection?.items;
}

function extractPostEntry(fetchResponse) {
  return fetchResponse?.data?.articleCollection?.items[0];
}

export async function getAllArticles(preview) {
  const entries = await fetchGraphQL(
    `query {
        articleCollection(preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_ARTICLE_LIST_FIELDS}
        }
      }
    }`,
    preview,
  );

  return extractPostEntries(entries);
}

export async function getAllArticleTag(preview) {
  const entries = await fetchGraphQL(
    `query {
      articleTagCollection(preview: ${preview ? 'true' : 'false'}) {
          items {
            ${POST_GRAPHQL_ARTICLE_TAG_FIELDS}
          }
        }
      }`,
    preview,
  );
  return extractArticleTagPostEntries(entries);
}

export async function getAllArticleOfTag({ slug, preview }) {
  const entries = await fetchGraphQL(
    `query {
          articleCollection(where:{tag:{slug:"${slug}"}},preview: ${preview ? 'true' : 'false'}) {
          items {
            ${POST_GRAPHQL_ARTICLE_LIST_FIELDS}
          }
        }
      }`,
    preview,
  );
  return extractPostEntries(entries);
}

export async function getFeaturedArticleContent(preview) {
  const entries = await fetchGraphQL(
    `query {
      featuredContentCollection(where: {content_exists:true} , order:order_ASC, preview: ${
        preview ? 'true' : 'false'
      }) {
        items {
          content {
            ... on Article {
              ${POST_GRAPHQL_ARTICLE_LIST_FIELDS}
            }
          }
        }
      }
    }`,
  );

  return entries?.data?.featuredContentCollection?.items;
}
