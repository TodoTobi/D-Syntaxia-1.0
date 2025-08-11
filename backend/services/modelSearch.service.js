import axios from 'axios';

export async function find3DModel(query) {
  const token = process.env.SKETCHFAB_TOKEN;
  if (!token) return null;

  const { data } = await axios.get('https://api.sketchfab.com/v3/search', {
    params: { q: query, type: 'models', downloadable: true, sort_by: 'relevance' },
    headers: { Authorization: `Token ${token}` }
  });

  const item = data?.results?.[0];
  if (!item) return null;

  return {
    name: item.name,
    uid: item.uid,
    thumbnails: item.thumbnails?.images || [],
    viewerUrl: `https://sketchfab.com/3d-models/${item.slug}-${item.uid}`
  };
}
