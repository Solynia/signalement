-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Observation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "signalementId" TEXT NOT NULL,
    CONSTRAINT "Observation_signalementId_fkey" FOREIGN KEY ("signalementId") REFERENCES "Signalement" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Observation" ("id", "name", "signalementId") SELECT "id", "name", "signalementId" FROM "Observation";
DROP TABLE "Observation";
ALTER TABLE "new_Observation" RENAME TO "Observation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
