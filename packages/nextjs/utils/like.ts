export const sendLikeRequest = async (address: string | undefined, signature: string, listId: string) => {
  const payload = { address, signature, listId };

  const response = await fetch("/api/list/like", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  return response.json();
};
