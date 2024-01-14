import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Test endpoint
 *     description: Returns a simple 'Hello World!' message.
 *     responses:
 *       200:
 *         description: A success message.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello World!
 */
router.get('/', (req: Request, res: Response) => {
  console.log('it worked for basic get route');
  res.send('Hello World!');
});

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
  // Fetch organizations from the database
  console.log('it worked for organizations get route');
  const organizations = {
    name: 'meow',
    address: 'mims house',
  };
  res.json(JSON.stringify(organizations));
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
  // Process the donation logic
  console.log('it worked for donations post route');
  res.json({ success: true });
});

export default router;
