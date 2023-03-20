import { fetchGraphQL } from './contentful';

const POST_GRAPHQL_SUBJECT_LIST_FIELDS = `
title
slug
color
icon{
  url
}
`;

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.subjectCollection?.items;
}

export async function getAllSubjects(isOrder = false, preview) {
  const entries = await fetchGraphQL(
    `query {
        subjectCollection(${isOrder ? 'order:title_ASC' : ''} ,preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_SUBJECT_LIST_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntries(entries);
}
