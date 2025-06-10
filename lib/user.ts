export async function getUserData(username: string): Promise<any> {
  if (!username) return { data: [] };

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/user`;

  try {
    console.log(`Fetching user data from: ${apiUrl}`);
    const res = await fetch(apiUrl, {
      method: 'POST',
      next: {
        revalidate: 3600,
        tags: [`user-${username}`],
      },
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error("Error body:", errorBody);
      return {};
    }

    const result: any = await res.json();

    if (!result) {
      console.error("Invalid data structure received from API:", result);
      return {};
    }

    console.log(`Successfully fetched ${username}'s data.`);
    return result;

  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return {};
  }
}

export async function getUserDataDaily(userId: string): Promise<any> {
  if (!userId) return { languages: [] };

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/user/daily`;

  try {
    console.log(`Fetching daily user data from: ${apiUrl}`);
    const res = await fetch(apiUrl, {
      method: 'POST',
      next: {
        revalidate: 3600,
        tags: [`user-daily-${userId}`],
      },
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error("Error body:", errorBody);
      return { languages: [] };
    }

    const result: any = await res.json();

    if (!result || !Array.isArray(result.languages)) {
      console.error("Invalid data structure received from API:", result);
      return { languages: [] };
    }

    console.log(`Successfully fetched ${result.languages.length} daily entries.`);
    return result;

  } catch (error) {
    console.error("Failed to fetch daily user data:", error);
    return { languages: [] };
  }
}

export async function getUserDataWeekly(userId: string): Promise<any> {
  if (!userId) return { languages: [] };

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/user/weekly`;

  try {
    console.log(`Fetching weekly user data from: ${apiUrl}`);
    const res = await fetch(apiUrl, {
      method: 'POST',
      next: {
        revalidate: 3600,
        tags: [`user-weekly-${userId}`],
      },
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error("Error body:", errorBody);
      return { languages: [] };
    }

    const result: any = await res.json();

    if (!result || !Array.isArray(result.languages)) {
      console.error("Invalid data structure received from API:", result);
      return { languages: [] };
    }

    console.log(`Successfully fetched ${result.languages.length} weekly entries.`);
    return result;

  } catch (error) {
    console.error("Failed to fetch weekly user data:", error);
    return { languages: [] };
  }
}
