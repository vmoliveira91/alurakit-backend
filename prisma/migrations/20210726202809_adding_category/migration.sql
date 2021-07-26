-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "cor" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "categoria_id" INTEGER,
    FOREIGN KEY ("categoria_id") REFERENCES "Categoria" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("descricao", "id", "titulo", "url") SELECT "descricao", "id", "titulo", "url" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
