const BASE = '/api'

function getToken() {
  return localStorage.getItem('admin_token') || ''
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  }
}

// Auth
export const login = (username, password) =>
  request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

export const verifyToken = () =>
  request('/auth/verify', {
    headers: { Authorization: `Bearer ${getToken()}` },
  })

// Experiences — public reads
export const getExperiences = () => request('/experiences')
export const getExperienceById = (id) => request(`/experiences/${id}`)

// Experiences — protected writes
export const createExperience = (exp) =>
  request('/experiences', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(exp),
  })

export const updateExperience = (id, exp) =>
  request(`/experiences/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(exp),
  })

export const deleteExperience = (id) =>
  request(`/experiences/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  })

// Projects — public reads
export const getProjects = () => request('/projects')
export const getProjectById = (id) => request(`/projects/${id}`)

// Projects — protected writes
export const createProject = (project) =>
  request('/projects', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(project),
  })

export const updateProject = (id, project) =>
  request(`/projects/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(project),
  })

export const deleteProject = (id) =>
  request(`/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  })
