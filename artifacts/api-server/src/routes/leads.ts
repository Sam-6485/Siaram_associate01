import { Router } from "express";
import { db, leadsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import {
  CreateLeadBody,
  UpdateLeadBody,
  GetLeadParams,
  UpdateLeadParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const leads = await db
      .select()
      .from(leadsTable)
      .orderBy(desc(leadsTable.createdAt));
    res.json(leads);
  } catch (err) {
    req.log.error({ err }, "Error fetching leads");
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

router.get("/summary", async (req, res) => {
  try {
    const leads = await db.select().from(leadsTable);
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "new").length;
    const contacted = leads.filter((l) => l.status === "contacted").length;
    const approved = leads.filter((l) => l.status === "approved").length;
    res.json({ total, new: newCount, contacted, approved });
  } catch (err) {
    req.log.error({ err }, "Error fetching leads summary");
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

router.post("/", async (req, res) => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body", details: parsed.error });
    return;
  }

  try {
    const [lead] = await db
      .insert(leadsTable)
      .values({ ...parsed.data, status: "new" })
      .returning();
    res.status(201).json(lead);
  } catch (err) {
    req.log.error({ err }, "Error creating lead");
    res.status(500).json({ error: "Failed to create lead" });
  }
});

router.get("/:id", async (req, res) => {
  const parsed = GetLeadParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  try {
    const [lead] = await db
      .select()
      .from(leadsTable)
      .where(eq(leadsTable.id, parsed.data.id));

    if (!lead) {
      res.status(404).json({ error: "Lead not found" });
      return;
    }
    res.json(lead);
  } catch (err) {
    req.log.error({ err }, "Error fetching lead");
    res.status(500).json({ error: "Failed to fetch lead" });
  }
});

router.patch("/:id", async (req, res) => {
  const parsedParams = UpdateLeadParams.safeParse({ id: Number(req.params.id) });
  if (!parsedParams.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const parsedBody = UpdateLeadBody.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ error: "Invalid request body", details: parsedBody.error });
    return;
  }

  try {
    const updateData: Record<string, unknown> = {};
    if (parsedBody.data.status !== undefined) updateData.status = parsedBody.data.status;
    if (parsedBody.data.message !== undefined) updateData.message = parsedBody.data.message;
    if (parsedBody.data.interest !== undefined) updateData.interest = parsedBody.data.interest;

    const [lead] = await db
      .update(leadsTable)
      .set(updateData)
      .where(eq(leadsTable.id, parsedParams.data.id))
      .returning();

    if (!lead) {
      res.status(404).json({ error: "Lead not found" });
      return;
    }
    res.json(lead);
  } catch (err) {
    req.log.error({ err }, "Error updating lead");
    res.status(500).json({ error: "Failed to update lead" });
  }
});

export default router;
