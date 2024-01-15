import { Router, Request, Response } from 'express';

import { organizations } from '../mock/data';

const router = Router();

/**
 * @swagger
 * /api/organizations:
 *   get:
 *     summary: Fetch a list of organizations
 *     description: Retrieves a list of organizations from the database.
 *     responses:
 *       200:
 *         description: A list of organizations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The organization ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the organization.
 *                     example: Organization Name
 */
router.get('/organizations', (req: Request, res: Response) => {
  // API call to fetch organizations from the database
  res.json(organizations);
});

/**
 * @swagger
 * /api/organizations/{id}:
 *   get:
 *     summary: Fetch details of a specific organization
 *     description: Retrieves details of an organization by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the organization to fetch.
 *     responses:
 *       200:
 *         description: Details of the organization.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Global Relief Foundation
 *       404:
 *         description: Organization not found.
 */
router.get('/organizations/:id', (req: Request, res: Response) => {
  const orgId = parseInt(req.params.id).toString();
  const organization = organizations.find((org) => org.id === orgId);

  // confirming data inside of organization array
  if (organization) {
    res.json(organization);
  } else {
    res.status(404).send('Organization not found');
  }
});

/**
 * @swagger
 * /api/donate:
 *   post:
 *     summary: Process a donation
 *     description: Processes a donation made to an organization.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - organizationId
 *               - amount
 *             properties:
 *               organizationId:
 *                 type: integer
 *                 description: The ID of the organization receiving the donation.
 *                 example: 1
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: The amount to be donated.
 *                 example: 100.50
 *     responses:
 *       200:
 *         description: Confirmation of the successful processing of the donation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 */
router.post('/donate', (req: Request, res: Response) => {
  const { organizationId, amount } = req.body;

  if (!organizationId || !amount) {
    return res.status(400).send('Missing organizationId or amount');
  }

  if (isNaN(amount) || amount <= 0) {
    return res.status(400).send('Invalid amount');
  }

  res.json({ success: true });
});

export default router;
