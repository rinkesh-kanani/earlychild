import { fetchGraphQL } from './contentful';

const POST_GRAPHQL_MILESTONETASK_LIST_FIELDS = `
title
slug
sys{
  id
}
subject{
  title
  slug
  icon{
    url
  }
}
milestone{
  title
  slug
  duration
  description
}
`;
const POST_GRAPHQL_TASK_OF_MILESTONE_LIST_FIELDS = `
title
slug
sys{
  id
}
subject{
  title
  color
  slug
}
milestone{
  title
  slug
  description
}
`;

const POST_GRAPHQL_ACTIVITIES_OF_MILESTONETASK_FIELDS = `
activityForYesCollection{
  items{
    title
    slug
    sys{
      id
    }
    banner{
      url
    }
  }
}
activityforNotYetCollection{
  items{
    title
    slug
    sys{
      id
    }
    banner{
      url
    }
  }
}

`;
const POST_GRAPHQL_ALL_TASK_OF_MILESTONE_LIST_FIELDS = `
title
slug
sys{
  id
}
subject{
  title
  color
  slug
}
milestone{

  slug

}
`;

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.milestohneTaskCollection?.items;
}

export async function getAllMilestoneTasks(preview) {
  const entries = await fetchGraphQL(
    `query {
      milestohneTaskCollection(preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_MILESTONETASK_LIST_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntries(entries);
}

export async function getAllTaskOfMilestone(slug, preview) {
  const entries = await fetchGraphQL(
    `query {
      milestohneTaskCollection(where:{milestone:{slug:"${slug}"}},preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_TASK_OF_MILESTONE_LIST_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntries(entries);
}

export async function getAllActivityOfMilestoneTask(id, preview) {
  const entries = await fetchGraphQL(
    `query {
      milestohneTask(id:"${id}",preview: ${preview ? 'true' : 'false'}) {
          ${POST_GRAPHQL_ACTIVITIES_OF_MILESTONETASK_FIELDS} 
      }
    }`,
    preview,
  );

  return entries?.data?.milestohneTask;
}

export async function getAllTaskOfMilestoneList(preview) {
  const entries = await fetchGraphQL(
    `query {
      milestohneTaskCollection(preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_ALL_TASK_OF_MILESTONE_LIST_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPostEntries(entries);
}
