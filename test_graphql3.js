async function test() {
  const query = `
    query userSolutionTopics($username: String!) {
      userSolutionTopics(
        username: $username
        orderBy: newest_to_oldest
        skip: 0
        first: 15
      ) {
        edges {
          node {
            id
            title
            url
            viewCount
            questionTitle
            post {
              creationDate
              voteCount
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com',
    },
    body: JSON.stringify({
      query,
      variables: { username: 'shreyash_5506' },
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

test();
