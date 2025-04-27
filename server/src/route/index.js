import express from "express";
import {router as employeesRoute} from './employeesRoute.js'
import {router as projectAssignmentsRoute} from './assignmentsRoute.js'
import {router as projectsRoute} from './projectsRoute.js'

export const router = express.Router()

router.use('/api', employeesRoute)
router.use('/api', projectsRoute)
router.use('/api', projectAssignmentsRoute)
