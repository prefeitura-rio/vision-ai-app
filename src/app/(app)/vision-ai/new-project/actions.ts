'use server'

import { env } from '@/env'
import type { Project } from '@/models/entities'

interface CreateProject {
  name: string
  model: string
  model_config?: Record<string, string> | null
  cameras_id: string[]
  time_start?: string
  time_end?: string
  discord_webhook_id: string
  discord_webhook_token: string
}

export async function createProjectAction(props: CreateProject) {
  const response = await fetch(`${env.VISION_AI_API_URL}/project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: props.name,
      model: props.model,
      model_config: props.model_config,
      cameras_id: props.cameras_id,
      time_start: props.time_start,
      time_end: props.time_end,
      discord_webhook_id: props.discord_webhook_id,
      discord_webhook_token: props.discord_webhook_token,
    }),
  })
  const project: Project = await response.json()

  return project
}
