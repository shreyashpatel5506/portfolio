async function test() {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        badges {
          id
          name
          shortName
          displayName
          icon
          creationDate
          category
          medal {
            name
            config {
              icon
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
