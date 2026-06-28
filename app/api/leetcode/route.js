import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username') || process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'shreyash_5506';

  const query = `
    query getUserProfile($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        contributions {
          points
        }
        profile {
          reputation
          ranking
        }
        submissionCalendar
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        badges {
          id
          name
          shortName
          displayName
          icon
          creationDate
        }
      }
      recentAcSubmissionList(username: $username, limit: 15) {
        id
        title
        titleSlug
        timestamp
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
      }
    }
  `;

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      // Cache for 1 hour to avoid rate limiting
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from LeetCode');
    }

    const data = await response.json();
    
    if (data.errors) {
      return NextResponse.json({ error: data.errors[0].message }, { status: 400 });
    }

    // Format the data for the frontend
    const user = data.data.matchedUser;
    const stats = user?.submitStats?.acSubmissionNum || [];
    const allQuestions = data.data.allQuestionsCount || [];
    
    const easy = stats.find(s => s.difficulty === 'Easy')?.count || 0;
    const medium = stats.find(s => s.difficulty === 'Medium')?.count || 0;
    const hard = stats.find(s => s.difficulty === 'Hard')?.count || 0;
    const total = easy + medium + hard;

    const totalEasy = allQuestions.find(q => q.difficulty === 'Easy')?.count || 0;
    const totalMedium = allQuestions.find(q => q.difficulty === 'Medium')?.count || 0;
    const totalHard = allQuestions.find(q => q.difficulty === 'Hard')?.count || 0;
    const totalQuestions = totalEasy + totalMedium + totalHard;

    const totalSubmissions = user?.submitStats?.totalSubmissionNum?.find(s => s.difficulty === 'All')?.submissions || 0;
    const acceptedSubmissions = user?.submitStats?.acSubmissionNum?.find(s => s.difficulty === 'All')?.submissions || 0;
    const acceptanceRate = totalSubmissions > 0 ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(2) : 0;

    return NextResponse.json({
      totalSolved: total,
      totalQuestions,
      easySolved: easy,
      totalEasy,
      mediumSolved: medium,
      totalMedium,
      hardSolved: hard,
      totalHard,
      acceptanceRate,
      ranking: user?.profile?.ranking || 0,
      reputation: user?.profile?.reputation || 0,
      contributionPoints: user?.contributions?.points || 0,
      submissionCalendar: user?.submissionCalendar ? JSON.parse(user.submissionCalendar) : {},
      recentSubmissions: data.data.recentAcSubmissionList || [],
      badges: user?.badges || [],
      contest: data.data.userContestRanking || null
    });
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch LeetCode data' }, { status: 500 });
  }
}
