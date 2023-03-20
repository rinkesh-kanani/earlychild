import { fetchGraphQL } from './contentful';

const POST_GRAPHQL_MILESTONE_FIELDS = `
title
slug
duration
description
`;

function extractPostEntry(fetchResponse) {
  return fetchResponse?.data?.milestoneCollection?.items?.[0];
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.milestoneCollection?.items;
}
export async function getMilestone(slug, preview) {
  const entries = await fetchGraphQL(
    `query {
        milestoneCollection(where:{slug:"${slug}"},preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_MILESTONE_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntry(entries);
}

export async function getAllMilestoneList(preview) {
  const entries = await fetchGraphQL(
    `query {
        milestoneCollection(preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_MILESTONE_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntries(entries);
}
