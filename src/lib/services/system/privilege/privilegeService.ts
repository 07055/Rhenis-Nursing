// src/lib/services/users/management/developer/managePrivilegeService.ts

export interface CreatePrivilegeInput {
  name: string;
  description: string;
}

export async function createSystemPrivilege(
  input: CreatePrivilegeInput
): Promise<{ message?: string; error?: string }> {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
      "/api/system/privilege",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return { error: text || 'Failed to create privilege' };
    }

    const data = await response.json();
    return { message: data.message ?? 'Privilege created successfully' };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return { error: 'Network error occurred' };
  }
}
