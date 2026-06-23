export const projectsQuery = `*[_type == "project"] | order(featured desc, _createdAt desc) {
  "id": slug.current,
  title,
  description,
  longDescription,
  category,
  "tags": coalesce(tags, []),
  demoUrl,
  githubUrl,
  "image": coalesce(image.asset->url, ""),
  "highlights": coalesce(highlights, []),
  featured
}`;

export const skillsQuery = `*[_type == "skill"] | order(level desc) {
  name,
  level,
  category,
  "icon": coalesce(icon.asset->url, "")
}`;

export const timelineQuery = `*[_type == "timelineItem"] | order(_createdAt asc) {
  year,
  role,
  company,
  description,
  type
}`;
