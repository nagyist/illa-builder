import { rest } from "msw"
import { v4 as uuidV4 } from "uuid"
import { baseUrl } from "@/mocks/config"
import { ACTION_RUN_RESULT, ALL_ACTION } from "./data"

export default [
  rest.get(`${baseUrl}/actions`, (_, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(ALL_ACTION))
  }),

  rest.post(`${baseUrl}/actions/:actionId/run`, (_, res, ctx) => {
    return res(
      ctx.delay(10000 * Math.random()),
      ctx.status(200),
      ctx.json(ACTION_RUN_RESULT),
    )
  }),

  rest.post(`${baseUrl}/actions`, (req, res, ctx) => {
    const data = req.body

    return res(
      ctx.delay(Math.random() * 3000),
      ctx.status(200),
      ctx.json({
        actionId: uuidV4(),
        ...(data as Object),
      }),
    )
  }),

  rest.put(`${baseUrl}/actions/:actionId`, (req, res, ctx) => {
    const { actionId } = req.params
    const data = req.body

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        actionId,
        ...(data as Object),
      }),
    )
  }),

  rest.delete(`${baseUrl}/actions/:actionId`, (req, res, ctx) => {
    const { actionId } = req.params
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        actionId,
      }),
    )
  }),
]
