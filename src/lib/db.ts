import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";


// Lazy — only throws at query time, not at module load
// This prevents Vercel from silently returning 404 on missing env var
function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const sql = neon(url);
  return drizzle(sql, { schema });
}

let _db: ReturnType<typeof getDb> | null = null;

export function getDbClient() {
  if (!_db) _db = getDb();
  return _db;
}

// Named export for convenience — same as before
export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(_target, prop) {
    return getDbClient()[prop as keyof ReturnType<typeof getDb>];
  },
});


export const authDb = db;
export const lessonsDb = db;
export const studentsDb = db;
export const teachersDb = db;
export const classesDb = db;
export const assignmentsDb = db;
export const submissionsDb = db;
export const discussionsDb = db;
export const notificationsDb = db;
export const resourcesDb = db;
export const gradesDb = db;
export const attendanceDb = db;
export const schedulesDb = db;
export const messagesDb = db;
export const analyticsDb = db;
export const settingsDb = db;
export const feedbackDb = db;
export const calendarDb = db;
export const libraryDb = db;
export const forumsDb = db;
export const pollsDb = db;
export const quizzesDb = db;
export const surveysDb = db;
export const announcementsDb = db;
export const eventsDb = db;
export const groupsDb = db;
export const collaborationsDb = db;
export const projectsDb = db;
export const portfoliosDb = db;
export const certificatesDb = db;
export const transcriptsDb = db;
export const attendanceRecordsDb = db;
export const gradeRecordsDb = db;
export const feedbackRecordsDb = db;
export const scheduleRecordsDb = db;
export const messageRecordsDb = db;
export const analyticsRecordsDb = db;
export const settingsRecordsDb = db;
export const calendarRecordsDb = db;
export const libraryRecordsDb = db;
export const forumRecordsDb = db;
export const pollRecordsDb = db;
export const quizRecordsDb = db;
export const surveyRecordsDb = db;
export const announcementRecordsDb = db;    
export const eventRecordsDb = db;
export const groupRecordsDb = db;
export const collaborationRecordsDb = db;
export const projectRecordsDb = db;
export const portfolioRecordsDb = db;
export const certificateRecordsDb = db;
export const transcriptRecordsDb = db;


export type DB = ReturnType<typeof getDb>;