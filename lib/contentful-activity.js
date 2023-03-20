import { NO_OF_ACTIVITY_PER_PAGE } from '../app/constants/constant';
import { fetchGraphQL } from './contentful';

const POST_GRAPHQL_ACTIVITY_FIELDS = `
sys{
  id
}
title
slug
description
pdfCollection{
  items{
    title
    url
  }
}
isPrintable
instruction
material{
  json
}
notes
banner{
  url
}
subjectCollection{
  items{
    title
    slug
    color
    icon{
      url
    }
  }
}
age
`;
const POST_GRAPHQL_ALL_ACTIVITY_LIST_FIELDS = `
sys{
  id
}
title
slug
age
isPrintable
date
subjectCollection{
  items{
    title
    slug
    color
  }
}
themesCollection{
  items{
    title
    slug
  }
}
banner{
  url
} `;

const POST_GRAPHQL_ACTIVITY_LIST_FIELDS = `
sys{
  id
}
title
slug
isPrintable
date
banner{
  url
}
subjectCollection{
  items{
    title
    slug
    color
  }
}
age
`;

const POST_GRAPHQL_ACTIVITY_LIST_WITH_THEMES_FIELDS = `
sys{
  id
}
title
slug
isPrintable
date
banner{
  url
}
themesCollection{
  items{
    title
    slug
    
  }
}
age

`;

const POST_GRAPHQL_MILESTONE_TASK_ACTIVITY_LIST_FIELDS = `
title
slug
isPrintable
date
banner{
  url
}
sys{
  id
}
age
subjectCollection{
  items{
    title
    slug
    color
  }
}
`;
function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.activityCollection?.items;
}

function extractPostEntry(fetchResponse) {
  return fetchResponse?.data?.activityCollection?.items?.[0];
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      activityCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_ACTIVITY_LIST_FIELDS}
        }
      }
    }`,
  );
  return extractPostEntries(entries);
}

// export async function getAllActivities(preview) {
//   const entries = await fetchGraphQL(
//     `query {
//       activityCollection(order:date_DESC,preview: ${preview ? 'true' : 'false'}) {
//         items {
//           ${POST_GRAPHQL_ACTIVITY_LIST_FIELDS}
//         }
//       }
//     }`,
//     preview,
//   );
//   return extractPostEntries(entries);
// }

export async function getAllActivitiesWithPagination(skip, preview) {
  const entries = await fetchGraphQL(
    `query {
      activityCollection(skip:${skip},limit:${NO_OF_ACTIVITY_PER_PAGE},order:date_DESC,preview: ${
      preview ? 'true' : 'false'
    }) {
        items {
          ${POST_GRAPHQL_ALL_ACTIVITY_LIST_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntries(entries);
}
export async function getAllActivitiesWithThemes(preview) {
  const entries = await fetchGraphQL(
    `query {
      activityCollection(order:date_DESC,preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_ACTIVITY_LIST_WITH_THEMES_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntries(entries);
}

export async function getActivityDetail({ slug, preview }) {
  const entries = await fetchGraphQL(
    `query {
      activityCollection(where:{slug: "${slug}"},limit:1,preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_ACTIVITY_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntry(entries);
}

export async function getAllActivitiesOfMilestone({ slug }, preview) {
  const entries = await fetchGraphQL(
    `query {
      activityCollection(where:{milestone:{slug:"${slug}"}},preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_MILESTONE_TASK_ACTIVITY_LIST_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntries(entries);
}

export async function getAllActivitiesByAge({ year }, preview) {
  const entries = await fetchGraphQL(
    `query {
      activityCollection(where:{age_lte:${year}},preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_MILESTONE_TASK_ACTIVITY_LIST_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntries(entries);
}
