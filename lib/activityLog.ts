import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LOGS_FILE = path.join(DATA_DIR, "activity-logs.json");

export interface ActivityLog {
  id: number;
  action: string;
  entity: string;
  entityId?: number | string; // Firestore ID'leri string olabilir
  userId?: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

async function ensureLogsFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(LOGS_FILE);
    } catch {
      await fs.writeFile(LOGS_FILE, JSON.stringify([]));
    }
  } catch (error) {
    console.error("Activity logs file oluşturulamadı:", error);
  }
}

async function getLogs(): Promise<ActivityLog[]> {
  await ensureLogsFile();
  try {
    const data = await fs.readFile(LOGS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveLogs(logs: ActivityLog[]) {
  await ensureLogsFile();
  await fs.writeFile(LOGS_FILE, JSON.stringify(logs, null, 2));
}

export async function logActivity(
  action: string,
  entity: string,
  options: {
    entityId?: number | string; // Firestore ID'leri string olabilir
    userId?: string;
    details?: any;
    ipAddress?: string;
    userAgent?: string;
  } = {}
): Promise<void> {
  try {
    const logs = await getLogs();
    const newLog: ActivityLog = {
      id: Date.now(),
      action,
      entity,
      entityId: options.entityId,
      userId: options.userId || "admin",
      details: options.details,
      ipAddress: options.ipAddress,
      userAgent: options.userAgent,
      createdAt: new Date().toISOString(),
    };

    logs.unshift(newLog);
    // Son 1000 log'u sakla
    const limitedLogs = logs.slice(0, 1000);
    await saveLogs(limitedLogs);
  } catch (error) {
    console.error("Activity log kaydedilemedi:", error);
  }
}

export async function getActivityLogs(
  filters?: {
    action?: string;
    entity?: string;
    limit?: number;
    offset?: number;
  }
): Promise<ActivityLog[]> {
  try {
    let logs = await getLogs();

    if (filters?.action) {
      logs = logs.filter((log) => log.action === filters.action);
    }

    if (filters?.entity) {
      logs = logs.filter((log) => log.entity === filters.entity);
    }

    if (filters?.offset) {
      logs = logs.slice(filters.offset);
    }

    if (filters?.limit) {
      logs = logs.slice(0, filters.limit);
    }

    return logs;
  } catch (error) {
    console.error("Activity logs yüklenemedi:", error);
    return [];
  }
}












