import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username') || process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'shreyashpatel5506';

  try {
    // Fetch profile
    const profileRes = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 }
    });
    
    if (!profileRes.ok) {
      throw new Error('Failed to fetch GitHub profile');
    }
    const profile = await profileRes.json();

    // Fetch all repos to calculate total stars and languages
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      next: { revalidate: 3600 }
    });
    
    let repos = [];
    if (reposRes.ok) {
      repos = await reposRes.json();
    }

    // Calculate total stars
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

    // Calculate language stats
    const languages = {};
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    // Sort languages by count
    const topLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      profile: {
        followers: profile.followers,
        public_repos: profile.public_repos,
        avatar_url: profile.avatar_url,
        html_url: profile.html_url,
        bio: profile.bio
      },
      totalStars,
      topLanguages,
      recentRepos: repos.slice(0, 6)
    });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
  }
}
