'use server'

import { env } from '@/env'
import type { Project, RawProject } from '@/models/entities'

export async function getProjectAction(id: string) {
  try {
    console.log(env.VISION_AI_API_URL)
    console.log(`${env.VISION_AI_API_URL}/project/${id}`)
    const data = await fetch(`${env.VISION_AI_API_URL}/project/${id}`)
    console.log({ data })

    const rawProject: RawProject = await data.json()

    // Improve attribute names and structure
    const project: Project = {
      id: rawProject.id,
      name: rawProject.name,
      description: rawProject.model,
      model: rawProject.model,
      camera_ids: rawProject.cameras_id,
      config: rawProject.config,
      discord_webhook_id: rawProject.discord_webhook_id,
      discord_webhook_token: rawProject.discord_webhook_token,
      start_time: rawProject.time_start,
      end_time: rawProject.time_end,
      enabled: rawProject.enable,
    }

    return project
  } catch (error) {
    console.error(error)
    return null
  }
}